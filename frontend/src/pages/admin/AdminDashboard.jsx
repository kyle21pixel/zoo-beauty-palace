import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, bookingAPI } from '../../services/api';
import { handleApiCall, formatCurrency } from '../../utils/apiUtils';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalEarnings: 0,
    activeProviders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersResult = await handleApiCall(
        () => userAPI.getAll(),
        setLoading,
        setError
      );
      
      const bookingsResult = await handleApiCall(
        () => bookingAPI.getAll(),
        setLoading,
        setError
      );
      
      const totalUsers = usersResult.data.users.length;
      const totalBookings = bookingsResult.data.bookings.length;
      const totalEarnings = bookingsResult.data.bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, booking) => sum + booking.totalAmount, 0);
      
      const activeProviders = usersResult.data.users.filter(u => 
        u.role === 'provider' && u.isActive
      ).length;
      
      setStats({
        totalUsers,
        totalBookings,
        totalEarnings,
        activeProviders
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: 'var(--text-primary)'
      }}>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'var(--status-cancelled)',
        fontSize: '18px'
      }}>
        Error: {error}
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        backgroundColor: 'var(--surface)', 
        padding: 'var(--spacing-xl) 0',
        borderRight: '1px solid var(--border-color)',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '0 var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary-color)', 
            fontSize: '1.5rem',
            marginBottom: 'var(--spacing-xs)',
            fontWeight: '700',
            letterSpacing: '-0.01em'
          }}>
            Admin Control
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>System Overview</p>
        </div>
        
        <nav>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                border: 'none',
                background: activeTab === item.id ? 'var(--background)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary-color)' : 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: activeTab === item.id ? '600' : '400',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                borderLeft: activeTab === item.id ? '3px solid var(--primary-color)' : '3px solid transparent'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ 
        marginLeft: '280px', 
        flex: 1, 
        padding: 'var(--spacing-3xl) var(--spacing-2xl)',
        maxWidth: '1400px'
      }}>
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-sm)',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Platform analytics and management
          </p>
        </div>
        
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-3xl)'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary-color) 0%, #7C3AED 100%)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            boxShadow: '0 4px 16px var(--shadow-light)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>👥</div>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-xs)' }}>
              {stats.totalUsers}
            </h3>
            <p style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Total Users</p>
          </div>
          
          <div style={{ 
            background: 'var(--surface)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 8px var(--shadow-light)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>📅</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--text-primary)'
            }}>
              {stats.totalBookings}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Total Bookings</p>
          </div>
          
          <div style={{ 
            background: 'var(--surface)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 8px var(--shadow-light)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>💰</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--text-primary)'
            }}>
              {formatCurrency(stats.totalEarnings)}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Total Revenue</p>
          </div>
          
          <div style={{ 
            background: 'var(--surface)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 8px var(--shadow-light)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>⭐</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--text-primary)'
            }}>
              {stats.activeProviders}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Active Providers</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ 
          background: 'var(--surface)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 2px 8px var(--shadow-light)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: '700',
            letterSpacing: '-0.01em'
          }}>
            Recent Activity
          </h2>
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-3xl)',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>📊</div>
            <p>Activity feed coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
