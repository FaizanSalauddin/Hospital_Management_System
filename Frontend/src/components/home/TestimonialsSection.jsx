import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Cardiac Patient',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      text: 'The care I received at Clinical Curative was exceptional. The doctors took time to explain every procedure and made me feel completely at ease.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Neurology Patient',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      text: 'World-class facility with compassionate staff. My recovery was faster than expected thanks to their innovative treatment approach.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Orthopedic Patient',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      text: 'From the moment I walked in, I felt welcomed. The rehabilitation team went above and beyond to ensure my comfort and recovery.',
      rating: 5
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
            What Our Patients Say
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Real stories from patients who trusted us with their health
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-primary"
                />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg md:text-xl text-on-surface-variant mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <h4 className="text-xl font-bold text-on-surface mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-primary font-medium">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection