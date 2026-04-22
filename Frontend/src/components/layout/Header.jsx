import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/Button'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const [cartCount, setCartCount] = useState(0);

  const navLinks = [
    { path: '/', label: 'Specialties' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/profile', label: 'Profile' },
    { path: '/store', label: 'Store' },
  ]

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();

    // Listen for storage events (when cart changes in another tab)
    window.addEventListener('storage', updateCartCount);

    // Custom event for cart updates within the same tab
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Also check cart when component mounts and location changes
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, [location]);

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
                `text-slate-600 font-medium hover:text-blue-800 transition-all duration-300 ${isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <span className="material-symbols-outlined text-slate-600 hover:text-blue-800 transition-colors">
              shopping_cart
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

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
                  `text-slate-600 font-medium py-2 ${isActive ? 'text-blue-700 font-bold' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {/* Mobile cart link */}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-600 font-medium py-2 flex items-center gap-2"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header