import mongoose from "mongoose";

const ipdBedSchema = new mongoose.Schema(
  {
    wardName: {
      type: String,
      required: true,
      trim: true,
    },
    bedNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bedStatus: {
      type: String,
      enum: ["Vacant", "Occupied"],
      default: "Vacant",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },
    assignedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const IPDBed = mongoose.model("IPDBed", ipdBedSchema);

export default IPDBed;