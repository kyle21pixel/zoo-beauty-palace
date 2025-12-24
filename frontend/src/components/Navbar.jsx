import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#5A2D82',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginRight: '30px'
        }}>
          Zoo Beauty Palace
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
          <Link to="/book" style={{ color: 'white', textDecoration: 'none' }}>Book</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', border: '1px solid white', borderRadius: '5px' }}>Login</Link>
        <Link to="/register" style={{ backgroundColor: 'white', color: '#5A2D82', textDecoration: 'none', padding: '8px 16px', borderRadius: '5px' }}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;