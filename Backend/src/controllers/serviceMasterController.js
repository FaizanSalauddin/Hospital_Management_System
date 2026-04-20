import ServiceMaster from "../models/ServiceMaster.js";

const defaultSampleServices = [
  {
    serviceName: "Consultation",
    department: "General OPD",
    charge: 500,
    status: "Active",
  },
  {
    serviceName: "Blood Test",
    department: "Pathology",
    charge: 300,
    status: "Active",
  },
  {
    serviceName: "ECG",
    department: "Cardiology",
    charge: 400,
    status: "Active",
  },
  {
    serviceName: "Xray",
    department: "Radiology",
    charge: 700,
    status: "Active",
  },
];

export const createService = async (req, res) => {
  try {
    const service = await ServiceMaster.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    let services = await ServiceMaster.find({ status: "Active" }).sort({ serviceName: 1 });

    // Auto-seed defaults when collection is empty.
    if (services.length === 0) {
      await ServiceMaster.insertMany(defaultSampleServices);
      services = await ServiceMaster.find({ status: "Active" }).sort({ serviceName: 1 });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const seedSampleServices = async (req, res) => {
  try {
    const inserted = [];

    for (const service of defaultSampleServices) {
      const existing = await ServiceMaster.findOne({
        serviceName: service.serviceName,
      });

      if (!existing) {
        const created = await ServiceMaster.create(service);
        inserted.push(created);
      }
    }

    res.status(201).json({
      message: "Sample services seeded successfully",
      insertedCount: inserted.length,
      inserted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
