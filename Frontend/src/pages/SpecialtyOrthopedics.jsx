import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SpecialtyOrthopedics = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/appointment", { state: { specialty: "Orthopedics", doctor: "Dr. Marcus Thorne" } });
  };

  const procedures = [
    { name: "Joint Replacement", icon: "🦿", description: "Hip, Knee, Shoulder replacement" },
    { name: "Arthroscopy", icon: "🔬", description: "Minimally invasive joint surgery" },
    { name: "Spine Surgery", icon: "🦴", description: "Advanced spinal procedures" },
    { name: "Sports Medicine", icon: "⚽", description: "Athletic injury treatment" },
    { name: "Fracture Care", icon: "🩹", description: "Complex fracture management" },
    { name: "Pediatric Orthopedics", icon: "👶", description: "Children's bone care" }
  ];

  const doctors = [
    { name: "Dr. Marcus Thorne", role: "Chief Orthopedic Surgeon", experience: "18+ years", image: "👨‍⚕️" },
    { name: "Dr. Emily Watson", role: "Sports Medicine Specialist", experience: "12+ years", image: "👩‍⚕️" },
    { name: "Dr. Vikram Singh", role: "Joint Replacement Expert", experience: "15+ years", image: "👨‍⚕️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-800 text-white py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <div className="container mx-auto px-6 max-w-screen-2xl relative z-10">
          <Link to="/">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-white/80 hover:text-white mb-8 inline-flex items-center gap-2"
            >
              ← Back to Home
            </motion.button>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4">
                Bone & Joint Care
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Orthopaedics Center</h1>
              <p className="text-lg text-blue-100 mb-6">
                Expert care for skeletal, joint, and muscular health and recovery.
              </p>
              <p className="text-blue-100">
                From sports injuries to joint replacements, our orthopaedic surgeons provide comprehensive care using the latest minimally invasive techniques.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Consult Orthopedist →
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
            >
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="material-symbols-outlined text-7xl mb-4 inline-block"
              >
                orthopedics
              </motion.span>
              <h3 className="text-2xl font-bold mb-2">Same-Day Appointments</h3>
              <p>For urgent orthopaedic conditions</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Our Procedures</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced orthopaedic treatments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((procedure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
                onClick={handleBookAppointment}
              >
                <div className="text-4xl mb-4">{procedure.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{procedure.name}</h3>
                <p className="text-gray-600">{procedure.description}</p>
                <button className="mt-3 text-blue-600 text-sm font-semibold">Book Appointment →</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet Our Orthopedists</h2>
            <p className="text-xl text-gray-600">Expert bone and joint specialists</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center cursor-pointer"
                onClick={() => navigate("/appointment", { state: { specialty: "Orthopedics", doctor: doctor.name } })}
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                  <div className="text-6xl">{doctor.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.role}</p>
                  <p className="text-gray-500 text-sm">{doctor.experience} experience</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 max-w-screen-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Back to Moving</h2>
            <p className="text-blue-100 mb-6">Expert orthopaedic care for all ages</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookAppointment}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Book Appointment →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpecialtyOrthopedics;