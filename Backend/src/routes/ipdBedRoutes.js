import express from "express";
import {
  getBeds,
  assignBed,
  transferBed,
  dischargeBed,
} from "../controllers/ipdBedController.js";

const router = express.Router();

router.get("/", getBeds);
router.post("/assign", assignBed);
router.put("/transfer", transferBed);
router.put("/discharge/:id", dischargeBed);

export default router;