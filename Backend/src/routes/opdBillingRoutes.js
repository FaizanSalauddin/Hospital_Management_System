import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { protectAdmin } from "../../middleware/adminMiddleware.js";
import {
  createOPDBill,
  getPatientBills,
  markBillPaid,
  getSingleBillInvoice,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/opdBillingController.js";

const router = express.Router();

router.post("/", protectAdmin, createOPDBill);
router.get("/patient/:patientId", authMiddleware, getPatientBills);
router.put("/:id/pay", authMiddleware, markBillPaid);
router.post("/:id/razorpay-order", authMiddleware, createRazorpayOrder);
router.post("/:id/razorpay-verify", authMiddleware, verifyRazorpayPayment);
router.get("/:id/invoice", authMiddleware, getSingleBillInvoice);

export default router;
