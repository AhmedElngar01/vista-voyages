import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const Hero = ({ searchDestination, setSearchDestination, tripLocations, handleSearch }) => (
  <header id="home" className="hero">
    <div className="container hero-content">
      <h1>Discover Your Next<br />Great Adventure</h1>
      <div className="search-box">
        <div className="search-item">
          <MapPin className="search-icon" size={20} />
          <div className="search-input-group">
            <label className="search-label">Destination</label>
            <select className="search-input" value={searchDestination} onChange={(e) => setSearchDestination(e.target.value)}>
              <option value="">Where are you going?</option>
              {tripLocations.map((location, index) => (<option key={index} value={location}>{location}</option>))}
            </select>
          </div>
        </div>
        <div className="search-item">
          <Calendar className="search-icon" size={20} />
          <div className="search-input-group">
            <label className="search-label">Date</label>
            <input type="date" className="search-input" />
          </div>
        </div>
        <button className="search-btn" onClick={handleSearch}><MapPin size={24} /></button>
      </div>
    </div>
  </header>
);
export default Hero;