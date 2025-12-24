import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI } from '../../services/api';
import { handleApiCall, formatCurrency } from '../../utils/apiUtils';
import BookingCard from '../../components/BookingCard.jsx';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const result = await handleApiCall(
        () => bookingAPI.getByUser(user?.id),
        setLoading,
        setError
      );
      setBookings(result.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
        Loading your dashboard...
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

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );

  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed'
  );

  const totalSpent = bookings
    .filter(booking => booking.paymentStatus === 'paid')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const favoriteProviders = [...new Set(bookings.map(booking => booking.provider))].length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '📅' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
    { id: 'history', label: 'History', icon: '🕒' }
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
            Client Portal
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Welcome back, {user?.firstName}</p>
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
        {/* Welcome Header */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-sm)',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Welcome Back, {user?.firstName}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Here's your beauty journey overview
          </p>
        </div>
        
        {/* Stats Cards */}
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
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>📅</div>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-xs)' }}>
              {upcomingBookings.length}
            </h3>
            <p style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Upcoming Bookings</p>
          </div>
          
          <div style={{ 
            background: 'var(--surface)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 8px var(--shadow-light)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>✅</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--text-primary)'
            }}>
              {completedBookings.length}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Completed Services</p>
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
              {formatCurrency(totalSpent)}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Total Spent</p>
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
              {favoriteProviders}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Favorite Providers</p>
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              color: 'var(--text-primary)',
              fontWeight: '700',
              letterSpacing: '-0.01em'
            }}>
              Upcoming Bookings
            </h2>
            <button style={{
              padding: '10px 24px',
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              fontSize: '0.9375rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 8px var(--shadow-light)'
            }}>
              + New Booking
            </button>
          </div>

          {upcomingBookings.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 'var(--spacing-3xl)',
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>📅</div>
              <h3 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: 'var(--spacing-sm)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem'
              }}>
                No upcoming bookings
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Book your next beauty service to see it here
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} userRole="client" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
