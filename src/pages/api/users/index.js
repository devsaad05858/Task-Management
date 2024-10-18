import User from "@/models/User";
import dbConnect from "../../../utils/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const users = await User.find({}, "name email _id");
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Failed to fetch users" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
