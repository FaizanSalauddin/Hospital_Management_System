import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Facilities from './pages/Facilities'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Appointment from './pages/Appointment'
import SpecialtyCardiology from './pages/SpecialtyCardiology'
import SpecialtyNeurology from './pages/SpecialtyNeurology'
import SpecialtyOrthopedics from './pages/SpecialtyOrthopedics'
import SpecialtyOncology from './pages/SpecialtyOncology'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PatientEnquiry from "./pages/PatientEnquiry";
import OPDBilling from "./pages/OPDBilling";
import HealthPackageDetails from "./pages/HealthPackageDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/reception/patient-enquiry"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <PatientEnquiry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reception/opd-billing"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <OPDBilling />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/health-packages/:id" element={<HealthPackageDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/specialty/cardiology" element={<SpecialtyCardiology />} />
        <Route path="/specialty/neurology" element={<SpecialtyNeurology />} />
        <Route path="/specialty/orthopedics" element={<SpecialtyOrthopedics />} />
        <Route path="/specialty/oncology" element={<SpecialtyOncology />} />
      </Routes>
    </Layout>
  )
}

export default App