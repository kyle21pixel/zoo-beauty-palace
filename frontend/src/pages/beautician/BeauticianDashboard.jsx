import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { bookingAPI, beauticianAPI } from '../../services/api';
import { handleApiCall, formatCurrency } from '../../utils/apiUtils';
import BookingCard from '../../components/BookingCard.jsx';
import { SkeletonStat, SkeletonList } from '../../components/Skeleton';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import Logo from '../../components/Logo';

const BeauticianDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [beauticianData, setBeauticianData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchBeauticianData();
  }, []);

  const fetchBeauticianData = async () => {
    try {
      const result = await handleApiCall(
        () => beauticianAPI.getById(user?.id),
        setLoading,
        setError
      );
      setBeauticianData(result.data.beautician);
      
      const bookingsResult = await handleApiCall(
        () => bookingAPI.getByUser(user?.id),
        setLoading,
        setError
      );
      setBookings(bookingsResult.data.bookings);
    } catch (error) {
      console.error('Error fetching beautician data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const result = await handleApiCall(
        () => bookingAPI.updateStatus(bookingId, newStatus),
        setLoading,
        setError
      );
      
      if (result.success) {
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        toast.success(`Booking marked as ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update status');
    }
  };

  if (error) {
    return (
      <div style={{ padding: 'var(--spacing-3xl)' }}>
        <ErrorState 
          title="Dashboard Error" 
          description={error} 
          onRetry={fetchBeauticianData} 
        />
      </div>
    );
  }

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  );

  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed'
  );

  const todayBookings = bookings.filter(booking => {
    const today = new Date();
    const bookingDate = new Date(booking.scheduledDate);
    return bookingDate.toDateString() === today.toDateString();
  });

  const totalEarnings = bookings
    .filter(booking => booking.paymentStatus === 'paid')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'availability', label: 'Availability', icon: '⏰' },
    { id: 'earnings', label: 'Earnings', icon: '💰' }
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
        overflowY: 'auto',
        zIndex: 10
      }}>
        <div style={{ padding: '0 var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ marginBottom: 'var(--spacing-lg)', padding: '0 var(--spacing-xs)' }}>
            <Logo width="100%" />
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)', 
            fontSize: '1.1rem',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: '600',
            letterSpacing: '-0.01em',
            opacity: 0.7
          }}>
            Beautician Studio
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            background: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <Avatar name={user?.firstName} size="md" status="online" />
            <div>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9375rem' }}>{user?.firstName}</p>
              <Badge variant="primary" size="sm">Beautician</Badge>
            </div>
          </div>
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
            Hello, {user?.firstName}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Ready to create beauty today
          </p>
        </div>
        
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-3xl)'
        }}>
          {loading ? (
            <>
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </>
          ) : (
            <>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--primary-color) 0%, #7C3AED 100%)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                color: 'white',
                boxShadow: '0 4px 16px var(--shadow-light)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>📅</div>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-xs)' }}>
                  {todayBookings.length}
                </h3>
                <p style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Today's Appointments</p>
              </div>
              
              <div style={{ 
                background: 'var(--surface)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px var(--shadow-light)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>⏱️</div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--text-primary)'
                }}>
                  {upcomingBookings.length}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Upcoming Jobs</p>
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
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Completed</p>
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
                  {formatCurrency(totalEarnings)}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Total Earned</p>
              </div>
            </>
          )}
        </div>

        {/* Schedule Section */}
        <div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: '700',
            letterSpacing: '-0.01em'
          }}>
            Your Schedule
          </h2>

          {loading ? (
            <SkeletonList count={3} />
          ) : upcomingBookings.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No upcoming appointments"
              description="Your schedule is clear"
            />
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              {upcomingBookings.map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  userRole="beautician"
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeauticianDashboard;
