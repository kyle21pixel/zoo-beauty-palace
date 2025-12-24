import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, bookingAPI } from '../../services/api';
import { handleApiCall } from '../../utils/apiUtils';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalEarnings: 0,
    activeProviders: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all necessary data
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
      
      // Calculate stats
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
      
      // Get recent activity (last 5 bookings)
      const sortedBookings = [...bookingsResult.data.bookings].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setRecentActivity(sortedBookings.slice(0, 5));
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

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar" style={{ backgroundColor: '#FFFFFF' }}>
        <h3 style={{ padding: '0 20px', color: '#5A2D82' }}>Admin Dashboard</h3>
        <ul>
          <li><a href="/admin/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Overview</a></li>
          <li><a href="/admin/users" style={{ textDecoration: 'none', color: '#333' }}>Manage Users</a></li>
          <li><a href="/admin/services" style={{ textDecoration: 'none', color: '#333' }}>Manage Services</a></li>
          <li><a href="/admin/bookings" style={{ textDecoration: 'none', color: '#333' }}>Bookings</a></li>
          <li><a href="/admin/analytics" style={{ textDecoration: 'none', color: '#333' }}>Analytics</a></li>
          <li><a href="/admin/notifications" style={{ textDecoration: 'none', color: '#333' }}>Notifications</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 style={{ color: '#5A2D82' }}>Welcome, {user?.firstName}!</h1>
        <p>Manage the entire system from here.</p>
        
        <div className="stats-grid">
          <div className="stat-card" style={{ backgroundColor: '#5A2D82', color: 'white' }}>
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#F8C8DC', color: 'black' }}>
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFD166', color: 'black' }}>
            <h3>Revenue</h3>
            <p>${stats.totalEarnings.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#FFFFFF', color: 'black', border: '1px solid #5A2D82' }}>
            <h3>Active Providers</h3>
            <p>{stats.activeProviders}</p>
          </div>
        </div>
        
        <div className="card">
          <h2 style={{ color: '#5A2D82' }}>Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.client?.firstName || 'N/A'} {booking.client?.lastName || ''}</td>
                    <td>{booking.service?.name || 'N/A'}</td>
                    <td>{booking.provider?.businessName || booking.provider?.firstName || 'N/A'}</td>
                    <td>{new Date(booking.scheduledDate).toLocaleDateString()}</td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: booking.status === 'completed' ? '#d4edda' : booking.status === 'confirmed' ? '#cce5ff' : booking.status === 'pending' ? '#fff3cd' : '#f8d7da', color: booking.status === 'completed' ? '#155724' : booking.status === 'confirmed' ? '#004085' : booking.status === 'pending' ? '#856404' : '#721c24' }}>{booking.status}</span></td>
                    <td>${booking.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent activity to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;