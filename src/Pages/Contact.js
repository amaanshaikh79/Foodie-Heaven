import { useState } from "react"
import { submitContact } from "../utils/api.js"
import "../css/Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [formStatus, setFormStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setErrorMsg("")

    try {
      await submitContact(formData)

      // Show success message
      setFormStatus("success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus("")
      }, 5000)
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="contact-container">

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <p className="form-description">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {formStatus === "success" && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {errorMsg && (
              <div className="error-text" style={{ textAlign: "center", marginBottom: "15px", color: "#ff6b6b" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="partnership">Restaurant Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <p className="info-description">
              Reach out to us through any of these channels. We're here to help!
            </p>

            <div className="contact-info-cards">

              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Visit Us</h3>
                <p>
                  123 Food Street<br />
                  Maninagar, Ahmedabad<br />
                  Gujarat 380008, India
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Call Us</h3>
                <p>
                  Customer Support:<br />
                  <a href="tel:+919876543210">+91 98765 43210</a><br />
                  <span className="hours">Mon-Sun: 9 AM - 11 PM</span>
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email Us</h3>
                <p>
                  General Inquiries:<br />
                  <a href="mailto:support@epiceats.com">support@epiceats.com</a><br />
                  <a href="mailto:orders@epiceats.com">orders@epiceats.com</a>
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">💬</div>
                <h3>Live Chat</h3>
                <p>
                  Chat with our support team<br />
                  in real-time through our app<br />
                  <span className="hours">Available 24/7</span>
                </p>
              </div>

            </div>

            {/* Social Media */}
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📘</span>
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📷</span>
                  Instagram
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">🐦</span>
                  Twitter
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">💼</span>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <h2>Find Us Here</h2>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74842241855!2d72.41493253749423!3d23.020497778070515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1706712983847!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EPIC EATS Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-intro">Quick answers to common questions</p>

          <div className="faq-grid">

            <div className="faq-item">
              <h3>What are your delivery hours?</h3>
              <p>
                We deliver from 9 AM to 11 PM, seven days a week. Some restaurants
                may have different timings, which will be shown on their menu page.
              </p>
            </div>

            <div className="faq-item">
              <h3>What is the delivery fee?</h3>
              <p>
                Delivery fees vary based on distance and order value. Orders above
                ₹500 get free delivery within 5km. You'll see the exact fee at checkout.
              </p>
            </div>

            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>
                Once your order is confirmed, you'll receive a tracking link via SMS
                and email. You can also track it live through our app.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you accept cash on delivery?</h3>
              <p>
                Yes! We accept cash on delivery, along with UPI, credit/debit cards,
                and digital wallets for your convenience.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I cancel or modify my order?</h3>
              <p>
                You can cancel or modify your order within 2 minutes of placing it.
                After that, please contact our support team for assistance.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I become a restaurant partner?</h3>
              <p>
                We're always looking for great restaurant partners! Fill out the
                contact form above selecting "Restaurant Partnership" or email us directly.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact