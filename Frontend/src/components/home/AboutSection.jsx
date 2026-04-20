import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-32 bg-surface-container-low" ref={ref}>
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl"></div>
            <img 
              alt="modern hospital exterior" 
              className="rounded-xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5]" 
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl z-20 max-w-[200px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="block text-4xl font-extrabold text-primary mb-1">25+</span>
              <span className="text-sm font-medium text-on-surface-variant">Years of Clinical Excellence</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">The Sanctuary Philosophy</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-8 leading-tight">
              Advanced Care in a Healing Environment.
            </h2>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              The Clinical Curative was founded on the principle that the environment is just as vital as the treatment. Our facilities are designed to reduce cortisol levels and promote rapid neurological recovery.
            </p>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              From our robotic-assisted surgical theaters to our patient-centric recovery suites, every square inch of our facility serves one purpose: your holistic well-being.
            </p>
            <button 
              onClick={() => document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block font-bold text-primary border-b-2 border-primary-fixed-dim pb-1 hover:border-primary transition-all"
            >
              Explore Our Legacy →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection