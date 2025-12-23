import React from 'react';
import { X, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';

const BookingModal = ({ 
  trip, onClose, bookingSuccess, guests, setGuests, promoCode, setPromoCode, 
  appliedDiscount, applyCode, paymentMethod, setPaymentMethod, onSubmit,
  getNumericPrice, redirectDashboard
}) => {
  const baseTotal = getNumericPrice(trip.price) * guests;
  const discountAmount = appliedDiscount ? (baseTotal * (appliedDiscount.value / 100)) : 0;
  const finalTotal = baseTotal - discountAmount;

  return (
    <div className="modal-overlay" style={{zIndex: 2005}}>
      <div className="modal-box" style={{maxWidth: '500px'}}>
        <X className="modal-close" onClick={onClose} />
        {!bookingSuccess ? (
          <>
            <h2 className="modal-title">Complete Booking</h2>
            <div className="booking-summary">
              <h3 style={{marginBottom: '5px'}}>{trip.title}</h3>
              <div className="summary-row"><span>Base Price</span><span>{trip.price}</span></div>
              <div className="summary-row"><span>Trip Date</span><span style={{fontWeight:'700', color:'var(--primary)'}}>{trip.startDate}</span></div>
              <div className="summary-row" style={{alignItems: 'center'}}>
                <span>Number of Guests</span>
                <input type="number" min="1" value={guests} onChange={(e) => setGuests(parseInt(e.target.value) || 1)} style={{width: '60px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd'}} />
              </div>
              <div className="summary-row" style={{alignItems: 'center', marginTop: '10px', gap: '10px'}}>
                <input type="text" placeholder="Discount Code" className="form-input" style={{padding: '8px', fontSize: '0.9rem'}} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <button type="button" onClick={applyCode} className="btn-primary" style={{padding: '8px 15px', fontSize: '0.8rem', whiteSpace: 'nowrap'}}>Apply</button>
              </div>
              {appliedDiscount && (<div className="summary-row" style={{color: 'green', fontWeight: '600'}}><span>Discount ({appliedDiscount.code})</span><span>-{appliedDiscount.value}%</span></div>)}
              <div className="summary-total"><div style={{display: 'flex', justifyContent: 'space-between'}}><span>Total</span><span>${finalTotal.toLocaleString()}</span></div></div>
            </div>
            <h3 style={{fontSize: '1rem', marginBottom: '15px'}}>Payment Method</h3>
            <div className="payment-options">
              {['card', 'paypal', 'cash'].map(method => (
                <div key={method} className={`payment-card ${paymentMethod === method ? 'selected' : ''}`} onClick={() => setPaymentMethod(method)}>
                  {method === 'card' && <CreditCard className="payment-icon" size={24} />}
                  {method === 'paypal' && <Wallet className="payment-icon" size={24} />}
                  {method === 'cash' && <Banknote className="payment-icon" size={24} />}
                  <span className="payment-label">{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                </div>
              ))}
            </div>
            <form onSubmit={onSubmit}>
              {paymentMethod === 'card' && (
                <div className="form-group" style={{background: '#f8fafc', padding: '15px', borderRadius: '8px'}}>
                  <div className="form-group"><label className="form-label">Card Number</label><input type="text" placeholder="0000 0000 0000 0000" className="form-input" required /></div>
                  <div className="form-row">
                    <div className="form-group" style={{marginBottom: 0}}><label className="form-label">Expiry</label><input type="text" placeholder="MM/YY" className="form-input" required /></div>
                    <div className="form-group" style={{marginBottom: 0}}><label className="form-label">CVC</label><input type="text" placeholder="123" className="form-input" required /></div>
                  </div>
                </div>
              )}
              <button type="submit" className="btn-primary btn-full" style={{marginTop: '20px'}}>{paymentMethod === 'cash' ? 'Confirm Booking' : `Pay $${finalTotal.toLocaleString()}`}</button>
            </form>
          </>
        ) : (
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <div style={{width: '80px', height: '80px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}><CheckCircle size={48} /></div>
            <h2 style={{fontSize: '1.8rem', color: 'var(--dark)', marginBottom: '10px'}}>Booking Confirmed!</h2>
            <p style={{color: 'var(--gray)', marginBottom: '30px'}}>Your trip to <strong>{trip.title}</strong> for <strong>{trip.startDate}</strong> has been booked.</p>
            <button className="btn-primary btn-full" onClick={redirectDashboard}>Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookingModal;