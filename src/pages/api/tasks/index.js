import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import sendNotification from "@/utils/sendNotifications";

export default async function handler(req, res) {
  const io = res.socket.server.io;

  if (!io) {
    // If Socket.IO is not initialized, initialize it
    await import("../socket"); // This will initialize Socket.IO on the first request
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { user } = session;
  const isAdmin = user.role === "admin";

  switch (req.method) {
    case "GET":
      try {
        let tasks;
        if (isAdmin) {
          tasks = await Task.find().populate("assignedUsers", "name email");
        } else {
          tasks = await Task.find({ assignedUsers: user.id }).populate(
            "assignedUsers",
            "name email"
          );
        }
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
      }
      break;

    case "POST":
      if (!isAdmin) return res.status(403).json({ message: "Forbidden" });

      try {
        const task = await Task.create({
          ...req.body,
          createdBy: user.id,
        });

        // Notify all assigned users about the new task
        sendNotification(
          task._id,
          task.assignedUsers,
          `${user.name} created a new task`,
          io
        );

        // Notify the task creator (for record-keeping)
        sendNotification(task._id, [user.id], `You created a new task`, io);

        res.status(201).json(task);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating task" });
      }
      break;
      try {
        const { id } = req.query;
        if (!id)
          return res.status(400).json({ message: "Task ID is required" });

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Only admin or the creator of the task can delete it
        if (!isAdmin && task.createdBy.toString() !== user.id) {
          return res.status(403).json({ message: "Forbidden" });
        }

        await Task.findByIdAndDelete(id);

        sendNotification(
          task._id,
          task.assignedUsers,
          `${user.name} deleted a task`
        );

        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
