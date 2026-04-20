import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import SpecialtiesSection from '../components/home/SpecialtiesSection'
import DoctorsSection from '../components/home/DoctorsSection'
import AppointmentSection from '../components/home/AppointmentSection'
import BlogSection from '../components/home/BlogSection'
import StatsSection from '../components/home/StatsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <SpecialtiesSection />
      <DoctorsSection />
      <TestimonialsSection />
      <AppointmentSection />
      <BlogSection />
    </>
  )
}

export default Home