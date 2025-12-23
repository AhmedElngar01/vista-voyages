import React from 'react';
import { X, Star, MapPin, Calendar, ArrowRight } from 'lucide-react';

const TripDetailsModal = ({ trip, onClose, onBook }) => (
  <div className="modal-overlay" style={{zIndex: 2001}}>
    <div className="trip-modal-box">
      <X className="modal-close" onClick={onClose} />
      <div className="trip-modal-media"><img src={trip.image} alt={trip.title} className="trip-modal-image" /></div>
      <div className="trip-modal-content">
        <div className="trip-modal-header">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px'}}>
            <div className="rating-box" style={{display: 'inline-flex'}}><Star size={14} fill="currentColor" /> {trip.rating} (124 reviews)</div>
            <div style={{background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'}}>{trip.days}</div>
          </div>
          <h2 className="trip-modal-title">{trip.title}</h2>
          <div className="location" style={{fontSize: '1.1rem'}}><MapPin size={20} className="text-primary" style={{color: 'var(--primary)'}} /> {trip.location}</div>
          <div style={{marginTop: '10px', fontSize: '1rem', color: 'var(--dark)'}}><Calendar size={18} style={{display:'inline', marginRight:'5px'}} /> Date: <strong>{trip.startDate}</strong></div>
        </div>
        <div style={{marginBottom: '25px'}}><h3 style={{fontSize: '1.1rem', marginBottom: '10px', color: 'var(--dark)'}}>About this trip</h3><p style={{color: 'var(--gray)', lineHeight: '1.7'}}>{trip.description}</p></div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: 'auto'}}>
          <div><div className="price-label">Total Price</div><div className="trip-modal-price">{trip.price}</div><div style={{fontSize: '0.8rem', color: 'var(--gray)'}}>per person</div></div>
          <button className="btn-primary" style={{padding: '12px 30px', fontSize: '1.1rem'}} onClick={onBook}>Book Now <ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  </div>
);
export default TripDetailsModal;