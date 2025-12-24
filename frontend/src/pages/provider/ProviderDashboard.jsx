import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI, providerAPI } from '../../services/api';
import { handleApiCall } from '../../utils/apiUtils';
import BookingCard from '../../components/BookingCard.jsx';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [providerData, setProviderData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProviderData();
  }, []);

  const fetchProviderData = async () => {
    try {
      const result = await handleApiCall(
        () => providerAPI.getById(user?.id),
        setLoading,
        setError
      );
      setProviderData(result.data.provider);
      
      // Also fetch bookings for this provider
      const bookingsResult = await handleApiCall(
        () => bookingAPI.getByProvider(user?.id),
        setLoading,
        setError
      );
      setBookings(bookingsResult.data.bookings);
    } catch (error) {
      console.error('Error fetching provider data:', error);
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
        // Update the booking in the local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading && !providerData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
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
        color: '#DC3545',
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

  const todayBookings = bookings.filter(booking => {
    const today = new Date();
    const bookingDate = new Date(booking.scheduledDate);
    return bookingDate.toDateString() === today.toDateString();
  });

  const monthlyEarnings = bookings
    .filter(booking => booking.paymentStatus === 'paid' && booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar" style={{ backgroundColor: '#F9F9F9' }}>
        <h3 style={{ padding: '0 20px', color: '#FF6B6B' }}>Provider Dashboard</h3>
        <ul>
          <li><a href="/provider/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Overview</a></li>
          <li><a href="/provider/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</a></li>
          <li><a href="/provider/services" style={{ textDecoration: 'none', color: '#333' }}>My Services</a></li>
          <li><a href="/provider/bookings" style={{ textDecoration: 'none', color: '#333' }}>Bookings</a></li>
          <li><a href="/provider/earnings" style={{ textDecoration: 'none', color: '#333' }}>Earnings</a></li>
          <li><a href="/provider/reviews" style={{ textDecoration: 'none', color: '#333' }}>Reviews</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 style={{ color: '#FF6B6B' }}>Welcome, {providerData?.businessName || user?.firstName}!</h1>
        <p>Manage your services and bookings here.</p>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" style={{ backgroundColor: '#FF6B6B', color: 'white' }}>
            <h3>Today's Bookings</h3>
            <p>{todayBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFE066', color: 'black' }}>
            <h3>Monthly Earnings</h3>
            <p>${monthlyEarnings.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#4ECDC4', color: 'black' }}>
            <h3>Completed</h3>
            <p>{completedBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFFFFF', color: 'black', border: '1px solid #FF6B6B' }}>
            <h3>Rating</h3>
            <p>{providerData?.rating?.average || 0.0}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <h2 style={{ color: '#FF6B6B' }}>Recent Bookings</h2>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.slice(0, 5).map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <p>No upcoming bookings to display.</p>
          )}
          
          {completedBookings.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#666' }}>Recent Completed</h3>
              {completedBookings.slice(0, 3).map(booking => (
                <BookingCard key={`completed-${booking.id}`} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;