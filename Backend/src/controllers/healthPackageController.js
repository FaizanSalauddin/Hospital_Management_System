import HealthPackage from "../models/HealthPackage.js";

export const getHealthPackages = async (req, res) => {
  try {
    const packages = await HealthPackage.find({ status: "Active" }).sort({
      price: 1,
    });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHealthPackageById = async (req, res) => {
  try {
    const healthPackage = await HealthPackage.findById(req.params.id);

    if (!healthPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.json(healthPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const seedHealthPackages = async (req, res) => {
  try {
    const packageSeeds = [
      {
        packageName: "General Checkup",
        price: 3000,
        includedServices: ["Consultation", "Blood Test", "ECG", "Xray"],
        status: "Active",
      },
      {
        packageName: "Cardiac Checkup",
        price: 5500,
        includedServices: ["Consultation", "ECG", "Xray", "Blood Test"],
        status: "Active",
      },
      {
        packageName: "Executive Health Package",
        price: 6000,
        includedServices: ["Consultation", "Blood Test", "ECG", "Xray"],
        status: "Active",
      },
    ];

    const inserted = [];

    for (const item of packageSeeds) {
      const exists = await HealthPackage.findOne({ packageName: item.packageName });
      if (!exists) {
        const created = await HealthPackage.create(item);
        inserted.push(created);
      }
    }

    res.status(201).json({
      message: "Health packages seeded successfully",
      insertedCount: inserted.length,
      inserted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
