import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FloatingActionButton = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <Link to="/appointment">
        <button className="fixed bottom-8 right-8 bg-gradient-to-br from-primary to-primary-container text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group z-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="absolute right-full mr-4 bg-on-surface text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Schedule Now
          </span>
        </button>
      </Link>
    </motion.div>
  )
}

export default FloatingActionButton