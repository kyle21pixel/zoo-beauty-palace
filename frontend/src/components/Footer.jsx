import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const SocialIcon = ({ path, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: 'var(--background)',
      color: 'var(--primary-color)',
      transition: 'all 0.3s ease',
      border: '1px solid var(--border-color)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--primary-color)';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--background)';
      e.currentTarget.style.color = 'var(--primary-color)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {path}
    </svg>
  </a>
);

const FooterLink = ({ to, children }) => (
  <li style={{ marginBottom: '12px' }}>
    <Link 
      to={to}
      style={{ 
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        e.target.style.color = 'var(--primary-color)';
        e.target.style.paddingLeft = '4px';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = 'var(--text-secondary)';
        e.target.style.paddingLeft = '0';
      }}
    >
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative top gradient line */}
      <div style={{
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
        width: '100%'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'var(--spacing-4xl) var(--spacing-xl)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-3xl)'
      }}>
        {/* Brand Section */}
        <div style={{ maxWidth: '320px' }}>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <Logo width="160px" />
          </div>
          <p style={{ 
            color: 'var(--text-secondary)', 
            lineHeight: '1.7',
            marginBottom: 'var(--spacing-xl)',
            fontSize: '0.95rem'
          }}>
            Experience the royal treatment with Zoo Beauty Palace. Luxury beauty services delivered directly to your doorstep or at our premium partner locations.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <SocialIcon 
              href="#" 
              path={<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />} 
            />
            <SocialIcon 
              href="#" 
              path={<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />} 
            />
            <SocialIcon 
              href="#" 
              path={<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />} 
            />
            <SocialIcon 
              href="#" 
              path={<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>} 
            />
          </div>
        </div>

        {/* Discover */}
        <div>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em'
          }}>DISCOVER</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/services">Our Services</FooterLink>
            <FooterLink to="/book">Book Appointment</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/providers">For Providers</FooterLink>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em'
          }}>SUPPORT</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/cancellation">Cancellation Policy</FooterLink>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em'
          }}>STAY GLOWING</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)', fontSize: '0.95rem' }}>
            Subscribe to our newsletter for exclusive offers and beauty tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Your email address"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.95rem',
                width: '100%'
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '12px 20px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-color)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--background)',
        padding: 'var(--spacing-lg) var(--spacing-xl)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <p>© {new Date().getFullYear()} Zoo Beauty Palace. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Made with 💜 for Beauty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
