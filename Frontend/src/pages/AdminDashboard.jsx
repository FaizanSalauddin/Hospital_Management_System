import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    availableTime: "",
  });

  const navigate = useNavigate();

  // 🔐 protect route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, []);

  // 🔹 fetch data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    API.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setUsers(res.data));

    API.get("/admin/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setAppointments(res.data));

  }, []);

  // 🔹 add doctor
  const addDoctor = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    await API.post("/admin/doctors", doctor, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Doctor added");
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* USERS */}
      <h2 className="text-xl font-bold">Users</h2>
      {users.map(u => <p key={u._id}>{u.name} - {u.email}</p>)}

      {/* APPOINTMENTS */}
      <h2 className="text-xl font-bold mt-6">Appointments</h2>
      {appointments.map(a => (
        <div key={a._id} className="border p-2 mb-2">
          <p>User: {a.patient?.name}</p>
          <p>Doctor: {a.doctor?.name}</p>
          <p>Date: {a.date}</p>
          <p>Time: {a.time}</p>
        </div>
      ))}

      {/* ADD DOCTOR */}
      <h2 className="text-xl font-bold mt-6">Add Doctor</h2>
      <form onSubmit={addDoctor} className="space-y-2">
        <input placeholder="Name" onChange={(e)=>setDoctor({...doctor,name:e.target.value})}/>
        <input placeholder="Specialization" onChange={(e)=>setDoctor({...doctor,specialization:e.target.value})}/>
        <input placeholder="Time (10AM-2PM)" onChange={(e)=>setDoctor({...doctor,availableTime:e.target.value})}/>
        <button className="bg-blue-600 text-white p-2">Add</button>
      </form>

    </div>
  );
};

export default AdminDashboard;