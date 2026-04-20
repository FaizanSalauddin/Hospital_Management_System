import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Add doctor form state - removed image
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    availableTime: "",
  });

  const navigate = useNavigate();

  // 🔐 auth
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, []);

  // 🔹 fetch data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchData = async () => {
      try {
        const usersRes = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const apptRes = await API.get("/admin/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const docRes = await API.get("/doctors");

        setUsers(usersRes.data);
        setAppointments(apptRes.data);
        setDoctors(docRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🔹 add doctor function - removed image
  const addDoctor = async () => {
    // Validate fields
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.availableTime) {
      setPopupMessage("Please fill all fields! ⚠️");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const doctorData = {
        name: newDoctor.name,
        specialization: newDoctor.specialization,
        availableTime: newDoctor.availableTime,
      };

      const res = await API.post("/admin/doctors", doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      setDoctors([...doctors, res.data]);

      // Show success popup
      setPopupMessage("Doctor added successfully! ✅");
      setShowPopup(true);

      // Auto hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Reset form
      setNewDoctor({ name: "", specialization: "", availableTime: "" });
    } catch (err) {
      console.error("Error adding doctor:", err);
      setPopupMessage("Failed to add doctor ❌");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  // 🔹 logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${popupMessage.includes("✅") ? "bg-green-500" :
              popupMessage.includes("⚠️") ? "bg-yellow-500" : "bg-red-500"
            } text-white`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {popupMessage}
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🔥 SIDEBAR */}
      <div className={`fixed md:relative z-50 w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-gray-400 text-sm mt-1">Manage your platform</p>
        </div>

        <div className="flex-1 space-y-2">
          <button
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "users"
              ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            Users
            {users.length > 0 && activeTab !== "users" && (
              <span className="ml-auto bg-gray-700 px-2 py-0.5 rounded-full text-xs">{users.length}</span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("doctors");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "doctors"
              ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Doctors
            {doctors.length > 0 && activeTab !== "doctors" && (
              <span className="ml-auto bg-gray-700 px-2 py-0.5 rounded-full text-xs">{doctors.length}</span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("appointments");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "appointments"
              ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Appointments
            {appointments.length > 0 && activeTab !== "appointments" && (
              <span className="ml-auto bg-gray-700 px-2 py-0.5 rounded-full text-xs">{appointments.length}</span>
            )}
          </button>
        </div>

        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 mt-8 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-4 md:p-8 overflow-x-auto mt-16 md:mt-0">

        {/* Header with gradient */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent capitalize">
            {activeTab}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>

        {/* USERS */}
        {activeTab === "users" && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{u.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{u.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {users.map(u => (
                <div key={u._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">User</p>
                    </div>
                  </div>
                  <div className="space-y-1 pl-2">
                    <p className="text-sm"><span className="text-gray-500">📧</span> {u.email}</p>
                    <p className="text-sm"><span className="text-gray-500">📱</span> {u.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOCTORS */}
        {activeTab === "doctors" && (
          <>
            {/* ADD DOCTOR - Without Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Doctor
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    placeholder="Enter doctor's full name"
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <input
                    placeholder="e.g., Cardiologist, Dentist"
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Time</label>
                  <input
                    placeholder="e.g., 10AM-2PM, 9AM-5PM"
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={newDoctor.availableTime}
                    onChange={(e) => setNewDoctor({ ...newDoctor, availableTime: e.target.value })}
                  />
                </div>
              </div>

              <button
                className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md"
                onClick={addDoctor}
              >
                Add Doctor
              </button>
            </div>

            {/* DOCTOR TABLE - Without Image Column */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Specialization</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {doctors.map(d => (
                      <tr key={d._id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{d.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{d.specialization}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{d.availableTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Doctor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map(a => (
                      <tr key={a._id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{a.patient?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{a.doctor?.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{a.date}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{a.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {appointments.map(a => (
                <div key={a._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {a.patient?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{a.patient?.name}</p>
                        <p className="text-xs text-gray-400">Patient</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{a.time}</span>
                  </div>
                  <div className="pl-2 space-y-1">
                    <p className="text-sm"><span className="text-gray-500">👨‍⚕️ Doctor:</span> {a.doctor?.name}</p>
                    <p className="text-sm"><span className="text-gray-500">📅 Date:</span> {a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty states */}
        {activeTab === "users" && users.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400">No users found</p>
          </div>
        )}
        {activeTab === "doctors" && doctors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400">No doctors added yet</p>
          </div>
        )}
        {activeTab === "appointments" && appointments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400">No appointments scheduled</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;