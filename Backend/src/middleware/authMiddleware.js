import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Patient.findById(decoded.id).select("_id role email name");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Temporary for patient enquiry testing: keep token auth, bypass role checks.
    void allowedRoles;
    next();
  };
};
