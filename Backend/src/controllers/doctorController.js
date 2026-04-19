import Doctor from "../models/Doctor.js";

// Add doctor
export const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;

    let filter = {};

    if (specialization) {
      filter.specialization = specialization;
    }

    const doctors = await Doctor.find(filter);

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};