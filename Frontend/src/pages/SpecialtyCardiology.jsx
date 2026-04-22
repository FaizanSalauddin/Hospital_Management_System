import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SpecialtyCardiology = () => {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const handleBookAppointment = () => {
    navigate("/appointment", { state: { specialty: "Cardiology", doctor: "Dr. Sarah Chen" } });
  };

  const services = [
    { name: "Cardiac Catheterization", icon: "🫀", description: "Minimally invasive diagnostic procedure" },
    { name: "Angioplasty", icon: "🩸", description: "Opening blocked arteries" },
    { name: "Heart Bypass Surgery", icon: "❤️", description: "Advanced surgical techniques" },
    { name: "Pacemaker Implantation", icon: "⚡", description: "Rhythm management" },
    { name: "ECG/EKG", icon: "📊", description: "Heart rhythm monitoring" },
    { name: "Echocardiography", icon: "🩺", description: "Ultrasound of the heart" }
  ];

  const doctors = [
    { name: "Dr. Sarah Chen", role: "Chief Cardiologist", experience: "15+ years", image: "👩‍⚕️" },
    { name: "Dr. Michael Reynolds", role: "Interventional Cardiologist", experience: "12+ years", image: "👨‍⚕️" },
    { name: "Dr. Priya Sharma", role: "Cardiac Surgeon", experience: "10+ years", image: "👩‍⚕️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-pink-800 text-white py-20 overflow-hidden">
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
                Heart Care Excellence
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Advanced Cardiovascular Center</h1>
              <p className="text-lg text-red-100 mb-6">
                Pioneering minimally invasive heart procedures and personalized rhythm management protocols.
              </p>
              <p className="text-red-100">
                Our cardiology department combines cutting-edge technology with compassionate care to deliver the best outcomes for our patients.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookAppointment}
                className="mt-8 bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Schedule Consultation →
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
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                cardiology
              </motion.span>
              <h3 className="text-2xl font-bold mb-2">24/7 Emergency Cardiac Care</h3>
              <p>Rapid response team available around the clock</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-3xl font-bold">📞 +1-800-HEART-911</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Our Cardiac Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive heart care under one roof
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer"
                onClick={handleBookAppointment}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-3 text-red-600 text-sm font-semibold">Book Appointment →</button>
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet Our Cardiologists</h2>
            <p className="text-xl text-gray-600">World-class heart specialists</p>
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
                onClick={() => navigate("/appointment", { state: { specialty: "Cardiology", doctor: doctor.name } })}
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
                  <div className="text-6xl">{doctor.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-red-600 font-medium mb-2">{doctor.role}</p>
                  <p className="text-gray-500 text-sm">{doctor.experience} experience</p>
                  <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                    Book with {doctor.name.split(" ")[1]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 max-w-screen-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Healthy Heart?</h2>
            <p className="text-red-100 mb-6">Book your appointment with our expert cardiologists today</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookAppointment}
              className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Book Appointment Now →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpecialtyCardiology;