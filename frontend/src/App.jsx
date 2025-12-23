import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import Footer from './components/Footer';
import TripDetailsModal from './components/TripDetailsModal';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { 
  Menu, X, Phone, Mail, 
  Facebook, Instagram, Twitter, CheckCircle, Globe, 
  User, Lock, LogOut, LayoutDashboard, Trash2, Plus, ArrowRight,
  CreditCard, Wallet, Banknote, Clock, Plane, Edit, Search, Eye, Tag
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Auth State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [currentView, setCurrentView] = useState('home'); 

  // Data States
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsRes = await fetch('http://localhost:5000/api/trips');
        const tripsData = await tripsRes.json();
        setDestinations(tripsData);

        const bookingsRes = await fetch('http://localhost:5000/api/bookings');
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);

        const discountsRes = await fetch('http://localhost:5000/api/discounts');
        const discountsData = await discountsRes.json();
        setDiscountCodes(discountsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // UI States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingGuests, setBookingGuests] = useState(1);
  const [tripFormModalOpen, setTripFormModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [tripFormData, setTripFormData] = useState({ title: '', location: '', price: '', days: '', rating: 4.5, startDate: '', image: '', description: '' });
  const [viewTripBookers, setViewTripBookers] = useState(null);
  const [bookingSearchId, setBookingSearchId] = useState('');
  const [viewBookingModal, setViewBookingModal] = useState(null);
  const [searchDestination, setSearchDestination] = useState('');
  const [newDiscount, setNewDiscount] = useState({ code: '', value: '' });
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // ... other form states kept for UI compatibility ...
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');

  const tripLocations = [...new Set(destinations.map(dest => dest.location))];
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      else if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (authMode === 'signup' && password !== confirmPassword) { alert("Passwords do not match!"); return; }
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const payload = authMode === 'login' ? { email, password } : { firstName, lastName, email, password, gender, birthDate, phone: phoneNumber, city };
    try {
        const res = await fetch(`http://localhost:5000${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();
        if (res.ok) {
            setCurrentUser(data);
            if (data.role === 'admin') setCurrentView('admin');
            else setCurrentView('home');
            setAuthModalOpen(false);
            resetForm();
        } else { alert(data.message || "Authentication failed"); }
    } catch (err) { console.error(err); alert("Server error"); }
  };

  const handleLogout = () => { setCurrentUser(null); setCurrentView('home'); setIsMenuOpen(false); };
  const resetForm = () => { setEmail(''); setPassword(''); setConfirmPassword(''); setFirstName(''); setLastName(''); setGender(''); setBirthDate(''); setPhoneNumber(''); setCity(''); };
  const initiateBooking = () => { if (!currentUser) { alert("Please login to book."); setAuthModalOpen(true); return; } setBookingGuests(1); setBookingSuccess(false); setPromoCodeInput(''); setAppliedDiscount(null); setBookingModalOpen(true); };
  const getNumericPrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;

  const handleBookingSubmit = async (e) => {
      e.preventDefault();
      const baseTotal = getNumericPrice(selectedTrip.price) * bookingGuests;
      const discountAmount = appliedDiscount ? (baseTotal * (appliedDiscount.value / 100)) : 0;
      const finalTotal = baseTotal - discountAmount;

      const bookingData = { 
          user: currentUser.name || currentUser.email, // Fallback if name not set
          email: currentUser.email, 
          phone: phoneNumber || "N/A", // Using form state for simplicity
          trip: selectedTrip.title, 
          date: selectedTrip.startDate, 
          guests: bookingGuests, 
          payment: paymentMethod === 'card' ? 'Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash', 
          price: "$" + finalTotal.toLocaleString(),
          status: "Confirmed"
      };

      try {
          const res = await fetch('http://localhost:5000/api/bookings', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(bookingData) });
          const data = await res.json();
          setBookings([data, ...bookings]); 
          setBookingSuccess(true);
      } catch (err) { console.error("Error adding booking: ", err); }
  };

  const handleSearch = () => { if (searchDestination === '') { setFilteredDestinations(destinations); } else { const results = destinations.filter(dest => dest.location === searchDestination); setFilteredDestinations(results); } scrollToSection('destinations'); };

  const handleSaveTrip = async (e) => {
    e.preventDefault();
    const tripData = { ...tripFormData, price: tripFormData.price.startsWith('$') ? tripFormData.price : `$${tripFormData.price}` };
    
    try {
        let res;
        if (editingTrip) {
            res = await fetch(`http://localhost:5000/api/trips/${editingTrip.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tripData) });
        } else {
            res = await fetch('http://localhost:5000/api/trips', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tripData) });
        }
        
        if (res.ok) {
            const updatedTrip = await res.json();
             if (editingTrip) {
                setDestinations(destinations.map(d => d.id === editingTrip.id ? updatedTrip : d));
            } else {
                setDestinations([...destinations, updatedTrip]);
            }
            setTripFormModalOpen(false);
        }
    } catch (err) { console.error("Error saving trip: ", err); }
  };

  const deleteTrip = async (id) => { 
      if (confirm("Are you sure?")) { 
          try {
              await fetch(`http://localhost:5000/api/trips/${id}`, { method: 'DELETE' });
              setDestinations(destinations.filter(d => d.id !== id));
          } catch(err) { console.error("Error deleting trip: ", err); }
      } 
  };

  const addDiscountCode = async () => { 
      if (newDiscount.code && newDiscount.value) { 
          try {
            const discountData = { code: newDiscount.code.toUpperCase(), value: parseFloat(newDiscount.value) };
            const res = await fetch('http://localhost:5000/api/discounts', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(discountData) });
            const data = await res.json();
            setDiscountCodes([...discountCodes, data]); 
            setNewDiscount({ code: '', value: '' }); 
          } catch(err) { console.error("Error adding discount: ", err); }
      } 
  };

  const deleteDiscountCode = async (id) => { 
      if(confirm("Delete?")) { 
          try {
            await fetch(`http://localhost:5000/api/discounts/${id}`, { method: 'DELETE' });
            setDiscountCodes(discountCodes.filter(d => d.id !== id)); 
          } catch(err) { console.error("Error deleting discount: ", err); }
      } 
  }

  const applyPromoCode = () => { const code = discountCodes.find(dc => dc.code === promoCodeInput.toUpperCase()); if (code) setAppliedDiscount(code); else { alert("Invalid discount code"); setAppliedDiscount(null); } };

  const openAddTripModal = () => { setEditingTrip(null); setTripFormData({ title: '', location: '', price: '', days: '', rating: 4.5, startDate: '', image: '', description: '' }); setTripFormModalOpen(true); };
  const openEditTripModal = (trip) => { setEditingTrip(trip); setTripFormData(trip); setTripFormModalOpen(true); };
  const getFilteredBookings = () => { if (!bookingSearchId) return bookings; return bookings.filter(b => b.id.toString().includes(bookingSearchId)); };

  const egyptCities = [
    "6th of October City", "Abu Kabir", "Akhmim", "Al-Hamidiyya", "Al-Mansura", 
    "Alexandria", "Arish", "Aswan", "Asyut", "Banha", "Beni Suef", "Bilbays", 
    "Cairo", "Damanhur", "Damietta", "Desouk", "El-Mahalla El-Kubra", "Fayyum", 
    "Girga", "Giza", "Hurghada", "Idfu", "Ismailia", "Kafr el-Dawwar", 
    "Kafr el-Sheikh", "Luxor", "Mallawi", "Marsa Matruh", "Matareya", "Minya", 
    "Mit Ghamr", "Port Said", "Qalyub", "Qena", "Shibin El Kom", 
    "Shubra El-Kheima", "Sohag", "Suez", "Tanta", "Zagazig"
  ];

  return (
    <div className="app-container">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} scrolled={scrolled} currentUser={currentUser} setCurrentView={setCurrentView} scrollToSection={scrollToSection} handleLogout={handleLogout} setAuthModalOpen={setAuthModalOpen} />
      {currentView === 'admin' && currentUser?.role === 'admin' ? (
        <AdminDashboard currentUser={currentUser} bookings={bookings} destinations={destinations} bookingSearchId={bookingSearchId} setBookingSearchId={setBookingSearchId} getFilteredBookings={getFilteredBookings} setViewBookingModal={setViewBookingModal} openAddTripModal={openAddTripModal} openEditTripModal={openEditTripModal} deleteTrip={deleteTrip} setViewTripBookers={setViewTripBookers} discountCodes={discountCodes} newDiscount={newDiscount} setNewDiscount={setNewDiscount} addDiscountCode={addDiscountCode} deleteDiscountCode={deleteDiscountCode} />
      ) : currentView === 'user-dashboard' && currentUser ? (
        <UserDashboard currentUser={currentUser} bookings={bookings} scrollToSection={scrollToSection} />
      ) : (
        <>
          <Hero searchDestination={searchDestination} setSearchDestination={setSearchDestination} tripLocations={tripLocations} handleSearch={handleSearch} />
          <Features />
          <Destinations filteredDestinations={filteredDestinations} setSelectedTrip={setSelectedTrip} />
        </>
      )}
      {selectedTrip && !bookingModalOpen && <TripDetailsModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} onBook={initiateBooking} />}
      {bookingModalOpen && selectedTrip && ( <BookingModal trip={selectedTrip} onClose={() => setBookingModalOpen(false)} bookingSuccess={bookingSuccess} guests={bookingGuests} setGuests={setBookingGuests} promoCode={promoCodeInput} setPromoCode={setPromoCodeInput} appliedDiscount={appliedDiscount} applyCode={applyPromoCode} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onSubmit={handleBookingSubmit} getNumericPrice={getNumericPrice} redirectDashboard={() => {setBookingModalOpen(false); setSelectedTrip(null); setCurrentView('user-dashboard');}} /> )}
      {tripFormModalOpen && (
        <div className="modal-overlay" style={{zIndex: 2010}}>
          <div className="modal-box" style={{maxWidth: '600px'}}>
            <X className="modal-close" onClick={() => setTripFormModalOpen(false)} />
            <h2 className="modal-title">{editingTrip ? 'Edit Trip' : 'Add New Trip'}</h2>
            <form onSubmit={handleSaveTrip}>
              <div className="form-group"><label className="form-label">Trip Title</label><input type="text" className="form-input" value={tripFormData.title} onChange={(e) => setTripFormData({...tripFormData, title: e.target.value})} required /></div>
              <div className="form-row"><div className="form-group"><label className="form-label">Location</label><input type="text" className="form-input" value={tripFormData.location} onChange={(e) => setTripFormData({...tripFormData, location: e.target.value})} required /></div><div className="form-group"><label className="form-label">Price</label><input type="text" className="form-input" placeholder="$1,000" value={tripFormData.price} onChange={(e) => setTripFormData({...tripFormData, price: e.target.value})} required /></div></div>
              <div className="form-row"><div className="form-group"><label className="form-label">Duration</label><input type="text" className="form-input" placeholder="5 Days" value={tripFormData.days} onChange={(e) => setTripFormData({...tripFormData, days: e.target.value})} required /></div><div className="form-group"><label className="form-label">Start Date</label><input type="date" className="form-input" value={tripFormData.startDate} onChange={(e) => setTripFormData({...tripFormData, startDate: e.target.value})} required /></div></div>
              <div className="form-group"><label className="form-label">Image URL</label><input type="url" className="form-input" placeholder="https://..." value={tripFormData.image} onChange={(e) => setTripFormData({...tripFormData, image: e.target.value})} required /></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={tripFormData.description} onChange={(e) => setTripFormData({...tripFormData, description: e.target.value})} required /></div>
              <button type="submit" className="btn-primary btn-full">{editingTrip ? 'Save Changes' : 'Create Trip'}</button>
            </form>
          </div>
        </div>
      )}
      {viewTripBookers && (
        <div className="modal-overlay" style={{zIndex: 2010}}>
          <div className="modal-box" style={{maxWidth: '600px'}}>
            <X className="modal-close" onClick={() => setViewTripBookers(null)} />
            <h2 className="modal-title" style={{fontSize: '1.5rem'}}>Passengers for {viewTripBookers.title}</h2>
            <div className="admin-table-container" style={{boxShadow: 'none', border: '1px solid #eee'}}>
              <table className="admin-table">
                <thead><tr><th>Booking ID</th><th>Name</th><th>Email</th><th>Guests</th></tr></thead>
                <tbody>{bookings.filter(b => b.trip === viewTripBookers.title).length > 0 ? (bookings.filter(b => b.trip === viewTripBookers.title).map(booking => (<tr key={booking.id}><td>#{booking.id}</td><td>{booking.user}</td><td>{booking.email}</td><td>{booking.guests}</td></tr>))) : (<tr><td colSpan="4" style={{textAlign: 'center', color: 'var(--gray)'}}>No bookings yet for this trip.</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {viewBookingModal && (
        <div className="modal-overlay" style={{zIndex: 2010}}>
          <div className="modal-box"><X className="modal-close" onClick={() => setViewBookingModal(null)} /><h2 className="modal-title">Booking #{viewBookingModal.id}</h2><div className="booking-summary"><div className="summary-row"><strong>Trip:</strong> <span>{viewBookingModal.trip}</span></div><div className="summary-row"><strong>Customer:</strong> <span>{viewBookingModal.user}</span></div><div className="summary-row"><strong>Email:</strong> <span>{viewBookingModal.email}</span></div><div className="summary-row"><strong>Phone:</strong> <span>{viewBookingModal.phone}</span></div><div className="summary-row"><strong>Date:</strong> <span>{viewBookingModal.date}</span></div><div className="summary-row"><strong>Guests:</strong> <span>{viewBookingModal.guests}</span></div><div className="summary-row"><strong>Payment:</strong> <span>{viewBookingModal.payment}</span></div><div className="summary-total"><div style={{display:'flex', justifyContent:'space-between'}}><span>Total Paid</span><span>{viewBookingModal.price}</span></div></div><div style={{marginTop:'20px', textAlign:'center'}}><span className={`status-badge ${viewBookingModal.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}`} style={{fontSize:'1rem', padding:'8px 20px'}}>{viewBookingModal.status}</span></div></div></div>
        </div>
      )}
      {authModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <X className="modal-close" onClick={() => setAuthModalOpen(false)} />
            <h2 className="modal-title">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleLogin}>
              {authMode === 'signup' && (<><div className="form-row"><div className="form-group"><label className="form-label">First Name</label><input type="text" className="form-input" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></div><div className="form-group"><label className="form-label">Last Name</label><input type="text" className="form-input" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required /></div></div><div className="form-row"><div className="form-group"><label className="form-label">Date of Birth</label><input type="date" className="form-input" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required /></div><div className="form-group"><label className="form-label">Gender</label><select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select></div></div><div className="form-row"><div className="form-group"><label className="form-label">Phone Number</label><input type="tel" className="form-input" placeholder="01xxxxxxxxx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /></div><div className="form-group"><label className="form-label">City</label><select className="form-select" value={city} onChange={(e) => setCity(e.target.value)} required><option value="">Select a city</option>{"6th of October City,Abu Kabir,Akhmim,Al-Hamidiyya,Al-Mansura,Alexandria,Arish,Aswan,Asyut,Banha,Beni Suef,Bilbays,Cairo,Damanhur,Damietta,Desouk,El-Mahalla El-Kubra,Fayyum,Girga,Giza,Hurghada,Idfu,Ismailia,Kafr el-Dawwar,Kafr el-Sheikh,Luxor,Mallawi,Marsa Matruh,Matareya,Minya,Mit Ghamr,Port Said,Qalyub,Qena,Shibin El Kom,Shubra El-Kheima,Sohag,Suez,Tanta,Zagazig".split(',').map(city => (<option key={city} value={city}>{city}</option>))}</select></div></div></>)}
              <div className="form-group"><label className="form-label">Email Address</label><input type="email" className="form-input" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><div className="form-group"><label className="form-label">Password</label><input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>{authMode === 'signup' && (<div className="form-group"><label className="form-label">Confirm Password</label><input type="password" className="form-input" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>)}
              <button type="submit" className="btn-primary btn-full">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>
            <div className="auth-switch">{authMode === 'login' ? "Don't have an account? " : "Already have an account? "}<span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Sign Up' : 'Login'}</span></div>
            <div style={{marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', background: '#f8fafc', padding: '10px', borderRadius: '8px'}}><strong>Demo Credentials:</strong><br/>Admin: admin@vista.com<br/>User: Any other email</div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default App;