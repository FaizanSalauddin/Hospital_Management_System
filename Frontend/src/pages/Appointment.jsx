import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const selectedDoctorFromState = location.state?.doctor;

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/appointment" } });
    }
  }, []);

  // 🔹 Fetch doctors
  useEffect(() => {
    API.get("/doctors")
      .then(res => {
        setDoctors(res.data);

        if (selectedDoctorFromState) {
          const doctor = res.data.find(d => d._id === selectedDoctorFromState._id);
          if (doctor) {
            setForm(prev => ({
              ...prev,
              department: doctor.specialization,
              doctor: doctor._id
            }));
          }
        }
      })
      .catch(err => console.log(err));
  }, [selectedDoctorFromState]);

  const departments = [...new Set(doctors.map(doc => doc.specialization))];

  useEffect(() => {
    if (form.department) {
      const filtered = doctors.filter(
        doc => doc.specialization === form.department
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [form.department, doctors]);

  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const isValidDate = (selectedDate) => {
    const date = new Date(selectedDate);

    if (date < new Date().setHours(0, 0, 0, 0)) return false;

    const day = date.getDay();
    return !(day === 0 || day === 6);
  };

  const generateSlots = (timeRange) => {
    if (!timeRange) return [];

    const [start, end] = timeRange.split("-");

    const convertTo24 = (time) => {
      let hour = parseInt(time);
      if (time.includes("PM") && hour !== 12) hour += 12;
      if (time.includes("AM") && hour === 12) hour = 0;
      return hour;
    };

    let startHour = convertTo24(start);
    let endHour = convertTo24(end);

    let slots = [];

    for (let h = startHour; h < endHour; h++) {
      const display =
        (h % 12 === 0 ? 12 : h % 12) + ":00 " + (h >= 12 ? "PM" : "AM");
      slots.push(display);
    }

    return slots;
  };

  const selectedDoctor = doctors.find(d => d._id === form.doctor);
  const timeSlots = generateSlots(selectedDoctor?.availableTime);

  // ✅ FIXED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.department || !form.doctor || !form.date || !form.time) {
      return alert("Fill all fields");
    }

    if (!isValidPhone(form.phone)) {
      return alert("Enter valid 10-digit phone number");
    }

    if (!isValidDate(form.date)) {
      return alert("Select valid weekday & future date");
    }

    try {
      const token = localStorage.getItem("token");

      await API.post("/appointments", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Appointment Booked ✅");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Error booking appointment");
    }
  };

  return (
    <div className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Book Appointment
          </h1>

          {selectedDoctorFromState && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {selectedDoctorFromState.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking appointment with:</p>
                  <p className="font-semibold text-gray-800">{selectedDoctorFromState.name}</p>
                  <p className="text-sm text-blue-600">{selectedDoctorFromState.specialization}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
              <input
                type="tel"
                placeholder="10 digit number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                value={form.phone}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Department</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value, doctor: "" })
                }
                value={form.department}
              >
                <option value="">Select Department</option>
                {departments.map((dept, i) => (
                  <option key={i}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Doctor</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                value={form.doctor}
                disabled={!form.department}
              >
                <option value="">{form.department ? "Select Doctor" : "First select department"}</option>
                {filteredDoctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} ({doc.specialization}) - {doc.availableTime}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Preferred Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                value={form.date}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Time Slot</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                value={form.time}
                disabled={!form.doctor}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot, i) => (
                  <option key={i}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 mt-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-full">
                Request Appointment
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;