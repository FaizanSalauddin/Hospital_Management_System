import { Link } from 'react-router-dom'

const FloatingActionButton = () => {
  return (
    <Link to="/appointment">
      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-primary to-primary-container text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group z-40">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          calendar_month
        </span>
        <span className="absolute right-full mr-4 bg-on-surface text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Schedule Now
        </span>
      </button>
    </Link>
  )
}

export default FloatingActionButton