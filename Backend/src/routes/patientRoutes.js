import express from "express";
import { registerPatient, getPatients } from "../controllers/patientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/", getPatients);

export default router;