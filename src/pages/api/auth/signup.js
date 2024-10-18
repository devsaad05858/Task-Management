import User from "@/models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";
import { useTranslation } from "react-i18next";

export default async function handler(req, res) {
  const { t } = useTranslation("common");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { name, email, password } = req.body;

  // Validate the input data
  if (!name || !email || !password) {
    return res.status(400).json({ message: t("all_fields_are_required") });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
