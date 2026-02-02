import { Link } from "react-router-dom"
import "../css/Home.css"


const Home = () => {
  return (
    <div className="home">

      {/* Hero Section */}
      <div className="hero">

        <div className="hero-text">
          <h1 className="brand">EPIC EATS</h1>

          <h2>
            Delicious Food <br /> Delivered To Your Door
          </h2>

          <p>
            Order your favourite meals from top restaurants near you.
            Fast delivery, fresh food and best prices only on EPIC EATS.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="order-btn">Order Now</Link>
            <Link to="/about" className="learn-btn">Learn More</Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Delicious food platter"
          />
        </div>

      </div>

      {/* Features */}
      <div className="features">

        <h3>Why Choose EPIC EATS?</h3>

        <div className="feature-cards">

          <div className="card">
            <h4>⚡ Fast Delivery</h4>
            <p>Get your food delivered within minutes, hot and fresh to your doorstep.</p>
          </div>

          <div className="card">
            <h4>🍽️ Best Restaurants</h4>
            <p>We partner with top rated restaurants to bring you quality meals.</p>
          </div>

          <div className="card">
            <h4>💳 Easy Payments</h4>
            <p>UPI, Cards and Cash on Delivery - pay the way you prefer.</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home