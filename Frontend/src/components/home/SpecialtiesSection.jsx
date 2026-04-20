import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialtiesSection = () => {
  const specialties = [
    {
      id: 'cardiology',
      title: 'Advanced Cardiovascular Center',
      description: 'Pioneering minimally invasive heart procedures and personalized rhythm management protocols.',
      icon: '❤️',
      color: 'from-red-500 to-red-600',
      link: '/specialty/cardiology',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'neurology',
      title: 'Neurology',
      description: 'Specialized treatments for complex brain and nervous system disorders.',
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      link: '/specialty/neurology',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'orthopedics',
      title: 'Orthopaedics',
      description: 'Expert care for skeletal, joint, and muscular health and recovery.',
      icon: '🦴',
      color: 'from-blue-500 to-blue-600',
      link: '/specialty/orthopedics',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'oncology',
      title: 'Oncology Institute',
      description: 'Next-generation immunotherapy and precision medicine for cancer care.',
      icon: '🎗️',
      color: 'from-pink-500 to-pink-600',
      link: '/specialty/oncology',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <section id="specialties" className="py-32 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <motion.div 
          className="mb-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6">Specialized Centers of Excellence</h2>
          <p className="text-on-surface-variant text-lg">Our multi-disciplinary teams focus on complex cases with a collaborative approach that ensures no detail is overlooked.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={specialty.link} className="block group">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={specialty.image} 
                      alt={specialty.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${specialty.color} opacity-70`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">{specialty.icon}</div>
                        <h3 className="text-2xl font-bold">{specialty.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant mb-4">{specialty.description}</p>
                    <span className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialtiesSection