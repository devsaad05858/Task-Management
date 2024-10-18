// src/pages/api/tasks/[taskId].js

import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getIO } from "../../../lib/socket";
import sendNotification from "@/utils/sendNotifications";

export default async function handler(req, res) {
  const io = res.socket.server.io;

  if (!io) {
    // If Socket.IO is not initialized, initialize it
    await import("../socket"); // This will initialize Socket.IO on the first request
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { taskId } = req.query;
  const { user } = session;
  const isAdmin = user.role === "admin";

  switch (req.method) {
    case "GET":
      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
      }
      break;

    case "PUT":
      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Update task details
        Object.assign(task, req.body);
        await task.save();

        // Send notifications based on who performed the action
        if (task.createdBy.toString() === user.id) {
          // If task creator updated the task, notify assigned users
          sendNotification(
            task._id,
            task.assignedUsers,
            `${user.name} updated the task`,
            io
          );
        } else {
          // If an assigned user updated the task, notify the creator
          sendNotification(
            task._id,
            [task.createdBy],
            `${user.name} updated the task`,
            io
          );
        }

        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: "Error updating task" });
      }
      break;

    case "DELETE":
      try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Check permission: either the task creator or assigned user can delete it
        if (
          !isAdmin &&
          !task.assignedUsers.includes(user.id) &&
          task.createdBy.toString() !== user.id
        ) {
          return res.status(403).json({ message: "Forbidden" });
        }

        await Task.findByIdAndDelete(taskId);

        // Send notifications based on who performed the action
        if (task.createdBy.toString() === user.id) {
          // If task creator deleted the task, notify assigned users
          sendNotification(
            task._id,
            task.assignedUsers,
            `${user.name} deleted the task`,
            io
          );
        } else {
          // If an assigned user deleted the task, notify the creator
          sendNotification(
            task._id,
            [task.createdBy],
            `${user.name} deleted the task`,
            io
          );
        }

        res.status(200).json({ message: "Task deleted" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
