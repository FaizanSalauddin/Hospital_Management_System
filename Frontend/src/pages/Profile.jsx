import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  // 🔐 auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else {
      setUser(savedUser);
    }
  }, []);

  // 🔹 fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get("/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>

        {/* 👤 USER INFO */}
        <div className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Profile Info</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* 📅 APPOINTMENTS */}
        <div className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">My Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className="border p-4 mb-3 rounded">
                <p><strong>Doctor:</strong> {appt.doctor?.name}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Status:</strong> {appt.status}</p>
              </div>
            ))
          )}
        </div>

        {/* 🔴 LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded font-bold"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;