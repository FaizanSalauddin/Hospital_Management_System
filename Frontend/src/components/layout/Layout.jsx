import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActionButton from '../ui/FloatingActionButton'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingActionButton />
    </div>
  )
}

export default Layout