import express from "express";
import {
  createService,
  getServices,
  seedSampleServices,
} from "../controllers/serviceMasterController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getServices);
router.post("/seed-sample", seedSampleServices);

export default router;
