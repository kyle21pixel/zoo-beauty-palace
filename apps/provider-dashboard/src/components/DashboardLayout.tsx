'use client';

import { Button, Card } from '@zoo/ui';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'services', label: 'Services', icon: '✨' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'staff', label: 'Staff', icon: '👥' },
    { id: 'customers', label: 'Customers', icon: '👤' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'linear-gradient(180deg, #774EAF 0%, #5C3B8B 100%)',
        color: 'white',
        padding: '2rem 1rem',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.5rem',
          }}>
            🦓 Zoo Beauty
          </h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Provider Dashboard</p>
        </div>

        {/* Provider Info */}
        <Card
          variant="glass"
          padding="4"
          style={{
            marginBottom: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB347 0%, #FF4275 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            marginBottom: '0.75rem',
          }}>
            💇‍♀️
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Glamour Studio
          </h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            Premium Salon
          </p>
        </Card>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                marginBottom: '0.5rem',
                background: activeMenu === item.id
                  ? 'rgba(255,255,255,0.2)'
                  : 'transparent',
                border: 'none',
                color: 'white',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.9375rem',
                fontWeight: activeMenu === item.id ? 600 : 400,
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '2rem',
        minHeight: '100vh',
      }}>
        <div style={{ maxWidth: '1400px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
