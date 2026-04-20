import OPDBilling from "../models/OPDBilling.js";
import Razorpay from "razorpay";
import crypto from "crypto";

let hasLoggedMissingRazorpayKeys = false;

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    if (!hasLoggedMissingRazorpayKeys) {
      console.warn(
        "[OPD Billing] Razorpay test keys missing. Card/UPI checkout is disabled until RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set."
      );
      hasLoggedMissingRazorpayKeys = true;
    }
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

// Create OPD bill
export const createOPDBill = async (req, res) => {
  try {
    const bill = await OPDBilling.create(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bills by patient
export const getPatientBills = async (req, res) => {
  try {
    const { patientId } = req.params;
    const bills = await OPDBilling.find({ patientId }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark bill as paid
export const markBillPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, paymentAmount, transactionId } = req.body;
    const billToValidate = await OPDBilling.findById(id);

    if (!billToValidate) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const expectedAmount = Number(billToValidate.finalAmount || 0);
    const paidAmount = Number(paymentAmount || 0);

    if (paidAmount !== expectedAmount) {
      return res.status(400).json({
        message: `Payment amount must be exactly Rs. ${expectedAmount.toFixed(2)}`,
      });
    }

    const bill = await OPDBilling.findByIdAndUpdate(
      id,
      {
        paymentStatus: "Paid",
        ...(paymentMethod ? { paymentMethod } : {}),
        ...(transactionId ? { transactionId } : {}),
      },
      { new: true }
    );

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single bill invoice
export const getSingleBillInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await OPDBilling.findById(id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Razorpay test order for OPD bill
export const createRazorpayOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;
    const bill = await OPDBilling.findById(id).populate("patientId", "name");

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const amountInPaise = Math.round(Number(bill.finalAmount || 0) * 100);

    if (amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid bill amount for payment" });
    }

    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return res.status(500).json({
        message: "Razorpay test keys are missing in backend environment",
      });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `opd_bill_${bill._id.toString()}`,
      notes: {
        billId: bill._id.toString(),
        patientName: bill.patientId?.name || "Patient",
      },
    });

    await OPDBilling.findByIdAndUpdate(bill._id, {
      razorpayOrderId: order.id,
      paymentMethod: paymentMethod || "Card",
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      billId: bill._id,
      patientName: bill.patientId?.name || "Patient",
      finalAmount: bill.finalAmount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify Razorpay payment and mark OPD bill paid
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentMethod,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Incomplete Razorpay payment payload" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        message: "Razorpay key secret missing in backend environment",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid Razorpay payment signature" });
    }

    const bill = await OPDBilling.findById(id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    bill.paymentStatus = "Paid";
    bill.paymentMethod = paymentMethod || "Card";
    bill.transactionId = razorpay_payment_id;
    bill.razorpayOrderId = razorpay_order_id;
    bill.razorpayPaymentId = razorpay_payment_id;
    bill.razorpaySignature = razorpay_signature;

    await bill.save();

    return res.json(bill);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
