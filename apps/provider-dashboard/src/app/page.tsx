'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, Button } from '@zoo/ui';

export default function ProviderDashboard() {
  const stats = [
    {
      label: 'Today\'s Bookings',
      value: '12',
      change: '+8%',
      positive: true,
      icon: '📅',
      color: '#FF4275',
    },
    {
      label: 'Today\'s Revenue',
      value: '$1,840',
      change: '+12%',
      positive: true,
      icon: '💰',
      color: '#FFB347',
    },
    {
      label: 'Pending Bookings',
      value: '5',
      change: '-2',
      positive: true,
      icon: '⏳',
      color: '#774EAF',
    },
    {
      label: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      positive: true,
      icon: '⭐',
      color: '#FF6E8F',
    },
  ];

  const recentBookings = [
    {
      id: '1',
      customer: 'Sarah Johnson',
      service: 'Luxury Hair Treatment',
      time: '10:00 AM',
      status: 'confirmed',
      price: '$150',
    },
    {
      id: '2',
      customer: 'Emma Davis',
      service: 'Bridal Makeup',
      time: '11:30 AM',
      status: 'pending',
      price: '$250',
    },
    {
      id: '3',
      customer: 'Olivia Wilson',
      service: 'Classic Manicure',
      time: '2:00 PM',
      status: 'confirmed',
      price: '$75',
    },
    {
      id: '4',
      customer: 'Ava Martinez',
      service: 'Hydrating Facial',
      time: '3:30 PM',
      status: 'in-progress',
      price: '$120',
    },
  ];

  const statusColors: Record<string, string> = {
    confirmed: '#22C55E',
    pending: '#F59E0B',
    'in-progress': '#3B82F6',
    completed: '#9575BF',
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-heading)',
          marginBottom: '0.5rem',
        }}>
          Welcome back! 👋
        </h1>
        <p style={{ color: '#737373', fontSize: '1.125rem' }}>
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        {stats.map((stat, index) => (
          <Card key={index} variant="elevated" padding="6">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}>
                {stat.icon}
              </div>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: stat.positive ? '#D1FAE520' : '#FEE2E220',
                color: stat.positive ? '#22C55E' : '#EF4444',
              }}>
                {stat.change}
              </span>
            </div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '0.25rem',
              color: stat.color,
            }}>
              {stat.value}
            </h3>
            <p style={{ color: '#737373', fontSize: '0.875rem' }}>
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem',
      }}>
        {/* Recent Bookings */}
        <Card variant="elevated" padding="0">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                Today's Bookings
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
          <div>
            {recentBookings.map((booking, index) => (
              <div
                key={booking.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: index < recentBookings.length - 1 ? '1px solid #E5E5E5' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                    {booking.customer}
                  </h4>
                  <p style={{ color: '#737373', fontSize: '0.875rem' }}>
                    {booking.service}
                  </p>
                </div>
                <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                    {booking.time}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                    {booking.price}
                  </div>
                </div>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: `${statusColors[booking.status]}15`,
                  color: statusColors[booking.status],
                  textTransform: 'capitalize',
                }}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated" padding="6">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button fullWidth leftIcon={<span>➕</span>}>
              Add New Service
            </Button>
            <Button fullWidth variant="secondary" leftIcon={<span>👥</span>}>
              Add Staff Member
            </Button>
            <Button fullWidth variant="outline" leftIcon={<span>📊</span>}>
              View Analytics
            </Button>
            <Button fullWidth variant="outline" leftIcon={<span>💬</span>}>
              Messages
            </Button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
            borderRadius: '1rem',
            color: 'white',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              Premium Member
            </h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              Access all features
            </p>
          </div>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card variant="elevated" padding="6">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Revenue Overview
        </h2>
        <div style={{
          height: '300px',
          background: 'linear-gradient(180deg, #FFF5F7 0%, #F5F3F7 100%)',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#737373',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <p>Revenue chart will be displayed here</p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
