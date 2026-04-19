import express from "express";
import { bookAppointment, getAppointments } from "../controllers/appointmentController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Protected Routes
router.post("/", authMiddleware, bookAppointment);
router.get("/", authMiddleware, getAppointments);

export default router;