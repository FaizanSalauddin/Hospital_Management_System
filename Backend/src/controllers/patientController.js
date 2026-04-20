import Patient from "../models/Patient.js";
import mongoose from "mongoose";

// Register patient
export const registerPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search patients by UHID, name, phone, or Mongo id
export const searchPatients = async (req, res) => {
  try {
    const query = (req.query.query || "").trim();

    if (!query) {
      return res.json([]);
    }

    const searchConditions = [
      { uniquePatientId: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
      { phone: { $regex: query, $options: "i" } },
    ];

    if (mongoose.Types.ObjectId.isValid(query)) {
      searchConditions.push({ _id: query });
    }

    const patients = await Patient.find({ $or: searchConditions })
      .select("uniquePatientId name gender age phone address email createdAt")
      .limit(50)
      .sort({ createdAt: -1 });

    return res.json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};