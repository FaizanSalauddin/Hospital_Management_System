import { useNavigate } from "react-router-dom";

const AppointmentSection = () => {
   const navigate = useNavigate();
  return (
    <section className="py-32 relative overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-10">
        <img alt="" className="w-full h-full object-cover" src="/images/appointment-bg.jpg" />
      </div>
      
      <div className="container mx-auto px-6 max-w-screen-2xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Secure Your Priority Consultation</h2>
            <p className="text-primary-fixed text-lg mb-12 leading-relaxed">Our concierge health team will respond within 60 minutes to finalize your diagnostic appointment and assign your personal care coordinator.</p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-white font-medium">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary-fixed">
                  <span className="material-symbols-outlined text-sm">check</span>
                </span>
                Direct insurance coordination
              </li>
              <li className="flex items-center gap-4 text-white font-medium">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary-fixed">
                  <span className="material-symbols-outlined text-sm">check</span>
                </span>
                Same-day urgent assessments
              </li>
              <li className="flex items-center gap-4 text-white font-medium">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary-fixed">
                  <span className="material-symbols-outlined text-sm">check</span>
                </span>
                Virtual & in-person hybrid care
              </li>
            </ul>
          </div>
          
          <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-3xl">
            <form  className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Full Legal Name</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" placeholder="e.g. Alexander Hamilton" type="text" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Primary Phone</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" placeholder="+1 (000) 000-0000" type="tel" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Department</label>
                <select disabled className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3">
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Preferred Date</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" type="date" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Insurance Provider</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" placeholder="Optional" type="text" />
              </div>
              <div className="col-span-2 pt-4">
                <button onClick={()=>{navigate("/appointment")}} className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-[0.99] transition-all">
                  Request Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentSection