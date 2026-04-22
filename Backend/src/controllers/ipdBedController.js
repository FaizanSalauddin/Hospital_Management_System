import IPDBed from "../models/IPDBed.js";

/* ================= SEED DATA ================= */
const seedBeds = [
  { wardName: "General Ward", bedNumber: "G101", bedStatus: "Vacant" },
  { wardName: "General Ward", bedNumber: "G102", bedStatus: "Vacant" },
  { wardName: "General Ward", bedNumber: "G103", bedStatus: "Vacant" },
  { wardName: "ICU", bedNumber: "ICU1", bedStatus: "Vacant" },
  { wardName: "ICU", bedNumber: "ICU2", bedStatus: "Vacant" },
  { wardName: "Private", bedNumber: "P201", bedStatus: "Vacant" },
  { wardName: "Private", bedNumber: "P202", bedStatus: "Vacant" },
];

const ensureSeedBeds = async () => {
  const count = await IPDBed.countDocuments();
  if (count === 0) {
    await IPDBed.insertMany(seedBeds);
  }
};

/* ================= GET ALL BEDS ================= */
export const getBeds = async (req, res) => {
  try {
    await ensureSeedBeds();

    const beds = await IPDBed.find()
      .populate("patientId", "name uniquePatientId phone")
      .sort({ wardName: 1, bedNumber: 1 });

    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ASSIGN BED ================= */
export const assignBed = async (req, res) => {
  try {
    const { patientId, wardName, bedNumber } = req.body;

    if (!patientId || !wardName || !bedNumber) {
      return res.status(400).json({
        message: "patientId, wardName, bedNumber are required",
      });
    }

    const bed = await IPDBed.findOne({ wardName, bedNumber });

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.bedStatus === "Occupied") {
      return res.status(400).json({
        message: "Selected bed is already occupied",
      });
    }

    // check if patient already has a bed
    const existing = await IPDBed.findOne({
      patientId,
      bedStatus: "Occupied",
    });

    if (existing) {
      return res.status(400).json({
        message: "Patient already has a bed. Use transfer.",
      });
    }

    bed.patientId = patientId;
    bed.bedStatus = "Occupied";
    bed.assignedDate = new Date();

    await bed.save();

    const updated = await IPDBed.findById(bed._id).populate(
      "patientId",
      "name uniquePatientId phone"
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= TRANSFER BED ================= */
export const transferBed = async (req, res) => {
  try {
    const { fromBedId, toBedId } = req.body;

    if (!fromBedId || !toBedId) {
      return res.status(400).json({
        message: "fromBedId and toBedId are required",
      });
    }

    if (fromBedId === toBedId) {
      return res.status(400).json({
        message: "Source and destination cannot be same",
      });
    }

    const fromBed = await IPDBed.findById(fromBedId);
    const toBed = await IPDBed.findById(toBedId);

    if (!fromBed || !toBed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (fromBed.bedStatus !== "Occupied") {
      return res.status(400).json({
        message: "Source bed is not occupied",
      });
    }

    if (toBed.bedStatus !== "Vacant") {
      return res.status(400).json({
        message: "Destination bed is not vacant",
      });
    }

    // transfer
    toBed.patientId = fromBed.patientId;
    toBed.bedStatus = "Occupied";
    toBed.assignedDate = new Date();

    fromBed.patientId = null;
    fromBed.bedStatus = "Vacant";
    fromBed.assignedDate = null;

    await Promise.all([fromBed.save(), toBed.save()]);

    res.json({ message: "Bed transfer successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DISCHARGE ================= */
export const dischargeBed = async (req, res) => {
  try {
    const { id } = req.params;

    const bed = await IPDBed.findById(id);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.bedStatus !== "Occupied") {
      return res.status(400).json({
        message: "Bed is already vacant",
      });
    }

    bed.patientId = null;
    bed.bedStatus = "Vacant";
    bed.assignedDate = null;

    await bed.save();

    res.json({
      message: "Patient discharged and bed released",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};