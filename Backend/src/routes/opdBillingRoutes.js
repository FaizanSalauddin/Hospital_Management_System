import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
  createOPDBill,
  getPatientBills,
  markBillPaid,
  getSingleBillInvoice,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/opdBillingController.js";

const router = express.Router();

router.post("/", authMiddleware, createOPDBill);
router.get("/patient/:patientId", authMiddleware, getPatientBills);
router.put("/:id/pay", authMiddleware, markBillPaid);
router.post("/:id/razorpay-order", authMiddleware, createRazorpayOrder);
router.post("/:id/razorpay-verify", authMiddleware, verifyRazorpayPayment);
router.get("/:id/invoice", authMiddleware, getSingleBillInvoice);

export default router;
