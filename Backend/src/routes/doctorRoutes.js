import express from "express";
import { addDoctor, getDoctors } from "../controllers/doctorController.js";

const router = express.Router();

// Add doctor
router.post("/", addDoctor);

// Get all doctors
router.get("/", getDoctors);

export default router;