import { getServerSession } from "next-auth";
import Notification from "../../../models/Notification";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { user } = session;

  switch (req.method) {
    case "PUT":
      try {
        await Notification.updateMany(
          { user: user.id, read: false },
          { $set: { read: true } }
        );
        res.status(200).json({ message: "All notifications marked as read" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error marking notifications as read" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
