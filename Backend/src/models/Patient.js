import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  uniquePatientId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  age: Number,
  gender: String,
  phone: String,
  address: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;