import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import sendNotification from "@/utils/sendNotifications";
import { allEnums } from "@/constants/enums";

export default async function handler(req, res) {
  // Get the Socket.IO instance from the server
  const io = res.socket.server.io;

  if (!io) {
    // If Socket.IO is not initialized, initialize it
    await import("../socket"); // This will initialize Socket.IO on the first request
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { taskId, status, priority } = req.body;
  const { user } = session;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    let notificationMessage;

    if (status) {
      task.status = status;
      notificationMessage = `Task status updated to ${
        allEnums.boards.find((one) => one.value == status).label
      }`;
    }

    if (priority) {
      task.priority = priority;
      notificationMessage = `Task priority updated to ${
        allEnums.priority.find((one) => one.value == priority).label
      }`;
    }

    await task.save();

    // Determine who made the update
    if (task.createdBy.toString() === user.id) {
      // If task creator made the update, notify all assigned users
      sendNotification(
        task._id,
        task.assignedUsers,
        `${user.name} updated the task. ${notificationMessage}`,
        io
      );
    } else {
      // If an assigned user made the update, notify the task creator
      sendNotification(
        task._id,
        [task.createdBy],
        `${user.name} updated the task. ${notificationMessage}`,
        io
      );
    }

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
}
