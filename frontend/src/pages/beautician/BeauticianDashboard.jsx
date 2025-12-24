import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI, beauticianAPI } from '../../services/api';
import { handleApiCall } from '../../utils/apiUtils';
import BookingCard from '../../components/BookingCard.jsx';

const BeauticianDashboard = () => {
  const { user } = useAuth();
  const [beauticianData, setBeauticianData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      // Also fetch bookings for this beautician
      const bookingsResult = await handleApiCall(
        () => bookingAPI.getByUser(user?.id), // Assuming beautician bookings are retrieved by user id
        setLoading,
        setError
      );
      setBookings(bookingsResult.data.bookings);
    } catch (error) {
      console.error('Error fetching beautician data:', error);
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

  if (loading && !beauticianData) {
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
      <div className="sidebar" style={{ backgroundColor: '#FFFFFF' }}>
        <h3 style={{ padding: '0 20px', color: '#6A4C93' }}>Beautician Dashboard</h3>
        <ul>
          <li><a href="/beautician/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Overview</a></li>
          <li><a href="/beautician/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</a></li>
          <li><a href="/beautician/services" style={{ textDecoration: 'none', color: '#333' }}>My Services</a></li>
          <li><a href="/beautician/bookings" style={{ textDecoration: 'none', color: '#333' }}>Bookings</a></li>
          <li><a href="/beautician/earnings" style={{ textDecoration: 'none', color: '#333' }}>Earnings</a></li>
          <li><a href="/beautician/reviews" style={{ textDecoration: 'none', color: '#333' }}>Reviews</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 style={{ color: '#6A4C93' }}>Welcome, {beauticianData?.firstName || user?.firstName}!</h1>
        <p>Manage your services and on-site bookings.</p>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" style={{ backgroundColor: '#6A4C93', color: 'white' }}>
            <h3>Today's Bookings</h3>
            <p>{todayBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#F1C0E8', color: 'black' }}>
            <h3>Monthly Earnings</h3>
            <p>${monthlyEarnings.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FF9F1C', color: 'black' }}>
            <h3>Completed</h3>
            <p>{completedBookings.length}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFFFFF', color: 'black', border: '1px solid #6A4C93' }}>
            <h3>Rating</h3>
            <p>{beauticianData?.rating?.average || 0.0}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <h2 style={{ color: '#6A4C93' }}>Recent Bookings</h2>
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

export default BeauticianDashboard;