import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB connection

  try {
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      return res.status(200).json({ message: "Admin user already exists." });
    }

    // Create a new admin user if not already present
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: process.env.ADMIN_NAME || "Default Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    return res
      .status(201)
      .json({ message: "Admin user created successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding admin user", error: error.message });
  }
}
