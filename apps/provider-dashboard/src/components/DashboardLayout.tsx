'use client';

import { Button, Card } from '@zoo/ui';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Users,
  UserCircle,
  Star,
  DollarSign,
  CalendarDays,
  BarChart3,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function DashboardLayout({ children, activeTab = 'overview', onTabChange }: DashboardLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState(activeTab);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('providerDarkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    setActiveMenu(activeTab);
  }, [activeTab]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('providerDarkMode', String(newDarkMode));
  };

  const handleMenuClick = (itemId: string) => {
    setActiveMenu(itemId);
    if (onTabChange) {
      onTabChange(itemId);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'customers', label: 'Customers', icon: UserCircle },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: darkMode ? '#0A0A0A' : '#FAFAFA',
      transition: 'background 0.3s ease',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: darkMode 
          ? 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)'
          : 'linear-gradient(180deg, #774EAF 0%, #5C3B8B 100%)',
        color: 'white',
        padding: '2rem 1rem',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        borderRight: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}>
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Image
              src="/logo.png"
              alt="Zoo Beauty"
              width={45}
              height={45}
              style={{
                borderRadius: '50%',
                border: '2px solid #FF4275',
              }}
            />
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.25rem',
              }}>
                Zoo Beauty
              </h1>
              <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>Provider Hub</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Provider Info */}
        <Card
          variant="glass"
          padding={4}
          style={{
            marginBottom: '1.5rem',
            background: darkMode 
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none',
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
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  marginBottom: '0.5rem',
                  background: activeMenu === item.id
                    ? darkMode 
                      ? 'rgba(255, 66, 117, 0.2)'
                      : 'rgba(255,255,255,0.2)'
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
                    e.currentTarget.style.background = darkMode 
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <IconComponent size={20} style={{ strokeWidth: 2 }} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '2rem',
        minHeight: '100vh',
        background: darkMode ? '#0A0A0A' : '#FAFAFA',
      }}>
        <div style={{ maxWidth: '1400px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
