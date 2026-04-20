import { useState } from "react";
import API from "../services/api";

const PatientEnquiry = () => {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setPatients([]);

    if (!query.trim()) {
      setError("Please enter Patient ID, name, or phone.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.get(`/patients/search?query=${encodeURIComponent(query)}`);
      setPatients(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch patient data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reception Patient Enquiry</h1>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Patient ID (UHID), Name, or Phone"
            className="flex-1 border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3">UHID</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Gender</th>
                <th className="text-left px-4 py-3">Age</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Address</th>
              </tr>
            </thead>
            <tbody>
              {!loading && patients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient._id} className="border-t">
                    <td className="px-4 py-3">{patient.uniquePatientId || "-"}</td>
                    <td className="px-4 py-3">{patient.name || "-"}</td>
                    <td className="px-4 py-3">{patient.gender || "-"}</td>
                    <td className="px-4 py-3">{patient.age ?? "-"}</td>
                    <td className="px-4 py-3">{patient.phone || "-"}</td>
                    <td className="px-4 py-3">{patient.address || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientEnquiry;
