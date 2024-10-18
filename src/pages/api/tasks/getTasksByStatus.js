// pages/api/tasks/getTasksByStatus.js
import dbConnect from "@/utils/dbConnect";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await dbConnect();

  const { status } = req.query; // Get the status from the query string

  if (!status) {
    return res
      .status(400)
      .json({ error: "Status query parameter is required" });
  }

  try {
    const tasks = await Task.find({ status }).populate(
      "assignedUsers createdBy"
    ); // Find tasks by status and populate assigned users and creator

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ error: "No tasks found with the specified status" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
