import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <a href="#" className="footer-logo">VistaVoyages</a><p className="footer-text">Crafting unforgettable travel experiences since 2010. We make the world accessible to everyone.</p>
          <div className="social-links"><div className="social-icon"><Facebook size={20} /></div><div className="social-icon"><Instagram size={20} /></div><div className="social-icon"><Twitter size={20} /></div></div>
        </div>
        <div className="footer-col"><h4 className="footer-title">Company</h4><ul className="footer-links"><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Blog</a></li><li><a href="#">Press</a></li></ul></div>
        <div className="footer-col"><h4 className="footer-title">Support</h4><ul className="footer-links"><li><a href="#">Contact Us</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">FAQ</a></li></ul></div>
        <div className="footer-col">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-links">
            <li style={{display: 'flex', gap: '10px', alignItems: 'center'}}><Phone size={16} /> +1 (555) 123-4567</li>
            <li style={{display: 'flex', gap: '10px', alignItems: 'center'}}><Mail size={16} /> hello@vistavoyages.com</li>
            <li style={{display: 'flex', gap: '10px', alignItems: 'center'}}><MapPin size={16} /> 123 Travel Lane, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom"><p>&copy; 2025 VistaVoyages. All rights reserved.</p></div>
    </div>
  </footer>
);
export default Footer;