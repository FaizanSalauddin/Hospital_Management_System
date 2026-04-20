 import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: String,
  time: String,
  status: {
    type: String,
    default: "Booked",
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

// ✅ MUST ADD THIS
export default Appointment;