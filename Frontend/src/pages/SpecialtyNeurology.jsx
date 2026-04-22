import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SpecialtyNeurology = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/appointment", { state: { specialty: "Neurology", doctor: "Dr. Elena Rodriguez" } });
  };

  const conditions = [
    { name: "Epilepsy", icon: "🧠", treatment: "Advanced EEG monitoring" },
    { name: "Stroke", icon: "🩸", treatment: "Rapid response protocol" },
    { name: "Parkinson's", icon: "🤝", treatment: "Specialized care" },
    { name: "Multiple Sclerosis", icon: "🦋", treatment: "Immunotherapy" },
    { name: "Migraine", icon: "😖", treatment: "Personalized treatment" },
    { name: "Alzheimer's", icon: "🧩", treatment: "Memory care program" }
  ];

  const doctors = [
    { name: "Dr. Elena Rodriguez", role: "Chief Neurologist", experience: "18+ years", image: "👩‍⚕️" },
    { name: "Dr. James Wilson", role: "Stroke Specialist", experience: "12+ years", image: "👨‍⚕️" },
    { name: "Dr. Anita Desai", role: "Pediatric Neurologist", experience: "10+ years", image: "👩‍⚕️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white py-20 overflow-hidden">
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
                Brain & Nervous System
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Neurology Department</h1>
              <p className="text-lg text-purple-100 mb-6">
                Specialized treatments for complex brain and nervous system disorders with 12 world-class specialists.
              </p>
              <p className="text-purple-100">
                Our neurology team uses advanced diagnostic tools and innovative treatment approaches for conditions like epilepsy, stroke, Parkinson's, and multiple sclerosis.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Book Neurologist Appointment →
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
                neurology
              </motion.span>
              <h3 className="text-2xl font-bold mb-2">24/7 Stroke Care</h3>
              <p>Rapid response team for emergency neurological conditions</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Conditions We Treat</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive care for neurological disorders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, index) => (
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
                <div className="text-4xl mb-4">{condition.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{condition.name}</h3>
                <p className="text-gray-600">{condition.treatment}</p>
                <button className="mt-3 text-purple-600 text-sm font-semibold">Consult Now →</button>
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet Our Neurologists</h2>
            <p className="text-xl text-gray-600">Expert brain and nervous system specialists</p>
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
                onClick={() => navigate("/appointment", { state: { specialty: "Neurology", doctor: doctor.name } })}
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
                  <div className="text-6xl">{doctor.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{doctor.role}</p>
                  <p className="text-gray-500 text-sm">{doctor.experience} experience</p>
                  <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 max-w-screen-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Neurological Consultation?</h2>
            <p className="text-purple-100 mb-6">Book an appointment with our expert neurologists</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookAppointment}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Schedule Appointment →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpecialtyNeurology;