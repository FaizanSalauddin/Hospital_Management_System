import express from "express";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// 🔹 all users
router.get("/users", adminMiddleware, async (req, res) => {
  const users = await Patient.find();
  res.json(users);
});

// 🔹 all appointments
router.get("/appointments", adminMiddleware, async (req, res) => {
  const data = await Appointment.find()
    .populate("doctor")
    .populate("patient");

  res.json(data);
});

// 🔹 add doctor
router.post("/doctors", adminMiddleware, async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
});

export default router;