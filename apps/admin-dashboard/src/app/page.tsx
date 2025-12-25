'use client';

import { Button, Card } from '@zoo/ui';
import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'services', label: 'Services', icon: '✨' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const platformStats = [
    { label: 'Total Users', value: '12,453', change: '+12.5%', icon: '👥', color: '#FF4275' },
    { label: 'Total Bookings', value: '8,921', change: '+8.3%', icon: '📅', color: '#774EAF' },
    { label: 'Total Revenue', value: '$284,592', change: '+15.2%', icon: '💰', color: '#FFB347' },
    { label: 'Active Providers', value: '234', change: '+5.7%', icon: '🏪', color: '#22C55E' },
  ];

  const recentUsers = [
    { id: '1', name: 'Sarah Johnson', role: 'customer', email: 'sarah@example.com', status: 'active' },
    { id: '2', name: 'Glamour Studio', role: 'provider', email: 'contact@glamour.com', status: 'active' },
    { id: '3', name: 'Emily Chen', role: 'beautician', email: 'emily@example.com', status: 'active' },
    { id: '4', name: 'Beauty Paradise', role: 'provider', email: 'info@paradise.com', status: 'pending' },
  ];

  const roleColors: Record<string, string> = {
    customer: '#3B82F6',
    provider: '#774EAF',
    beautician: '#FF4275',
    admin: '#1A1A1A',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      {/* Top Bar */}
      <header style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #404040 100%)',
        padding: '1.5rem 2rem',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
          }}>
            🦓 Zoo Beauty - Admin
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button variant="ghost" style={{ color: 'white' }}>
              <span style={{ fontSize: '1.25rem' }}>🔔</span>
            </Button>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
            }}>
              A
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #E5E5E5',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #FF4275' : '3px solid transparent',
                color: activeTab === tab.id ? '#FF4275' : '#737373',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9375rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {platformStats.map((stat, index) => (
            <Card key={index} variant="elevated" padding="6">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                }}>
                  {stat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#737373', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {stat.label}
                  </p>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: stat.color,
                  }}>
                    {stat.value}
                  </h3>
                </div>
              </div>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: '#D1FAE520',
                color: '#22C55E',
              }}>
                {stat.change} this month
              </span>
            </Card>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}>
          {/* Recent Users */}
          <Card variant="elevated" padding="0">
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E5E5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  Recent Users
                </h2>
                <Button variant="outline" size="sm">
                  Manage All
                </Button>
              </div>
            </div>
            <div>
              {recentUsers.map((user, index) => (
                <div
                  key={user.id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: index < recentUsers.length - 1 ? '1px solid #E5E5E5' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                      {user.name}
                    </h4>
                    <p style={{ color: '#737373', fontSize: '0.875rem' }}>
                      {user.email}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: `${roleColors[user.role]}15`,
                      color: roleColors[user.role],
                      textTransform: 'capitalize',
                    }}>
                      {user.role}
                    </span>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: user.status === 'active' ? '#22C55E' : '#F59E0B',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated" padding="6">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Platform Management
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <Button fullWidth>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>👥</div>
                  <div style={{ fontSize: '0.875rem' }}>Manage Users</div>
                </div>
              </Button>
              <Button fullWidth variant="secondary">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>✨</div>
                  <div style={{ fontSize: '0.875rem' }}>Services</div>
                </div>
              </Button>
              <Button fullWidth variant="accent">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📊</div>
                  <div style={{ fontSize: '0.875rem' }}>Analytics</div>
                </div>
              </Button>
              <Button fullWidth variant="outline">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>⚙️</div>
                  <div style={{ fontSize: '0.875rem' }}>Settings</div>
                </div>
              </Button>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              borderRadius: '1rem',
              color: 'white',
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Platform Health
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>98.5%</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Uptime</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>2.3s</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Avg Response</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1.2k</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Active Now</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Log */}
        <Card variant="elevated" padding="6" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Recent Activity
          </h2>
          <div style={{
            height: '200px',
            background: 'linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 100%)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📝</div>
              <p>Activity log will be displayed here</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
