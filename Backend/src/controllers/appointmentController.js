import Appointment from "../models/Appointment.js";

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      patient: req.user.id, // 🔥 auto from token
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id   
    })
      .populate("doctor");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};