import React from 'react';
import { Globe, Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = ({ isMenuOpen, toggleMenu, scrolled, currentUser, setCurrentView, scrollToSection, handleLogout, setAuthModalOpen }) => (
  <nav className={`navbar ${scrolled || currentUser ? 'scrolled' : ''}`}>
    <div className="container nav-content">
      <div className="logo" onClick={() => scrollToSection('home')}>
        <Globe size={32} color={(scrolled || currentUser) ? '#059669' : '#fff'} />
        VistaVoyages
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</div>
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
        {currentUser?.role !== 'admin' && <button onClick={() => scrollToSection('destinations')} className="nav-link">Trips</button>}
        {currentUser && currentUser.role !== 'admin' && <button onClick={() => {setCurrentView('user-dashboard'); toggleMenu();}} className="nav-link">My Trips</button>}
        {currentUser?.role !== 'admin' && <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>}
        
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && <button onClick={() => setCurrentView('admin')} className="nav-link" style={{background:'none', border:'none', display:'flex', alignItems:'center', gap:'5px'}}><LayoutDashboard size={16} /> Dashboard</button>}
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <span style={{color: (scrolled || currentUser) ? 'var(--dark)' : 'white', fontWeight: '600'}}>Hi, {currentUser.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-primary" style={{backgroundColor: '#ef4444'}}><LogOut size={16} /> Logout</button>
            </div>
          </>
        ) : (
          <button onClick={() => setAuthModalOpen(true)} className="btn-primary"><User size={18} /> Login</button>
        )}
      </div>
    </div>
  </nav>
);
export default Navbar;