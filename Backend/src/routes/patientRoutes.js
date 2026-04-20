import express from "express";
import {
  registerPatient,
  getPatients,
  searchPatients,
} from "../controllers/patientController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/", getPatients);
router.get(
  "/search",
  protect,
  authorizeRoles("Admin", "Receptionist"),
  searchPatients
);

export default router;