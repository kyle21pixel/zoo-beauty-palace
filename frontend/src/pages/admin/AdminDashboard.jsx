import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { userAPI, bookingAPI, serviceAPI, reviewAPI, providerAPI } from '../../services/api';
import { handleApiCall, formatCurrency, getServiceCategoryColor, getServiceCategoryName } from '../../utils/apiUtils';
import { SkeletonStat, SkeletonTable } from '../../components/Skeleton';
import { EmptyState, ErrorState } from '../../components/EmptyState';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import Logo from '../../components/Logo';
import Modal from '../../components/Modal';

const AdminDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalEarnings: 0,
    activeProviders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [providers, setProviders] = useState([]);
  const [pendingProviders, setPendingProviders] = useState([]);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResult = await handleApiCall(
        () => userAPI.getAll(),
        () => {},
        setError
      );
      
      // Fetch bookings
      const bookingsResult = await handleApiCall(
        () => bookingAPI.getAll(),
        () => {},
        setError
      );
      
      // Fetch services
      const servicesResult = await handleApiCall(
        () => serviceAPI.getAll(),
        () => {},
        setError
      );
      
      // Fetch reviews
      const reviewsResult = await handleApiCall(
        () => reviewAPI.getAll(),
        () => {},
        setError
      );
      
      // Fetch providers
      const providersResult = await handleApiCall(
        () => providerAPI.getAll(),
        () => {},
        setError
      );
      
      const allUsers = usersResult.data.users || [];
      const allBookings = bookingsResult.data.bookings || [];
      const allServices = servicesResult.data.services || [];
      const allReviews = reviewsResult.data.reviews || [];
      const allProviders = providersResult.data.providers || [];
      
      setUsers(allUsers);
      setBookings(allBookings);
      setServices(allServices);
      setReviews(allReviews);
      setProviders(allProviders);
      
      // Filter pending providers
      setPendingProviders(allProviders.filter(p => p.status === 'pending'));
      
      const totalUsers = allUsers.length;
      const totalBookings = allBookings.length;
      const totalEarnings = allBookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
      
      const activeProviders = allProviders.filter(p => p.status === 'approved').length;
      
      setStats({
        totalUsers,
        totalBookings,
        totalEarnings,
        activeProviders
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load admin data');
      setLoading(false);
    }
  };

  // Render functions for each tab
  const renderUsersTab = () => {
    const filteredUsers = users.filter(u => 
      (u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       u.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'all' || 
       (filterStatus === 'active' && u.isActive) ||
       (filterStatus === 'inactive' && !u.isActive))
    );
    
    return (
      <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>User Management</h2>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem'
              }}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem'
              }}
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        {filteredUsers.length === 0 ? (
          <EmptyState icon="👥" title="No users found" description="No users match your search criteria" />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>User</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Role</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <Avatar name={u.firstName} size="sm" />
                        <span>{u.firstName} {u.lastName}</span>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>{u.email}</td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <Badge variant={u.role === 'admin' ? 'primary' : 'default'}>{u.role}</Badge>
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <Badge variant={u.isActive ? 'success' : 'error'}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        {u.isActive ? (
                          <button
                            onClick={() => handleUserAction(u.id, 'suspend')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              background: 'var(--background)',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(u.id, 'activate')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              background: 'var(--primary-color)',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleUserAction(u.id, 'delete')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--error-color)',
                            background: 'transparent',
                            color: 'var(--error-color)',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  
  const renderBookingsTab = () => {
    const filteredBookings = bookings.filter(b =>
      filterStatus === 'all' || b.status === filterStatus
    );
    
    return (
      <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Booking Management</h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.95rem'
            }}
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        {filteredBookings.length === 0 ? (
          <EmptyState icon="📅" title="No bookings found" description="No bookings match your filter" />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>ID</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Service</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Client</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 'var(--spacing-md)' }}>#{b.id}</td>
                    <td style={{ padding: 'var(--spacing-md)' }}>{b.serviceName || 'Service'}</td>
                    <td style={{ padding: 'var(--spacing-md)' }}>{b.clientName || 'Client'}</td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>{formatCurrency(b.totalAmount)}</td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <Badge variant={
                        b.status === 'completed' ? 'success' :
                        b.status === 'cancelled' ? 'error' :
                        b.status === 'confirmed' ? 'primary' : 'warning'
                      }>
                        {b.status}
                      </Badge>
                    </td>
                    <td style={{ padding: 'var(--spacing-md)' }}>
                      <button
                        onClick={() => {
                          setSelectedItem(b);
                          setModalType('booking');
                          setShowModal(true);
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          background: 'var(--background)',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  
  const renderProvidersTab = () => {
    return (
      <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>Provider Approval</h2>
        
        {pendingProviders.length === 0 ? (
          <EmptyState icon="✅" title="No pending approvals" description="All provider applications have been reviewed" />
        ) : (
          <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
            {pendingProviders.map(p => (
              <div key={p.id} style={{
                padding: 'var(--spacing-lg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--background)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                      {p.businessName || p.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      {p.email}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      {p.description || 'No description provided'}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                      <Badge variant="warning">Pending Review</Badge>
                      <Badge variant="default">{p.serviceCategory || 'Beauty Services'}</Badge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button
                      onClick={() => handleProviderApproval(p.id, true)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'var(--success-color)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleProviderApproval(p.id, false)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--error-color)',
                        background: 'transparent',
                        color: 'var(--error-color)',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderServicesTab = () => {
    return (
      <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Service Management</h2>
          <button
            onClick={() => {
              setSelectedItem(null);
              setModalType('service');
              setShowModal(true);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--primary-color)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600'
            }}
          >
            + Add Service
          </button>
        </div>
        
        {services.length === 0 ? (
          <EmptyState icon="💼" title="No services" description="Add your first service to get started" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
            {services.map(s => (
              <div key={s.id} style={{
                padding: 'var(--spacing-lg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--background)'
              }}>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                    {s.name}
                  </h3>
                  <Badge variant="default" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    {getServiceCategoryName(s.category)}
                  </Badge>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 'var(--spacing-sm)' }}>
                    {s.description}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-md)' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                    {formatCurrency(s.price)}
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button
                      onClick={() => {
                        setSelectedItem(s);
                        setModalType('service');
                        setShowModal(true);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--background)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleServiceAction(s.id, 'delete')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--error-color)',
                        background: 'transparent',
                        color: 'var(--error-color)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderReviewsTab = () => {
    return (
      <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>Review Moderation</h2>
        
        {reviews.length === 0 ? (
          <EmptyState icon="⭐" title="No reviews" description="Reviews will appear here once clients leave feedback" />
        ) : (
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            {reviews.map(r => (
              <div key={r.id} style={{
                padding: 'var(--spacing-lg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--background)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                      <Avatar name={r.clientName} size="sm" />
                      <div>
                        <p style={{ fontWeight: '600', marginBottom: '2px' }}>{r.clientName || 'Anonymous'}</p>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < r.rating ? '#FFB800' : '#E0E0E0' }}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      {r.comment}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Service: {r.serviceName || 'Unknown'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    {!r.approved && (
                      <button
                        onClick={() => handleReviewAction(r.id, 'approve')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: 'none',
                          background: 'var(--success-color)',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleReviewAction(r.id, 'reject')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--error-color)',
                        background: 'transparent',
                        color: 'var(--error-color)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderAnalyticsTab = () => {
    const monthlyBookings = bookings.reduce((acc, b) => {
      const month = new Date(b.bookingDate).toLocaleDateString('en', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    
    const monthlyRevenue = bookings.reduce((acc, b) => {
      if (b.paymentStatus === 'paid') {
        const month = new Date(b.bookingDate).toLocaleDateString('en', { month: 'short' });
        acc[month] = (acc[month] || 0) + b.totalAmount;
      }
      return acc;
    }, {});
    
    return (
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>Analytics & Reports</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>Monthly Bookings</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-sm)', justifyContent: 'space-around' }}>
              {Object.entries(monthlyBookings).slice(-6).map(([month, count]) => (
                <div key={month} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: `${(count / Math.max(...Object.values(monthlyBookings))) * 160}px`,
                    background: 'linear-gradient(180deg, var(--primary-color) 0%, #7C3AED 100%)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-xs)',
                    transition: 'all 0.3s'
                  }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: '600' }}>{month}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{count}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>Monthly Revenue</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-sm)', justifyContent: 'space-around' }}>
              {Object.entries(monthlyRevenue).slice(-6).map(([month, amount]) => (
                <div key={month} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: `${(amount / Math.max(...Object.values(monthlyRevenue))) * 160}px`,
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-xs)',
                    transition: 'all 0.3s'
                  }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: '600' }}>{month}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{formatCurrency(amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: 'var(--spacing-xl)', background: 'var(--surface)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>Platform Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Avg. Booking Value</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                {formatCurrency(stats.totalEarnings / stats.totalBookings || 0)}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Completion Rate</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-color)' }}>
                {((bookings.filter(b => b.status === 'completed').length / bookings.length) * 100 || 0).toFixed(1)}%
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Total Services</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {services.length}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Avg. Rating</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FFB800' }}>
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1)} ★
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div style={{ padding: 'var(--spacing-3xl)' }}>
        <ErrorState 
          title="Admin Dashboard Error" 
          description={error} 
          onRetry={fetchDashboardData} 
        />
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'providers', label: 'Provider Approval', icon: '✅' },
    { id: 'services', label: 'Services', icon: '💼' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];
  
  // Handler functions
  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'suspend') {
        await userAPI.update(userId, { isActive: false });
        toast.success('User suspended successfully');
      } else if (action === 'activate') {
        await userAPI.update(userId, { isActive: true });
        toast.success('User activated successfully');
      } else if (action === 'delete') {
        await userAPI.delete(userId);
        toast.success('User deleted successfully');
      }
      fetchDashboardData();
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };
  
  const handleBookingStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateStatus(bookingId, newStatus);
      toast.success('Booking status updated successfully');
      fetchDashboardData();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };
  
  const handleProviderApproval = async (providerId, approved) => {
    try {
      await providerAPI.update(providerId, { 
        status: approved ? 'approved' : 'rejected',
        approvedAt: approved ? new Date().toISOString() : null
      });
      toast.success(`Provider ${approved ? 'approved' : 'rejected'} successfully`);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to update provider status');
    }
  };
  
  const handleServiceAction = async (serviceId, action) => {
    try {
      if (action === 'delete') {
        await serviceAPI.delete(serviceId);
        toast.success('Service deleted successfully');
        fetchDashboardData();
        setShowModal(false);
      }
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };
  
  const handleServiceSubmit = async (serviceData) => {
    try {
      if (selectedItem) {
        await serviceAPI.update(selectedItem.id, serviceData);
        toast.success('Service updated successfully');
      } else {
        await serviceAPI.create(serviceData);
        toast.success('Service created successfully');
      }
      fetchDashboardData();
      setShowModal(false);
      setSelectedItem(null);
    } catch (error) {
      toast.error(`Failed to ${selectedItem ? 'update' : 'create'} service`);
    }
  };
  
  const handleReviewAction = async (reviewId, action) => {
    try {
      if (action === 'approve') {
        await reviewAPI.update(reviewId, { approved: true });
        toast.success('Review approved');
      } else if (action === 'reject') {
        await reviewAPI.delete(reviewId);
        toast.success('Review removed');
      }
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to moderate review');
    }
  };

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
            Admin Control
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
              <Badge variant="primary" size="sm">Admin</Badge>
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
            </>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
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
              Platform Overview
            </h2>
            
            {loading ? (
              <SkeletonTable rows={5} columns={3} />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--spacing-3xl)',
                color: 'var(--text-secondary)'
              }}>
                <EmptyState
                  icon="📊"
                  title="Welcome to Admin Dashboard"
                  description="Use the navigation menu to manage users, bookings, services, and more"
                />
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'users' && !loading && renderUsersTab()}
        {activeTab === 'bookings' && !loading && renderBookingsTab()}
        {activeTab === 'providers' && !loading && renderProvidersTab()}
        {activeTab === 'services' && !loading && renderServicesTab()}
        {activeTab === 'reviews' && !loading && renderReviewsTab()}
        {activeTab === 'analytics' && !loading && renderAnalyticsTab()}
      </div>
      
      {/* Modals */}
      {showModal && modalType === 'booking' && selectedItem && (
        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setSelectedItem(null); }} title="Booking Details">
          <div style={{ padding: 'var(--spacing-lg)' }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Booking ID</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>#{selectedItem.id}</p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Service</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>{selectedItem.serviceName}</p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Client</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>{selectedItem.clientName}</p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Date & Time</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {new Date(selectedItem.bookingDate).toLocaleString()}
              </p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Amount</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                {formatCurrency(selectedItem.totalAmount)}
              </p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
                Update Status
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                {['pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleBookingStatusUpdate(selectedItem.id, status)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedItem.status === status ? 'none' : '1px solid var(--border-color)',
                      background: selectedItem.status === status ? 'var(--primary-color)' : 'var(--background)',
                      color: selectedItem.status === status ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
      
      {showModal && modalType === 'service' && (
        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setSelectedItem(null); }} title={selectedItem ? 'Edit Service' : 'Add New Service'}>
          <ServiceForm
            service={selectedItem}
            onSubmit={handleServiceSubmit}
            onCancel={() => { setShowModal(false); setSelectedItem(null); }}
          />
        </Modal>
      )}
    </div>
  );
};

// Service Form Component
const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    duration: service?.duration || '',
    category: service?.category || 'hair',
    icon: service?.icon || '✨'
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, price: parseFloat(formData.price), duration: parseInt(formData.duration) });
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ padding: 'var(--spacing-lg)' }}>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
          Service Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.95rem'
          }}
        />
      </div>
      
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.95rem'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
            Duration (min) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.95rem'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.95rem'
            }}
          >
            <option value="hair">Hair</option>
            <option value="nails">Nails</option>
            <option value="massage">Massage</option>
            <option value="barber">Barber</option>
            <option value="tattoo">Tattoo</option>
            <option value="makeup">Makeup</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
            Icon
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="✨"
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.95rem'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            background: 'var(--background)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}
        >
          {service ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
};

export default AdminDashboard;
