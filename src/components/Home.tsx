import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    orders: 0,
    consumers: 0
  });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { farmers: 2500, orders: 15000, consumers: 8500 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          farmers: Math.floor(targets.farmers * progress),
          orders: Math.floor(targets.orders * progress),
          consumers: Math.floor(targets.consumers * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === 'impact') {
          animateCounters();
        }
      });
    });

    const impactSection = document.getElementById('impact');
    if (impactSection) {
      observer.observe(impactSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Fair Prices, Trusted Food, Transparent Supply</h1>
          <p className="hero-tagline">
            Connecting farmers directly with consumers and businesses for a sustainable future
          </p>
          <div className="hero-buttons">
            <Link to="/login?role=farmer" className="btn btn-primary hero-btn">
              Join as Farmer 🌱
            </Link>
            <Link to="/login?role=consumer" className="btn btn-secondary hero-btn">
              Shop as Consumer 🛒
            </Link>
            <Link to="/login?role=business" className="btn btn-primary hero-btn">
              Bulk Orders for Business 📦
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="card fade-in">
            <h2 className="section-title">About KrishiSaarthi</h2>
            <p className="section-subtitle">
              We're revolutionizing agriculture by creating direct connections between farmers and buyers, 
              ensuring fair prices, quality assurance, and transparent supply chains through technology.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="grid grid-4">
            <div className="card fade-in text-center">
              <div className="quick-menu-icon">👨‍🌾</div>
              <h3>Farmer</h3>
              <p>Lists crops and sets prices</p>
            </div>
            <div className="card fade-in text-center">
              <div className="quick-menu-icon">🤝</div>
              <h3>Coordinator</h3>
              <p>Manages village logistics</p>
            </div>
            <div className="card fade-in text-center">
              <div className="quick-menu-icon">🚛</div>
              <h3>Delivery</h3>
              <p>Direct farm-to-door transport</p>
            </div>
            <div className="card fade-in text-center">
              <div className="quick-menu-icon">👥</div>
              <h3>Consumer</h3>
              <p>Receives fresh produce</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="grid grid-2">
            <div className="card fade-in">
              <h3>📅 Pre-booking System</h3>
              <p>Secure your harvest before it's grown. Farmers get guaranteed sales, buyers get assured supply.</p>
            </div>
            <div className="card fade-in">
              <h3>🔒 Blockchain Trust</h3>
              <p>Every transaction recorded on blockchain for complete transparency and trust.</p>
            </div>
            <div className="card fade-in">
              <h3>🛡️ Crop Insurance</h3>
              <p>Comprehensive insurance coverage for farmers against weather and market risks.</p>
            </div>
            <div className="card fade-in">
              <h3>📊 Full Transparency</h3>
              <p>Track your food from farm to table with complete supply chain visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section id="impact" className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="grid grid-3">
            <div className="card fade-in text-center">
              <div className="counter">{counters.farmers.toLocaleString()}+</div>
              <p>Farmers Onboarded</p>
            </div>
            <div className="card fade-in text-center">
              <div className="counter">{counters.orders.toLocaleString()}+</div>
              <p>Orders Completed</p>
            </div>
            <div className="card fade-in text-center">
              <div className="counter">{counters.consumers.toLocaleString()}+</div>
              <p>Consumers Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="grid grid-2">
            <div className="card fade-in">
              <p>"KrishiSaarthi helped me get 30% better prices for my crops. The pre-booking system is amazing!"</p>
              <strong>- Ramesh Kumar, Farmer from Punjab</strong>
            </div>
            <div className="card fade-in">
              <p>"Fresh vegetables directly from farmers at great prices. Love the transparency!"</p>
              <strong>- Priya Sharma, Consumer from Delhi</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section" style={{ background: 'var(--text-dark)', color: 'white' }}>
        <div className="container">
          <div className="grid grid-3">
            <div>
              <h3>Contact Info</h3>
              <p>📧 krishisaarthi11@gmail.com</p>
              <p>📱 +91 8849426682</p>
              <p>📍 Varanasi, India</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <p><Link to="/farmer-dashboard" style={{ color: 'white' }}>Farmer Portal</Link></p>
              <p><Link to="/consumer-dashboard" style={{ color: 'white' }}>Consumer Portal</Link></p>
              <p><Link to="/business-dashboard" style={{ color: 'white' }}>Business Portal</Link></p>
            </div>
            <div>
              <h3>Follow Us</h3>
              <p>🔗 Facebook</p>
              <p>🔗 Twitter</p>
              <p>🔗 LinkedIn</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;