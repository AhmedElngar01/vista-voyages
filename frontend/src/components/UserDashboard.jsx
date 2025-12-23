import React from 'react';
import { Plane, Clock, CheckCircle, MapPin, Calendar } from 'lucide-react';

const UserDashboard = ({ currentUser, bookings, scrollToSection }) => (
  <div className="container admin-dashboard">
    <div className="user-header-section">
      <div className="user-info"><h2>My Travel Dashboard</h2><p>Welcome back, {currentUser.name}</p></div>
      <div style={{textAlign: 'right'}}><p style={{fontSize: '0.9rem', color: 'var(--gray)'}}>Member Since</p><p style={{fontWeight: '700', color: 'var(--dark)'}}>Nov 2024</p></div>
    </div>
    <div className="user-stats-grid">
      <div className="stat-card"><div className="stat-icon"><Plane size={24} /></div><div className="stat-info"><h4>Total Trips</h4><p>{bookings.filter(b => b.user === currentUser.name).length}</p></div></div>
      <div className="stat-card"><div className="stat-icon"><Clock size={24} /></div><div className="stat-info"><h4>Upcoming</h4><p>{bookings.filter(b => b.user === currentUser.name && b.status !== 'Completed').length}</p></div></div>
      <div className="stat-card"><div className="stat-icon"><CheckCircle size={24} /></div><div className="stat-info"><h4>Completed</h4><p>0</p></div></div>
    </div>
    <div className="section-header" style={{textAlign: 'left', marginBottom: '20px'}}><h3 style={{fontSize: '1.5rem', color: 'var(--dark)'}}>Booking History</h3></div>
    <div className="dashboard-table-container">
      {bookings.filter(b => b.user === currentUser.name).length > 0 ? (
        <div className="history-list">
          {bookings.filter(b => b.user === currentUser.name).map(booking => (
            <div key={booking.id} className="history-card">
              <div className="history-icon"><MapPin size={24} /></div>
              <div className="history-details">
                <div className="history-title">{booking.trip}</div>
                <div className="history-meta"><span style={{display:'flex', alignItems:'center', gap:'5px'}}><Calendar size={14}/> {booking.date}</span><span className={`status-badge ${booking.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}`}>{booking.status}</span></div>
              </div>
              <div className="history-price">{booking.price || "Paid"}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{padding: '40px', textAlign: 'center', color: 'var(--gray)'}}><Plane size={48} style={{margin: '0 auto 10px', opacity: 0.2}} /><p>You haven't booked any trips yet.</p><button className="btn-primary" style={{marginTop: '15px', padding: '8px 20px'}} onClick={() => scrollToSection('destinations')}>Explore Trips</button></div>
      )}
    </div>
  </div>
);
export default UserDashboard;