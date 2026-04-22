import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stats = [
    { number: "25+", label: "Years of Excellence", icon: "🏆", color: "from-blue-600 to-indigo-600" },
    { number: "500+", label: "Expert Doctors", icon: "👨‍⚕️", color: "from-emerald-600 to-teal-600" },
    { number: "100k+", label: "Happy Patients", icon: "😊", color: "from-purple-600 to-pink-600" },
    { number: "50+", label: "Awards Won", icon: "🌟", color: "from-orange-600 to-red-600" },
  ];

  const values = [
    {
      title: "Compassionate Care",
      description: "We treat every patient with empathy, respect, and personalized attention.",
      icon: "❤️",
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Medical Excellence",
      description: "State-of-the-art technology and world-class medical expertise.",
      icon: "🏥",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Patient First",
      description: "Your health and well-being are our topmost priority.",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Innovation",
      description: "Constantly evolving with cutting-edge medical advancements.",
      icon: "💡",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Integrity",
      description: "Honest, transparent, and ethical medical practices.",
      icon: "⚖️",
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Excellence",
      description: "Striving for perfection in every aspect of healthcare.",
      icon: "⭐",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const milestones = [
    { year: "1998", title: "Foundation", description: "The Clinical Curative was established with a vision to revolutionize healthcare." },
    { year: "2005", title: "First Expansion", description: "Opened our first multi-specialty wing with advanced facilities." },
    { year: "2012", title: "International Recognition", description: "Received global accreditation for medical excellence." },
    { year: "2018", title: "Digital Innovation", description: "Launched telemedicine and AI-powered diagnostics." },
    { year: "2024", title: "Future Ready", description: "Expanding to serve more communities with cutting-edge care." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-6 max-w-screen-2xl relative z-10">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-extrabold mb-6"
            >
              Excellence in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300"> Sanctuary Care</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Where advanced medicine meets compassionate healing
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4"
              >
                🎯
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional, patient-centered healthcare that combines cutting-edge medical technology
                with compassionate human touch, making quality healthcare accessible to all.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4"
              >
                👁️
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the world's most trusted healthcare sanctuary, setting new standards in medical excellence,
                innovation, and patient satisfaction globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center text-white"
              >
                <div className={`text-5xl mb-3 bg-gradient-to-r ${stat.color} inline-block p-4 rounded-full`}>
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ count: 0 }}
                  whileInView={{ count: parseInt(stat.number) }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-blue-100 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20" ref={ref}>
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that shaped our legacy
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 h-full hidden md:block"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 md:w-1/2 p-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="hidden md:block w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-md z-10 mx-4"></div>

                <div className="flex-1 md:w-1/2 p-6"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visionary leaders driving healthcare excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Julian Sterling", role: "Chief Medical Officer", image: "👨‍⚕️", color: "from-blue-600 to-blue-400" },
              { name: "Dr. Elena Rodriguez", role: "Director of Neurology", image: "👩‍⚕️", color: "from-emerald-600 to-emerald-400" },
              { name: "Dr. Marcus Thorne", role: "Head of Surgery", image: "👨‍⚕️", color: "from-purple-600 to-purple-400" }
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
              >
                <div className={`bg-gradient-to-r ${leader.color} p-8 text-center`}>
                  <div className="text-6xl mb-2">{leader.image}</div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/doctors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                View All Doctors →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="container mx-auto px-6 max-w-screen-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their health
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link to="/store">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  Visit Our Store
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;