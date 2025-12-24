import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI } from '../../services/api';
import { handleApiCall } from '../../utils/apiUtils';
import BookingCard from '../../components/BookingCard.jsx';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        fontSize: '18px'
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

  const totalSpent = bookings
    .filter(booking => booking.paymentStatus === 'paid')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const favoriteProviders = [...new Set(bookings.map(booking => booking.provider))].length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar" style={{ backgroundColor: '#FFFFFF' }}>
        <h3 style={{ padding: '0 20px', color: '#FF4C61' }}>Client Dashboard</h3>
        <ul>
          <li><a href="/client/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Overview</a></li>
          <li><a href="/client/bookings" style={{ textDecoration: 'none', color: '#333' }}>My Bookings</a></li>
          <li><a href="/client/favorites" style={{ textDecoration: 'none', color: '#333' }}>Favorites</a></li>
          <li><a href="/client/history" style={{ textDecoration: 'none', color: '#333' }}>History</a></li>
          <li><a href="/client/reviews" style={{ textDecoration: 'none', color: '#333' }}>My Reviews</a></li>
          <li><a href="/client/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 style={{ color: '#FF4C61' }}>Welcome, {user?.firstName} {user?.lastName}!</h1>
        <p>Manage your bookings and service history.</p>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" style={{ backgroundColor: '#FF4C61', color: 'white' }}>
            <h3>Upcoming Bookings</h3>
            <p>{upcomingBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFA69E', color: 'black' }}>
            <h3>Completed</h3>
            <p>{completedBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#6A67CE', color: 'white' }}>
            <h3>Total Spent</h3>
            <p>${totalSpent.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFFFFF', color: 'black', border: '1px solid #FF4C61' }}>
            <h3>Favorite Providers</h3>
            <p>{favoriteProviders}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <h2 style={{ color: '#FF4C61' }}>Recent Bookings</h2>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.slice(0, 3).map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p>No upcoming bookings to display.</p>
          )}
          {completedBookings.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#666' }}>Recent Completed</h3>
              {completedBookings.slice(0, 2).map(booking => (
                <BookingCard key={`completed-${booking.id}`} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;