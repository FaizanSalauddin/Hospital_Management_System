import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";

const groupBedsByWard = (beds) =>
  beds.reduce((acc, bed) => {
    const ward = bed.wardName || "Other";
    if (!acc[ward]) acc[ward] = [];
    acc[ward].push(bed);
    return acc;
  }, {});

const IPDBedAllocationPanel = ({ readOnly = false, title = "IPD Bed Allocation" }) => {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [assignForm, setAssignForm] = useState({
    patientId: "",
    wardName: "General Ward",
    bedNumber: "",
  });
  const [transferForm, setTransferForm] = useState({ fromBedId: "", toBedId: "" });
  const [dischargeBedId, setDischargeBedId] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [bedsRes, patientsRes] = await Promise.all([API.get("/ipd-beds"), API.get("/patients")]);
      setBeds(bedsRes.data || []);
      setPatients(patientsRes.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const bedsByWard = useMemo(() => groupBedsByWard(beds), [beds]);
  const vacantBeds = useMemo(() => beds.filter((b) => b.bedStatus === "Vacant"), [beds]);
  const occupiedBeds = useMemo(() => beds.filter((b) => b.bedStatus === "Occupied"), [beds]);
  const availableBedsForWard = useMemo(
    () => vacantBeds.filter((b) => b.wardName === assignForm.wardName),
    [vacantBeds, assignForm.wardName]
  );

  const handleAssign = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!assignForm.patientId || !assignForm.bedNumber) {
      setError("Please select patient and bed");
      return;
    }

    try {
      await API.post("/ipd-beds/assign", assignForm);
      setSuccess("Bed assigned successfully");
      setAssignForm((prev) => ({ ...prev, bedNumber: "" }));
      fetchData();
    } catch (err) {
      setError(err?.response?.data?.message || "Assign failed");
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!transferForm.fromBedId || !transferForm.toBedId) {
      setError("Select both beds");
      return;
    }

    try {
      await API.put("/ipd-beds/transfer", transferForm);
      setSuccess("Transfer successful");
      setTransferForm({ fromBedId: "", toBedId: "" });
      fetchData();
    } catch (err) {
      setError(err?.response?.data?.message || "Transfer failed");
    }
  };

  const handleDischarge = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!dischargeBedId) {
      setError("Select a bed");
      return;
    }

    try {
      await API.put(`/ipd-beds/discharge/${dischargeBedId}`);
      setSuccess("Patient discharged");
      setDischargeBedId("");
      fetchData();
    } catch (err) {
      setError(err?.response?.data?.message || "Discharge failed");
    }
  };

  return (
    <div className="pt-32 pb-20 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              {Object.entries(bedsByWard).map(([ward, wardBeds]) => (
                <div key={ward} className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{ward}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {wardBeds.map((bed) => (
                      <div
                        key={bed._id}
                        className={`p-3 rounded ${
                          bed.bedStatus === "Occupied" ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        <p className="font-bold">{bed.bedNumber}</p>
                        <p>{bed.bedStatus}</p>
                        <p className="text-sm">{bed.patientId?.name || "No patient"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {!readOnly && (
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <form onSubmit={handleAssign} className="p-4 border rounded">
                    <h3 className="font-bold mb-2">Assign Bed</h3>

                    <select
                      value={assignForm.patientId}
                      onChange={(e) =>
                        setAssignForm((p) => ({
                          ...p,
                          patientId: e.target.value,
                        }))
                      }
                      className="w-full mb-2 p-2 border"
                    >
                      <option value="">Select patient</option>
                      {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={assignForm.wardName}
                      onChange={(e) =>
                        setAssignForm((p) => ({
                          ...p,
                          wardName: e.target.value,
                          bedNumber: "",
                        }))
                      }
                      className="w-full mb-2 p-2 border"
                    >
                      <option>General Ward</option>
                      <option>ICU</option>
                      <option>Private</option>
                    </select>

                    <select
                      value={assignForm.bedNumber}
                      onChange={(e) =>
                        setAssignForm((p) => ({
                          ...p,
                          bedNumber: e.target.value,
                        }))
                      }
                      className="w-full mb-2 p-2 border"
                    >
                      <option value="">Select bed</option>
                      {availableBedsForWard.map((b) => (
                        <option key={b._id} value={b.bedNumber}>
                          {b.bedNumber}
                        </option>
                      ))}
                    </select>

                    <button className="bg-blue-600 text-white w-full py-2">Assign</button>
                  </form>

                  <form onSubmit={handleTransfer} className="p-4 border rounded">
                    <h3 className="font-bold mb-2">Transfer</h3>

                    <select
                      value={transferForm.fromBedId}
                      onChange={(e) =>
                        setTransferForm((p) => ({
                          ...p,
                          fromBedId: e.target.value,
                        }))
                      }
                      className="w-full mb-2 p-2 border"
                    >
                      <option value="">From</option>
                      {occupiedBeds.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.bedNumber}
                        </option>
                      ))}
                    </select>

                    <select
                      value={transferForm.toBedId}
                      onChange={(e) =>
                        setTransferForm((p) => ({
                          ...p,
                          toBedId: e.target.value,
                        }))
                      }
                      className="w-full mb-2 p-2 border"
                    >
                      <option value="">To</option>
                      {vacantBeds.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.bedNumber}
                        </option>
                      ))}
                    </select>

                    <button className="bg-blue-600 text-white w-full py-2">Transfer</button>
                  </form>

                  <form onSubmit={handleDischarge} className="p-4 border rounded">
                    <h3 className="font-bold mb-2">Discharge</h3>

                    <select
                      value={dischargeBedId}
                      onChange={(e) => setDischargeBedId(e.target.value)}
                      className="w-full mb-2 p-2 border"
                    >
                      <option value="">Select</option>
                      {occupiedBeds.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.bedNumber}
                        </option>
                      ))}
                    </select>

                    <button className="bg-red-600 text-white w-full py-2">Discharge</button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IPDBedAllocationPanel;
