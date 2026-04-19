import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-blue-950 rounded-t-[2rem] text-blue-100 font-['Inter'] text-sm leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 w-full max-w-screen-2xl mx-auto">
        <div className="col-span-1">
          <div className="text-2xl font-bold text-white tracking-tight mb-6">
            The Clinical Curative
          </div>
          <p className="text-blue-200/70 mb-8 leading-relaxed">
            Revolutionizing the medical experience through the fusion of high-end design, advanced technology, and human sanctuary principles.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">public</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">emergency_share</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">thumb_up</span>
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Department Hubs</h4>
          <ul className="space-y-4">
            <li><Link to="/specialty/cardiology" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Cardiovascular Health</Link></li>
            <li><Link to="/specialty/neurology" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Neural Restoration</Link></li>
            <li><Link to="/specialty/orthopedics" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Orthopaedic Wing</Link></li>
            <li><Link to="/specialty/oncology" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Oncology Institute</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Patient Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Privacy Policy</a></li>
            <li><a href="#" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Terms of Service</a></li>
            <li><a href="#" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Patient Rights</a></li>
            <li><Link to="/appointment" className="text-blue-200/70 hover:text-white hover:underline underline-offset-8 transition-all">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Contact Sanctuary</h4>
          <p className="text-blue-200/70 mb-4">
            100 Clinical Way, Medical District<br />
            Sanctuary City, SC 90210
          </p>
          <p className="text-blue-200/70 mb-2">Emergency: +1 (800) 999 0000</p>
          <p className="text-blue-200/70">Email: concierge@curative.com</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-10 px-12 text-center text-blue-200/50 text-xs">
        © 2024 The Clinical Curative. All Rights Reserved. Excellence in Sanctuary Care.
      </div>
    </footer>
  )
}

export default Footer