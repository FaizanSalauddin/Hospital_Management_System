import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="modern hospital interior" 
          className="w-full h-full object-cover opacity-20" 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-screen-2xl">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-widest uppercase mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            World-Class Medical Sanctuary
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your Health is Our <span className="text-primary italic">Highest</span> Priority.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience medicine reimagined through editorial precision and compassionate care. We blend advanced technology with a human-centric approach.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => navigate('/appointment')}
              className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Your Recovery
            </button>
            <button 
              onClick={() => navigate('/doctors')}
              className="px-10 py-4 bg-surface-container-highest text-on-primary-fixed-variant rounded-full font-bold text-lg hover:bg-surface-container-high transition-all hover:scale-105"
            >
              Our Specialties
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection