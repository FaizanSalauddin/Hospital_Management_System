import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, end])

  return <span ref={ref}>{count}</span>
}

const StatsSection = () => {
  const stats = [
    { number: 150000, label: 'Patients Treated', icon: '👥' },
    { number: 500, label: 'Expert Doctors', icon: '👨‍⚕️' },
    { number: 50, label: 'Awards Won', icon: '🏆' },
    { number: 24, label: 'Emergency Care', icon: '🚑' }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-container text-white">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number >= 1000 ? (
                  <><Counter end={stat.number / 1000} />K+</>
                ) : (
                  <Counter end={stat.number} /> 
                )}
              </div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection