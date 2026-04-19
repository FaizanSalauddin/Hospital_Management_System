import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Specialties' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="fixed top-0 md:top-10 w-full z-50 bg-[#faf8ff]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,25,69,0.06)]">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto font-['Manrope'] tracking-tight font-semibold">
        <Link to="/" className="text-xl font-extrabold tracking-tighter text-blue-950 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            medical_services
          </span>
          The Clinical Curative
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-slate-600 font-medium hover:text-blue-800 transition-all duration-300 ${
                  isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
            
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/appointment">
            <Button variant="primary" size="md">
              Book Appointment
            </Button>
          </Link>
          <button
            className="md:hidden text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-slate-600 font-medium py-2 ${
                    isActive ? 'text-blue-700 font-bold' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header