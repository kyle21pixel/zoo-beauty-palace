'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@zoo/ui';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface Booking {
  id: string;
  customer_id: string;
  service_id: string;
  beautician_id: string;
  status: string;
  scheduled_at: string;
  total_price: number;
}

export default function AdminDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'users' | 'bookings'>('overview');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [servicesRes, usersRes, bookingsRes] = await Promise.all([
        fetch(`${API_URL}/api/services`),
        fetch(`${API_URL}/api/users`),
        fetch(`${API_URL}/api/bookings`),
      ]);

      if (!servicesRes.ok || !usersRes.ok || !bookingsRes.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const [servicesData, usersData, bookingsData] = await Promise.all([
        servicesRes.json(),
        usersRes.json(),
        bookingsRes.json(),
      ]);

      setServices(servicesData.data || []);
      setUsers(usersData.data || []);
      setBookings(bookingsData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Admin Dashboard</h1>
        <p>Loading data from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ 
          padding: '1rem', 
          background: '#FEE', 
          border: '1px solid #F00',
          borderRadius: '8px',
          marginTop: '1rem' 
        }}>
          <strong>Error:</strong> {error}
          <br />
          <small>Make sure the backend server is running on port 4000 and the database is initialized.</small>
          <br />
          <Button onClick={fetchAllData} style={{ marginTop: '1rem' }}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>🦓 Zoo Beauty Admin Dashboard</h1>
        <Button onClick={fetchAllData}>Refresh Data</Button>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #E5E5E5' }}>
        {(['overview', 'services', 'users', 'bookings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab ? '3px solid #FF4275' : '3px solid transparent',
              color: activeTab === tab ? '#FF4275' : '#666',
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: '1rem',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <Card style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.875rem' }}>Total Services</h3>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#FF4275' }}>{services.length}</p>
            </Card>
            <Card style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.875rem' }}>Total Users</h3>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#774EAF' }}>{users.length}</p>
            </Card>
            <Card style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.875rem' }}>Total Bookings</h3>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#4ECDC4' }}>{bookings.length}</p>
            </Card>
            <Card style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.875rem' }}>Active Bookings</h3>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#FFB347' }}>{activeBookings}</p>
            </Card>
          </div>

          <Card style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>System Status</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
              <span>✅ Database Connected (PostgreSQL)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
              <span>✅ API Server Running (Port 4000)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
              <span>✅ Using Live Database (Mock Data Disabled)</span>
            </div>
          </Card>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <Card style={{ padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Services ({services.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.75rem' }}>{service.name}</td>
                    <td style={{ padding: '0.75rem' }}>{service.category}</td>
                    <td style={{ padding: '0.75rem' }}>${service.price}</td>
                    <td style={{ padding: '0.75rem' }}>{service.duration} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card style={{ padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Users ({users.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Role</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.75rem' }}>{user.name}</td>
                    <td style={{ padding: '0.75rem' }}>{user.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        background: user.role === 'admin' ? '#FEE' : user.role === 'beautician' ? '#EFE' : '#EEF',
                        color: user.role === 'admin' ? '#C00' : user.role === 'beautician' ? '#0A0' : '#00A',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{user.phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <Card style={{ padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Bookings ({bookings.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Customer ID</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Service ID</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Scheduled</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#666' }}>{booking.id.slice(0, 8)}...</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#666' }}>{booking.customer_id.slice(0, 8)}...</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#666' }}>{booking.service_id.slice(0, 8)}...</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        background: 
                          booking.status === 'confirmed' ? '#DCFCE7' :
                          booking.status === 'pending' ? '#FEF3C7' :
                          booking.status === 'completed' ? '#DBEAFE' :
                          '#FEE2E2',
                        color: 
                          booking.status === 'confirmed' ? '#166534' :
                          booking.status === 'pending' ? '#92400E' :
                          booking.status === 'completed' ? '#1E40AF' :
                          '#991B1B',
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{new Date(booking.scheduled_at).toLocaleString()}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>${booking.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
