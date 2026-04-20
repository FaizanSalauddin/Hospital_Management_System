import { useNavigate } from 'react-router-dom';
import doctorImage from "../assets/images/Doctor.png";

const DoctorCard = ({ doctor, index = 0, showBookButton = true }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/appointment', { state: { doctor } });
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full">
      <div className="h-80 overflow-hidden relative">
        <img
          src={doctor.image || doctorImage}
          alt={doctor.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
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
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{doctor.title || doctor.specialization}</span>
        <h4 className="text-xl font-bold text-on-surface mb-1">{doctor.name}</h4>
        <p className="text-on-surface-variant text-sm mb-4">{doctor.credentials || doctor.availableTime}</p>
        {showBookButton && (
          <button
            onClick={handleBookAppointment}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white rounded-full py-2 font-semibold hover:shadow-lg transition-all"
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  )
}

export default DoctorCard;