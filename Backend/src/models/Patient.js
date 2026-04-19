import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;