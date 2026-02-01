import { Routes, Route } from "react-router-dom"
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

const App = () => {
  return (
    <div>
      <Navbar />

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
      </Routes>

      <Footer />
    </div>
  )
}

export default App
