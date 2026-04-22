import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SpecialtyOncology = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/appointment", { state: { specialty: "Oncology", doctor: "Dr. Lisa Wong" } });
  };

  const treatments = [
    { name: "Immunotherapy", icon: "🛡️", description: "Boost immune system to fight cancer", success: "85%" },
    { name: "Chemotherapy", icon: "💊", description: "Targeted drug therapy", success: "75%" },
    { name: "Radiation Therapy", icon: "☢️", description: "Precision radiation", success: "90%" },
    { name: "Surgical Oncology", icon: "🔪", description: "Minimally invasive surgery", success: "88%" },
    { name: "Targeted Therapy", icon: "🎯", description: "Molecular targeted treatment", success: "82%" },
    { name: "Hormone Therapy", icon: "⚖️", description: "Hormonal cancer treatment", success: "78%" }
  ];

  const doctors = [
    { name: "Dr. Lisa Wong", role: "Chief Oncologist", experience: "20+ years", image: "👩‍⚕️" },
    { name: "Dr. Robert Chen", role: "Radiation Oncologist", experience: "15+ years", image: "👨‍⚕️" },
    { name: "Dr. Neha Gupta", role: "Surgical Oncologist", experience: "12+ years", image: "👩‍⚕️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-800 text-white py-20 overflow-hidden">
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
                Cancer Care Excellence
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Oncology Institute</h1>
              <p className="text-lg text-teal-100 mb-6">
                Next-generation immunotherapy and precision medicine for cancer care with a 98% success rate.
              </p>
              <p className="text-teal-100">
                Our oncology team provides compassionate, cutting-edge cancer care with personalized treatment plans and 24/7 support.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="mt-8 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Start Your Journey →
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="material-symbols-outlined text-7xl mb-4 inline-block"
              >
                oncology
              </motion.span>
              <h3 className="text-2xl font-bold mb-2">98% Success Rate</h3>
              <p>In early-stage cancer treatments</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Advanced Cancer Treatments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized care plans using cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
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
                <div className="text-4xl mb-4">{treatment.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{treatment.name}</h3>
                <p className="text-gray-600 mb-2">{treatment.description}</p>
                <div className="mt-3 pt-3 border-t">
                  <span className="text-teal-600 font-bold">Success Rate: {treatment.success}</span>
                </div>
                <button className="mt-2 text-teal-600 text-sm font-semibold">Book Consultation →</button>
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet Our Oncologists</h2>
            <p className="text-xl text-gray-600">World-class cancer specialists</p>
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
                onClick={() => navigate("/appointment", { state: { specialty: "Oncology", doctor: doctor.name } })}
              >
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
                  <div className="text-6xl">{doctor.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium mb-2">{doctor.role}</p>
                  <p className="text-gray-500 text-sm">{doctor.experience} experience</p>
                  <button className="mt-3 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 max-w-screen-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hope Lives Here</h2>
            <p className="text-teal-100 mb-6">Start your cancer treatment journey with us</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookAppointment}
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Book Consultation →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpecialtyOncology;