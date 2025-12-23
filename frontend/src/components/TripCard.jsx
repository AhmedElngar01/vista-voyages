import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const TripCard = ({ trip, onSelect }) => (
  <div className="card">
    <div className="image-wrapper"><img src={trip.image} alt={trip.title} className="card-image" /><div className="card-badge">{trip.days}</div></div>
    <div className="card-content">
      <div className="card-header"><h3 className="card-title">{trip.title}</h3><div className="rating-box"><Star size={14} fill="currentColor" /> {trip.rating}</div></div>
      <div className="location"><MapPin size={16} className="text-primary" style={{color: 'var(--primary)'}} /> {trip.location}</div>
      <div style={{fontSize: '0.85rem', color: 'var(--gray)', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}><Calendar size={14} /> {trip.startDate}</div>
      <div className="card-footer">
        <div className="price-container"><span className="price-label">From</span><div className="price-value">{trip.price}</div></div>
        <button className="btn-card" onClick={() => onSelect(trip)}>View Deal</button>
      </div>
    </div>
  </div>
);
export default TripCard;