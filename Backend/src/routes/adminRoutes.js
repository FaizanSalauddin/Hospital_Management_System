import express from "express";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const router = express.Router();

// 🔐 protected admin routes
router.get("/users", adminMiddleware, async (req, res) => {
  const users = await Patient.find();
  res.json(users);
});

router.get("/appointments", adminMiddleware, async (req, res) => {
  const data = await Appointment.find().populate("doctor patient");
  res.json(data);
});

// ✅ ADD DOCTOR
router.post("/doctors", adminMiddleware, async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
});

export default router;