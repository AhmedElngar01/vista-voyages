import React from 'react';
import { Plus, Users, Calendar, MapPin, CheckCircle, Search, Eye, Trash2, Edit } from 'lucide-react';

const AdminDashboard = ({ 
  currentUser, bookings, destinations, bookingSearchId, setBookingSearchId, getFilteredBookings, setViewBookingModal,
  openAddTripModal, openEditTripModal, deleteTrip, setViewTripBookers, discountCodes, newDiscount, setNewDiscount, addDiscountCode, deleteDiscountCode 
}) => (
  <div className="container admin-dashboard">
    <div className="dashboard-header">
      <div><h2 className="section-title" style={{fontSize: '2rem', marginBottom: '5px'}}>Admin Dashboard</h2><p style={{color: 'var(--gray)'}}>Welcome back, {currentUser.name}</p></div>
      <button className="btn-primary" onClick={openAddTripModal}><Plus size={18} /> Add New Trip</button>
    </div>
    <div className="dashboard-stats">
      <div className="stat-card"><div className="stat-icon"><Users size={24} /></div><div className="stat-info"><h4>Total Users</h4><p>1,234</p></div></div>
      <div className="stat-card"><div className="stat-icon"><Calendar size={24} /></div><div className="stat-info"><h4>Active Bookings</h4><p>{bookings.length}</p></div></div>
      <div className="stat-card"><div className="stat-icon"><MapPin size={24} /></div><div className="stat-info"><h4>Total Trips</h4><p>{destinations.length}</p></div></div>
      <div className="stat-card"><div className="stat-icon"><CheckCircle size={24} /></div><div className="stat-info"><h4>Revenue</h4><p>$124k</p></div></div>
    </div>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
      <h3 style={{fontSize: '1.5rem', color: 'var(--dark)'}}>Bookings</h3>
      <div style={{position:'relative', width:'300px'}}>
        <Search size={18} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--gray)'}} />
        <input type="text" className="form-input" placeholder="Search by Booking ID" style={{paddingLeft:'38px'}} value={bookingSearchId} onChange={(e) => setBookingSearchId(e.target.value)} />
      </div>
    </div>
    <div className="admin-table-container">
      <table className="admin-table">
        <thead><tr><th>ID</th><th>User</th><th>Trip</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {getFilteredBookings().map(booking => (
            <tr key={booking.id}>
              <td>#{booking.id}</td><td>{booking.user}</td><td>{booking.trip}</td><td>{booking.date}</td>
              <td><span className={`status-badge ${booking.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}`}>{booking.status}</span></td>
              <td><button className="action-btn" onClick={() => setViewBookingModal(booking)}><Eye size={18} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="section-header" style={{textAlign: 'left', marginBottom: '20px', marginTop: '40px'}}><h3 style={{fontSize: '1.5rem', color: 'var(--dark)'}}>Manage Discount Codes</h3></div>
    <div className="admin-table-container">
      <div style={{padding: '20px', borderBottom: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center'}}>
        <input type="text" placeholder="Code (e.g. SAVE10)" value={newDiscount.code} onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})} className="form-input" style={{width: '200px'}} />
        <input type="number" placeholder="Discount %" value={newDiscount.value} onChange={(e) => setNewDiscount({...newDiscount, value: e.target.value})} className="form-input" style={{width: '120px'}} />
        <button onClick={addDiscountCode} className="btn-primary">Add Code</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Code</th><th>Discount Value</th><th>Action</th></tr></thead>
        <tbody>
          {discountCodes.map(dc => (
            <tr key={dc.id}>
              <td><span style={{background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold'}}>{dc.code}</span></td>
              <td>{dc.value}%</td>
              <td><button className="action-btn delete" onClick={() => deleteDiscountCode(dc.id)}><Trash2 size={18}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="section-header" style={{textAlign: 'left', marginBottom: '20px', marginTop: '40px'}}><h3 style={{fontSize: '1.5rem', color: 'var(--dark)'}}>Manage Trips</h3></div>
    <div className="admin-table-container">
      <table className="admin-table">
        <thead><tr><th>Image</th><th>Trip Name</th><th>Date</th><th>Price</th><th>Booked</th><th>Actions</th></tr></thead>
        <tbody>
          {destinations.map(dest => {
            const bookedCount = bookings.filter(b => b.trip === dest.title).length;
            return (
              <tr key={dest.id}>
                <td><img src={dest.image} alt="" style={{width: '50px', height: '40px', borderRadius: '6px', objectFit: 'cover'}} /></td>
                <td>{dest.title}</td><td>{dest.startDate}</td><td>{dest.price}</td>
                <td>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span style={{fontWeight: 'bold'}}>{bookedCount}</span>
                    <button className="action-btn" onClick={() => setViewTripBookers(dest)} title="View Passengers"><Users size={16}/></button>
                  </div>
                </td>
                <td>
                  <button className="action-btn" style={{marginRight:'10px'}} onClick={() => openEditTripModal(dest)}><Edit size={18} /></button>
                  <button className="action-btn delete" onClick={() => deleteTrip(dest.id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
export default AdminDashboard;