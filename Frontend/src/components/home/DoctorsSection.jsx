import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import API from "../../services/api";
import { Link } from 'react-router-dom'
import doctorImage from "../../assets/images/Doctor.png";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleBookAppointment = (doctor) => {
    navigate('/appointment', { state: { doctor } });
  };

  if (loading) {
    return (
      <section className="py-32 bg-surface-container-low">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <motion.div
          className="flex justify-between items-end mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface mb-4">
              The Clinical Board
            </h2>
            <p className="text-on-surface-variant">
              Global experts recruited from the world's leading medical institutions.
            </p>
          </div>
          <Link to="/doctors" className="text-primary font-bold hover:underline">
            View All Doctors →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doc, index) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={doctorImage}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    <button
                      onClick={() => handleBookAppointment(doc)}
                      className="flex-1 bg-white rounded-full py-2 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">{doc.specialization}</div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">{doc.name}</h3>
                  <p className="text-on-surface-variant text-sm">{doc.availableTime}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;