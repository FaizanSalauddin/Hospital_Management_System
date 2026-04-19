import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔹 Departments auto extract
  const departments = [...new Set(doctors.map(doc => doc.specialization))];

  // 🔹 Filter doctors by department
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

  // 🔹 Phone validation
  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  // 🔹 Date validation
  const isValidDate = (selectedDate) => {
    const date = new Date(selectedDate);

    if (date < new Date().setHours(0, 0, 0, 0)) return false;

    const day = date.getDay();
    return !(day === 0 || day === 6);
  };

  // 🔹 Generate time slots from doctor availability
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

  // 🔹 Selected doctor
  const selectedDoctor = doctors.find(d => d._id === form.doctor);

  const timeSlots = generateSlots(selectedDoctor?.availableTime);

  // 🔹 Submit
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
      await API.post("/appointments", form);
      alert("Appointment Booked ✅");
      navigate("/profile");
    } catch (err) {
      alert("Error booking appointment");
    }
  };

  return (
    <div className="pt-32 pb-20 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Book Appointment
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="col-span-2">
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold">Phone</label>
              <input
                type="text"
                placeholder="10 digit number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Department */}
            <div>
              <label className="text-sm font-semibold">Department</label>
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value, doctor: "" })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dept, i) => (
                  <option key={i}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="col-span-2">
              <label className="text-sm font-semibold">Select Doctor</label>
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-semibold">Preferred Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-sm font-semibold">Time Slot</label>
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot, i) => (
                  <option key={i}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Button */}
            <div className="col-span-2 mt-4">
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-bold text-lg transition">
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