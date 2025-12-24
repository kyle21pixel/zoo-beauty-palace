import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

import DevSwitcher from './DevSwitcher';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <nav style={{
      backgroundColor: 'var(--surface)',
      padding: '16px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px var(--shadow-light)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ marginRight: '48px', display: 'flex', alignItems: 'center' }}>
          <Logo width="180px" />
        </Link>
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <Link to="/services" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s', letterSpacing: '0.01em' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>Services</Link>
          <Link to="/book" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s', letterSpacing: '0.01em' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>Book Now</Link>
          <Link to="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s', letterSpacing: '0.01em' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}>About</Link>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--background)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <DevSwitcher />
        <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '10px 24px', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s', borderRadius: 'var(--radius-md)', letterSpacing: '0.01em' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--background)'; e.target.style.color = 'var(--primary-color)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)'; }}>Login</Link>
        <Link to="/register" style={{ backgroundColor: 'var(--primary-color)', color: 'white', textDecoration: 'none', padding: '10px 24px', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '15px', transition: 'all 0.3s', boxShadow: '0 2px 8px var(--shadow-light)', letterSpacing: '0.01em' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#4A2369'; e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 12px var(--shadow-medium)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--primary-color)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 8px var(--shadow-light)'; }}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;