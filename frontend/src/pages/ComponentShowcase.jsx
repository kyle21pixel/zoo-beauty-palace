import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Skeleton, SkeletonCard, SkeletonStat, SkeletonList, SkeletonTable } from '../components/Skeleton';
import { Modal, ConfirmModal } from '../components/Modal';
import { Avatar, AvatarGroup } from '../components/Avatar';
import { Badge, StatusBadge, CountBadge } from '../components/Badge';
import { EmptyState, ErrorState, LoadingState } from '../components/EmptyState';
import { Input, TextArea, Select, Checkbox } from '../components/FormInputs';

const ComponentShowcase = () => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    category: '',
    agree: false
  });

  const avatars = [
    { name: 'John Doe', src: '' },
    { name: 'Jane Smith', src: '' },
    { name: 'Mike Johnson', src: '' },
    { name: 'Sarah Williams', src: '' }
  ];

  return (
    <div style={{ 
      padding: 'var(--spacing-3xl)',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'var(--background)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: '3rem',
        color: 'var(--text-primary)',
        marginBottom: 'var(--spacing-md)'
      }}>
        UI Component Library
      </h1>
      <p style={{ 
        color: 'var(--text-secondary)',
        fontSize: '1.125rem',
        marginBottom: 'var(--spacing-3xl)'
      }}>
        Luxury design system components for Zoo Beauty Palace
      </p>

      {/* Toast Notifications */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Toast Notifications
        </h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary"
            onClick={() => toast.success('Booking confirmed successfully!')}
          >
            Success Toast
          </button>
          <button 
            className="btn-primary"
            onClick={() => toast.error('Failed to process payment')}
          >
            Error Toast
          </button>
          <button 
            className="btn-primary"
            onClick={() => toast.warning('Your session will expire soon')}
          >
            Warning Toast
          </button>
          <button 
            className="btn-primary"
            onClick={() => toast.info('New beautician available in your area')}
          >
            Info Toast
          </button>
        </div>
      </section>

      {/* Avatars */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Avatars
        </h2>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-xl)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Sizes</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              <Avatar name="John Doe" size="xs" />
              <Avatar name="John Doe" size="sm" />
              <Avatar name="John Doe" size="md" />
              <Avatar name="John Doe" size="lg" />
              <Avatar name="John Doe" size="xl" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Status</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              <Avatar name="Online" size="lg" status="online" />
              <Avatar name="Offline" size="lg" status="offline" />
              <Avatar name="Busy" size="lg" status="busy" />
              <Avatar name="Away" size="lg" status="away" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Group</p>
            <AvatarGroup avatars={avatars} max={3} size="md" />
          </div>
        </div>
      </section>

      {/* Badges */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Badges
        </h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary" icon="✨">Primary</Badge>
          <Badge variant="success" icon="✓">Success</Badge>
          <Badge variant="warning" icon="⚠">Warning</Badge>
          <Badge variant="error" icon="✕">Error</Badge>
          <Badge variant="info" icon="ℹ">Info</Badge>
        </div>
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Status Badges</p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <StatusBadge status="pending" />
            <StatusBadge status="confirmed" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="completed" />
            <StatusBadge status="cancelled" />
            <StatusBadge status="paid" />
            <StatusBadge status="unpaid" />
          </div>
        </div>
        <div>
          <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Count Badge</p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className="btn-primary">
              Notifications
            </button>
            <CountBadge count={5} />
          </div>
        </div>
      </section>

      {/* Modals */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Modals
        </h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Open Modal
          </button>
          <button className="btn-primary" onClick={() => setShowConfirmModal(true)}>
            Confirm Modal
          </button>
        </div>
      </section>

      {/* Form Inputs */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Form Inputs
        </h2>
        <div style={{ 
          maxWidth: '600px',
          background: 'var(--surface)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <Input
            label="Full Name"
            placeholder="Enter your name"
            icon="👤"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            helperText="This will be displayed on your profile"
          />
          <div style={{ height: 'var(--spacing-lg)' }} />
          <TextArea
            label="Message"
            placeholder="Tell us about your requirements..."
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <div style={{ height: 'var(--spacing-lg)' }} />
          <Select
            label="Service Category"
            placeholder="Choose a category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            options={[
              { value: 'hair', label: 'Hair Services' },
              { value: 'nails', label: 'Nail Care' },
              { value: 'makeup', label: 'Makeup' },
              { value: 'spa', label: 'Spa & Wellness' }
            ]}
            required
          />
          <div style={{ height: 'var(--spacing-lg)' }} />
          <Checkbox
            label="I agree to the terms and conditions"
            checked={formData.agree}
            onChange={(e) => setFormData({...formData, agree: e.target.checked})}
          />
          <div style={{ height: 'var(--spacing-xl)' }} />
          <button className="btn-primary" style={{ width: '100%' }}>
            Submit Form
          </button>
        </div>
      </section>

      {/* Skeletons */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Loading Skeletons
        </h2>
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Basic Skeleton</p>
            <Skeleton width="200px" height="24px" />
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Stat Cards</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Card List</p>
            <SkeletonList count={2} />
          </div>
        </div>
      </section>

      {/* Empty States */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Empty & Loading States
        </h2>
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          <EmptyState
            icon="📅"
            title="No bookings yet"
            description="When clients book your services, they'll appear here"
            action={() => toast.info('Action clicked!')}
            actionLabel="Browse Services"
          />
          <ErrorState
            title="Failed to load bookings"
            description="We couldn't fetch your bookings. Please try again."
            onRetry={() => toast.info('Retrying...')}
          />
          <LoadingState message="Loading your dashboard..." />
        </div>
      </section>

      {/* Modal Components */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Booking Details"
        footer={
          <>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-xl)',
                border: '1px solid var(--border-color)',
                background: 'transparent',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
            <button className="btn-primary">
              Confirm
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
          This is a modal dialog with custom content. You can put any React components here.
        </p>
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <StatusBadge status="confirmed" />
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => toast.success('Action confirmed!')}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep Booking"
        type="danger"
      />
    </div>
  );
};

export default ComponentShowcase;
