import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { useState } from 'react'

const AppointmentSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Cardiology',
    date: '',
    insurance: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/appointment', { state: formData })
  }

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-primary to-primary-container">
      <div className="absolute inset-0 opacity-10">
        <img alt="" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" />
      </div>
      
      <div className="container mx-auto px-6 max-w-screen-2xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Secure Your Priority Consultation</h2>
            <p className="text-primary-fixed text-lg mb-12 leading-relaxed">Our concierge health team will respond within 60 minutes to finalize your diagnostic appointment and assign your personal care coordinator.</p>
            <ul className="space-y-6">
              {[
                'Direct insurance coordination',
                'Same-day urgent assessments',
                'Virtual & in-person hybrid care',
                '24/7 patient support'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-4 text-white font-medium"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary-fixed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-surface-container-lowest p-10 rounded-2xl shadow-3xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Full Legal Name</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" 
                  placeholder="e.g. Alexander Hamilton" 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Primary Phone</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" 
                  placeholder="+1 (000) 000-0000" 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Department</label>
                <select 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Oncology</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Preferred Date</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Insurance Provider</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all p-3" 
                  placeholder="Optional" 
                  type="text"
                  value={formData.insurance}
                  onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                />
              </div>
              <div className="col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-[0.99] transition-all"
                >
                  Request Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentSection