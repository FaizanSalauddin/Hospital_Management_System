import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [activeTab, setActiveTab] = useState("users");

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

  // 🔹 logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <div className="space-y-4">
          <button onClick={() => setActiveTab("users")} className="block w-full text-left hover:bg-blue-700 p-2 rounded">
            Users
          </button>

          <button onClick={() => setActiveTab("doctors")} className="block w-full text-left hover:bg-blue-700 p-2 rounded">
            Doctors
          </button>

          <button onClick={() => setActiveTab("appointments")} className="block w-full text-left hover:bg-blue-700 p-2 rounded">
            Appointments
          </button>

          <button onClick={logout} className="block w-full text-left bg-red-500 mt-10 p-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 capitalize">
          {activeTab}
        </h1>

        {/* USERS */}
        {activeTab === "users" && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white shadow rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-t text-center">
                      <td className="p-3">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {users.map(u => (
                <div key={u._id} className="bg-white p-4 rounded shadow">
                  <p><b>Name:</b> {u.name}</p>
                  <p><b>Email:</b> {u.email}</p>
                  <p><b>Phone:</b> {u.phone}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOCTORS */}
        {activeTab === "doctors" && (
          <>
            {/* ➕ ADD DOCTOR */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-bold mb-2">Add Doctor</h3>

              <div className="grid md:grid-cols-3 gap-3">
                <input
                  placeholder="Name"
                  className="border p-2 rounded"
                  value={doctors.name}
                  onChange={(e) => setDoctors({ ...doctors, name: e.target.value })}
                />
                <input
                  placeholder="Specialization"
                  className="border p-2 rounded"
                  value={doctors.specialization}
                  onChange={(e) => setDoctors({ ...doctors, specialization: e.target.value })}
                />
                <input
                  placeholder="10AM-2PM"
                  className="border p-2 rounded"
                  value={doctors.availableTime}
                  onChange={(e) => setDoctors({ ...doctors , availableTime: e.target.value })}
                />
                {/* <button
                  className="bg-blue-600 text-white p-2 rounded col-span-3"
                  onClick={addDoctor}
                >
                  Add Doctor
                </button> */}
              </div>
            </div>

            {/* 📊 DOCTOR TABLE */}
            <div className="bg-white shadow rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.map(d => (
                    <tr key={d._id} className="text-center border-t">
                      <td>{d.name}</td>
                      <td>{d.specialization}</td>
                      <td>{d.availableTime}</td>

                      <td className="space-x-2">
                        {/* DELETE */}
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={async () => {
                            const token = localStorage.getItem("adminToken");

                            await API.delete(`/admin/doctors/${d._id}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            });

                            setDoctors(doctors.filter(doc => doc._id !== d._id));
                          }}
                        >
                          Delete
                        </button>

                        {/* EDIT */}
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={async () => {
                            const name = prompt("Enter new name", d.name);
                            const specialization = prompt("Enter specialization", d.specialization);

                            const token = localStorage.getItem("adminToken");

                            const res = await API.put(
                              `/admin/doctors/${d._id}`,
                              { name, specialization },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );

                            setDoctors(doctors.map(doc =>
                              doc._id === d._id ? res.data : doc
                            ));
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <>
            <div className="hidden md:block bg-white shadow rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">User</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a._id} className="border-t text-center">
                      <td className="p-3">{a.patient?.name}</td>
                      <td>{a.doctor?.name}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {appointments.map(a => (
                <div key={a._id} className="bg-white p-4 rounded shadow">
                  <p><b>User:</b> {a.patient?.name}</p>
                  <p><b>Doctor:</b> {a.doctor?.name}</p>
                  <p><b>Date:</b> {a.date}</p>
                  <p><b>Time:</b> {a.time}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;