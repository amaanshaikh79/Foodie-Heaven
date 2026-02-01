import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../css/Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // 🔥 VERY IMPORTANT EFFECT
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    setIsLoggedIn(!!user)
  }, [location]) // 👈 route change triggers this

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser")
    console.clear()
    setIsLoggedIn(false)
    closeMenu()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="nav-logo" onClick={closeMenu}>
          EPIC EATS
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={menuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={closeMenu}>Menu</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          </li>

          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link" onClick={closeMenu}>
              🛒 Cart
            </Link>
          </li>

          {/* 🔥 AUTH BUTTON */}
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link signup-btn"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button
                className="nav-link logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
