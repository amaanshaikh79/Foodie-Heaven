import { Link } from "react-router-dom"
import "../css/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer"> 
      <div className="footer-container">
        
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-brand">EPIC EATS</h3>
          <p className="footer-description">
            Delivering delicious food from the best restaurants straight to your doorstep.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact">
            <li>📧 support@epiceats.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Ahmedabad, Gujarat, India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} EPIC EATS. All rights reserved.</p>
        <p className="made-with">Made with ❤️ for food lovers</p>
      </div>
    </footer>
  )
}

export default Footer