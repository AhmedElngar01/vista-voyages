import React from 'react';
import { CheckCircle, Users, Calendar } from 'lucide-react';

const Features = () => (
  <section id="about" className="container">
    <div className="features">
      <div className="feature-item"><div className="feature-icon"><CheckCircle /></div><h3>Best Price Guarantee</h3><p>We offer the best prices for high-quality tours and premium service.</p></div>
      <div className="feature-item"><div className="feature-icon"><Users /></div><h3>Expert Local Guides</h3><p>Experience the culture deeply with our certified local experts.</p></div>
      <div className="feature-item"><div className="feature-icon"><Calendar /></div><h3>Easy Booking</h3><p>Book your dream vacation in just a few clicks with instant confirmation.</p></div>
    </div>
  </section>
);
export default Features;