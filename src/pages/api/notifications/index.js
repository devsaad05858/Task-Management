import { getServerSession } from "next-auth";
import Notification from "../../../models/Notification";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { user } = session;

  switch (req.method) {
    case "GET":
      try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 notifications
        const skip = (page - 1) * limit;

        const notifications = await Notification.find({ user: user.id })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        const totalNotifications = await Notification.countDocuments({
          user: user.id,
        });

        const totalPages = Math.ceil(totalNotifications / limit);

        res.status(200).json({
          notifications,
          currentPage: page,
          totalPages,
          totalNotifications,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching notifications" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
