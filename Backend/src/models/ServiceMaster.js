import mongoose from "mongoose";

const serviceMasterSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    charge: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const ServiceMaster = mongoose.model("ServiceMaster", serviceMasterSchema);

export default ServiceMaster;
