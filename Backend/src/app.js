import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceMasterRoutes from "./routes/serviceMasterRoutes.js";
import opdBillingRoutes from "./routes/opdBillingRoutes.js";
import healthPackageRoutes from "./routes/healthPackageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/service-master", serviceMasterRoutes);
app.use("/api/services", serviceMasterRoutes);
app.use("/api/opd-billing", opdBillingRoutes);
app.use("/api/health-packages", healthPackageRoutes);
app.use("/api/admin", adminRoutes);

export default app;
export default app;