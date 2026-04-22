import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // ✅ login check
    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [location.pathname]) // Re-check when route changes

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        window.location.href = "/"
    }

    const navLinks = [

        { name: 'Home', path: '/' },
        { name: 'Doctors', path: '/doctors' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Store', path: '/store' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },

    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md py-4'
            }`}>
            <div className="container mx-auto px-6 max-w-screen-2xl">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">CC</span>
                        </div>
                        <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'
                            }`}>
                            Clinical Curative
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-base font-medium transition-colors duration-200 ${location.pathname === link.path
                                    ? scrolled ? 'text-blue-600' : 'text-white'
                                    : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${scrolled
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                                            : 'bg-white text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        My Profile
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border ${scrolled
                                        ? 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:text-gray-900'
                                        }`}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${scrolled
                                            ? 'text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
                                            : 'text-white border-2 border-white hover:bg-white hover:text-gray-900'
                                            }`}
                                    >
                                        Sign In
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${scrolled
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                                            : 'bg-white text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none"
                    >
                        <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
                            <span className={`w-6 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                                } ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                            <span className={`w-6 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                } ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                            <span className={`w-6 h-0.5 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                                } ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 pt-4 border-t border-gray-200 bg-white rounded-lg shadow-lg"
                        >
                            <div className="flex flex-col space-y-3 p-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${location.pathname === link.path
                                            ? 'bg-blue-50 text-blue-600 font-semibold'
                                            : 'text-gray-800 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="pt-4 space-y-2">
                                    {isLoggedIn ? (
                                        <>
                                            <Link to="/profile" onClick={() => setIsOpen(false)}>
                                                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold">
                                                    My Profile
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false)
                                                    handleLogout()
                                                }}
                                                className="w-full px-6 py-2 border border-red-500 text-red-600 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                                <button className="w-full px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all">
                                                    Sign In
                                                </button>
                                            </Link>
                                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold">
                                                    Register
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar