import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const HealthPackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [healthPackage, setHealthPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackPackageMap = {
    "general-checkup": {
      _id: "general-checkup",
      packageName: "General Checkup",
      price: 3000,
      includedServices: ["Consultation", "Blood Test", "ECG", "Xray"],
    },
    "cardiac-checkup": {
      _id: "cardiac-checkup",
      packageName: "Cardiac Checkup",
      price: 5500,
      includedServices: ["Consultation", "Blood Test", "ECG", "Xray"],
    },
    "executive-health-package": {
      _id: "executive-health-package",
      packageName: "Executive Health Package",
      price: 6000,
      includedServices: ["Consultation", "Blood Test", "ECG", "Xray"],
    },
  };

  useEffect(() => {
    const fetchPackageDetails = async () => {
      const fallbackPackage = fallbackPackageMap[id];
      if (fallbackPackage) {
        setHealthPackage(fallbackPackage);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await API.get(`/health-packages/${id}`);
        setHealthPackage(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load package details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleUseInBilling = () => {
    if (!healthPackage) return;

    const selectedPackage = {
      id: healthPackage._id,
      packageName: healthPackage.packageName,
      includedServices: healthPackage.includedServices || [],
    };

    // Keep a fallback transport in case route state is unavailable after navigation.
    sessionStorage.setItem(
      "selectedHealthPackageForBilling",
      JSON.stringify(selectedPackage)
    );

    navigate("/reception/opd-billing", {
      state: {
        selectedPackage,
      },
    });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !healthPackage) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 font-medium mb-4">{error || "Package not found."}</p>
          <button
            type="button"
            onClick={() => navigate("/facilities")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Back to Facilities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-blue-50 min-h-screen px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
          <h1 className="text-3xl font-bold mb-2">{healthPackage.packageName}</h1>
          <p className="text-lg font-semibold text-blue-800 mb-6">
            Package Price: Rs. {Number(healthPackage.price || 0).toFixed(0)}
          </p>

          <h2 className="text-2xl font-bold mb-3">Included Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-8">
            {(healthPackage.includedServices || []).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleUseInBilling}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Use in Billing
            </button>
            <button
              type="button"
              onClick={() => navigate("/facilities")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPackageDetails;
