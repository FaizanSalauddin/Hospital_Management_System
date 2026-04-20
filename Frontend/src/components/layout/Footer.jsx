import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-container rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CC</span>
              </div>
              <span className="text-xl font-bold">Clinical Curative</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing world-class healthcare with compassion and excellence since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/doctors" className="text-gray-400 hover:text-primary transition-colors">Our Doctors</Link></li>
              <li><Link to="/facilities" className="text-gray-400 hover:text-primary transition-colors">Facilities</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Healthcare Ave, Medical City</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ info@clinicalcurative.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Emergency Care</h3>
            <ul className="space-y-2 text-gray-400">
              <li>🚑 24/7 Emergency Services</li>
              <li>🕒 Mon-Fri: 8:00 AM - 8:00 PM</li>
              <li>🕒 Sat-Sun: 9:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Clinical Curative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer