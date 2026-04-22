import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Store from "./pages/Store";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PurchaseSuccess from './pages/PurchaseSuccess';
import IPDBedAllocation from "./pages/IPDBedAllocation";
import AdminIPDBedManagement from "./pages/AdminIPDBedManagement";
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const justOrdered = sessionStorage.getItem("justOrdered");
    if (!justOrdered) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      sessionStorage.removeItem("justOrdered");
    }
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i._id === item._id);
      if (existingItem) {
        return prevCart.map(i =>
          i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === itemId) {
        const newQuantity = (item.quantity || 1) + delta;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AnimatePresence mode="wait">
      {isAdmin ? (
        <Routes location={location} key={location.pathname}>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/opd-billing" element={<OPDBilling />} />
          <Route path="/admin/patient-enquiry" element={<PatientEnquiry />} />
          <Route path="/admin/ipd-bed-allocation" element={<AdminIPDBedManagement />} />
        </Routes>
      ) : (
        <Layout>
          <Routes location={location} key={location.pathname}>
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

            <Route path="/store" element={<Store addToCart={addToCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/purchase-success" element={<PurchaseSuccess />} />

            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/health-packages/:id" element={<HealthPackageDetails />} />
            <Route path="/ipd-bed-allocation" element={<IPDBedAllocation />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/specialty/cardiology" element={<SpecialtyCardiology />} />
            <Route path="/specialty/neurology" element={<SpecialtyNeurology />} />
            <Route path="/specialty/orthopedics" element={<SpecialtyOrthopedics />} />
            <Route path="/specialty/oncology" element={<SpecialtyOncology />} />
          </Routes>
        </Layout>
      )}
    </AnimatePresence>
  );
}

export default App;