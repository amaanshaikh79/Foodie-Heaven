import { Routes, Route, useLocation } from "react-router-dom"
import "./App.css"

import Home from "./Pages/Home.js"
import Hero from "./Pages/Hero.js"
import Contact from "./Pages/Contact.js"
import AboutUs from "./Pages/AboutUs.js"
import Menu from "./Pages/Menu.js"
import Navbar from "./Pages/Navbar.js"
import Footer from "./Pages/Footer.js"
import Registration from "./Pages/Registration.js"
import Login from "./Pages/Login.js"
import Cart from "./Pages/Cart.js"
import Profile from "./Pages/Profile.js"
import OrderHistory from "./Pages/OrderHistory.js"
import OrderConfirmation from "./Pages/OrderConfirmation.js"
import AdminDashboard from "./Pages/Admin/AdminDashboard.js"
import AdminProducts from "./Pages/Admin/AdminProducts.js"
import AdminOrders from "./Pages/Admin/AdminOrders.js"

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* After Login */}
        <Route path="/hero" element={<Hero />} />

        {/* Other pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderConfirmation />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
