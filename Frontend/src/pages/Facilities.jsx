import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Facilities = () => {
  const [activeTab, setActiveTab] = useState("OPD");
  const [healthPackages, setHealthPackages] = useState([]);
  const navigate = useNavigate();

  const fallbackPackages = [
    { _id: "general-checkup", packageName: "General Checkup", price: 3000 },
    { _id: "cardiac-checkup", packageName: "Cardiac Checkup", price: 5500 },
    {
      _id: "executive-health-package",
      packageName: "Executive Health Package",
      price: 6000,
    },
  ];

  const packagesToShow = healthPackages.length > 0 ? healthPackages : fallbackPackages;

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const res = await API.get("/health-packages");
        setHealthPackages(res.data || []);
      } catch (error) {
        // Keep facilities page resilient if package API is unavailable.
        setHealthPackages([]);
      }
    };

    fetchHealthPackages();
  }, []);

  return (
    <div className="pt-32">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <h1 className="text-5xl font-extrabold text-on-surface mb-8">Our Facilities</h1>

        <div className="flex gap-3 mb-8">
          {["OPD", "IPD"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === tab
                  ? "bg-blue-700 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "OPD" ? (
          <div className="pb-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
                <h2 className="text-2xl font-bold mb-2">Patient Enquiry</h2>
                <p className="text-slate-600 mb-5">
                  Search patients by UHID, name, or phone at reception.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/reception/patient-enquiry")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Open Patient Enquiry
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
                <h2 className="text-2xl font-bold mb-2">OPD Billing</h2>
                <p className="text-slate-600 mb-5">
                  Create OPD bills, manage services, and print invoices.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/reception/opd-billing")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Open OPD Billing
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Health Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packagesToShow.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="bg-white rounded-2xl shadow p-6 border border-slate-100"
                  >
                    <h3 className="text-xl font-bold mb-2">{pkg.packageName}</h3>
                    <p className="text-slate-700 font-semibold mb-5">
                      Rs. {Number(pkg.price || 0).toFixed(0)}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/facilities/health-packages/${pkg._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-12">
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h2 className="text-2xl font-bold mb-2">IPD</h2>
              <p className="text-slate-600">IPD facilities content coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facilities;