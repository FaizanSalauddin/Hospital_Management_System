import express from "express";
import {
  getHealthPackages,
  getHealthPackageById,
  seedHealthPackages,
} from "../controllers/healthPackageController.js";

const router = express.Router();

router.get("/", getHealthPackages);
router.get("/:id", getHealthPackageById);
router.post("/seed-sample", seedHealthPackages);

export default router;
