import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import API from "../services/api";
import doctorImage from "../assets/images/Doctor.png";

const DoctorCard = ({ doctor, index }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/appointment', { state: { doctor } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
        <div className="relative h-80 overflow-hidden">
          <img
            src={doctorImage}
            alt={doctor.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">{doctor.specialization}</div>
          <h3 className="text-xl font-bold text-on-surface mb-1">{doctor.name}</h3>
          <p className="text-on-surface-variant text-sm mb-4">{doctor.availableTime}</p>
          <button
            onClick={handleBookAppointment}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white rounded-full py-2 font-semibold hover:shadow-lg transition-all"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.log("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Our Expert Doctors
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-container rounded-full mx-auto mb-6"></div>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Meet our team of world-class medical professionals dedicated to your health and well-being
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doc, index) => (
            <DoctorCard key={doc._id} doctor={doc} index={index} />
          ))}
        </div>

        {doctors.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No doctors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;