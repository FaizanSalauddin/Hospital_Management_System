import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// ✅ REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Patient.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Patient.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🔐 ADMIN LOGIN
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    const token = jwt.sign(
      { role: "admin" },   // 🔥 MUST
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid admin" });
};