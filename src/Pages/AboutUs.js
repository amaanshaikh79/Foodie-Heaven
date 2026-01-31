import "../css/AboutUs.css"

const AboutUs = () => {
  return (
    <div className="about-page">
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Foodie Heaven</h1>
          <p className="about-subtitle">
            Bringing delicious food and happiness to your doorstep since 2020
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="story-container">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <p>
              Foodie Heaven was born from a simple idea: everyone deserves access to 
              delicious, quality food from the best restaurants, delivered right to 
              their door. What started as a small operation in Ahmedabad has grown 
              into a trusted food delivery service serving thousands of happy customers.
            </p>
            <p>
              We partner with the finest local restaurants and eateries to bring you 
              an incredible variety of cuisines. From traditional Gujarati thalis to 
              international flavors, we've got something for every craving.
            </p>
            <p>
              Our mission is simple: make great food accessible, affordable, and 
              convenient for everyone. Whether you're ordering a quick lunch, planning 
              a family dinner, or hosting a party, Foodie Heaven is here to serve you.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d" 
              alt="Restaurant kitchen"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-values">
        <div className="mission-container">
          <h2 className="section-title">Our Mission & Values</h2>
          
          <div className="values-grid">
            
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To connect food lovers with the best local restaurants and deliver 
                exceptional dining experiences to every doorstep.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed & Efficiency</h3>
              <p>
                We pride ourselves on lightning-fast delivery times without 
                compromising on food quality or presentation.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust & Reliability</h3>
              <p>
                Your satisfaction is our priority. We ensure every order meets 
                our high standards for quality and service.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Quality Partners</h3>
              <p>
                We carefully select restaurant partners who share our commitment 
                to excellence and customer satisfaction.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Sustainability</h3>
              <p>
                We're committed to eco-friendly practices, from packaging to 
                delivery methods, to protect our planet.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🎉</div>
              <h3>Community First</h3>
              <p>
                Supporting local businesses and creating jobs in our community 
                is at the heart of everything we do.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <h2 className="section-title">By The Numbers</h2>
          
          <div className="stats-grid">
            
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Restaurant Partners</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Orders Delivered</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="team-intro">
            Behind every successful delivery is a dedicated team working hard to 
            make your experience exceptional.
          </p>

          <div className="team-grid">
            
            <div className="team-card">
              <div className="team-image">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                  alt="Team member"
                />
              </div>
              <h3>Rajesh Sharma</h3>
              <p className="team-role">Founder & CEO</p>
              <p className="team-bio">
                Passionate about food and technology, Rajesh founded Foodie Heaven 
                to revolutionize food delivery.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
                  alt="Team member"
                />
              </div>
              <h3>Priya Patel</h3>
              <p className="team-role">Head of Operations</p>
              <p className="team-bio">
                Priya ensures every order runs smoothly, from kitchen to doorstep, 
                maintaining our quality standards.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
                  alt="Team member"
                />
              </div>
              <h3>Arjun Mehta</h3>
              <p className="team-role">Customer Success Lead</p>
              <p className="team-bio">
                Arjun and his team work tirelessly to ensure every customer has 
                an amazing experience with us.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956" 
                  alt="Team member"
                />
              </div>
              <h3>Sneha Desai</h3>
              <p className="team-role">Restaurant Relations</p>
              <p className="team-bio">
                Sneha builds and maintains relationships with our restaurant partners, 
                ensuring quality and variety.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="why-container">
          <h2 className="section-title">Why Choose Foodie Heaven?</h2>
          
          <div className="reasons-grid">
            
            <div className="reason-item">
              <div className="reason-number">01</div>
              <h3>Wide Variety</h3>
              <p>
                Access hundreds of restaurants and thousands of dishes from diverse 
                cuisines, all in one app.
              </p>
            </div>

            <div className="reason-item">
              <div className="reason-number">02</div>
              <h3>Lightning Fast</h3>
              <p>
                Our efficient delivery network ensures your food arrives hot and 
                fresh in record time.
              </p>
            </div>

            <div className="reason-item">
              <div className="reason-number">03</div>
              <h3>Best Prices</h3>
              <p>
                Competitive pricing, regular deals, and loyalty rewards make great 
                food affordable.
              </p>
            </div>

            <div className="reason-item">
              <div className="reason-number">04</div>
              <h3>Easy Tracking</h3>
              <p>
                Track your order in real-time from preparation to delivery with 
                our live tracking feature.
              </p>
            </div>

            <div className="reason-item">
              <div className="reason-number">05</div>
              <h3>Safe & Hygienic</h3>
              <p>
                We follow strict hygiene protocols and contactless delivery to 
                ensure your safety.
              </p>
            </div>

            <div className="reason-item">
              <div className="reason-number">06</div>
              <h3>24/7 Support</h3>
              <p>
                Our customer support team is always available to help with any 
                questions or concerns.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Order?</h2>
          <p>Join thousands of satisfied customers and experience the Foodie Heaven difference today!</p>
          <a href="/menu" className="cta-button">Browse Menu</a>
        </div>
      </section>

    </div>
  )
}

export default AboutUs