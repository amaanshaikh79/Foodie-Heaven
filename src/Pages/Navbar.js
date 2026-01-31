import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Foodie Heaven
        </Link>

        {/* Hamburger Menu */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={menuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={closeMenu}>
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link" onClick={closeMenu}>
              🛒 Cart
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar