import React, { useState } from 'react';
import { formatCurrency, formatDate, formatTime, getServiceCategoryColor, getServiceCategoryName } from '../utils/apiUtils';
import { StatusBadge } from './Badge';
import { Avatar } from './Avatar';
import { ConfirmModal } from './Modal';

const BookingCard = ({ booking, onStatusChange, userRole = 'client' }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const categoryColor = getServiceCategoryColor(booking.service?.category);
  const categoryName = getServiceCategoryName(booking.service?.category);

  const handleCancel = () => {
    onStatusChange?.(booking.id, 'cancelled');
  };

  const handleConfirm = () => {
    onStatusChange?.(booking.id, 'confirmed');
  };

  const handleComplete = () => {
    onStatusChange?.(booking.id, 'completed');
  };

  return (
    <>
      <div 
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-xl)',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px var(--shadow-light)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow-light)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-light)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${categoryColor}, var(--secondary-color))`
        }} />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-lg)',
          gap: 'var(--spacing-md)'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              <h3 style={{ 
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                fontWeight: '700'
              }}>
                {booking.service?.name || 'Service Name'}
              </h3>
              <StatusBadge status={booking.status} />
            </div>
            <p style={{ 
              margin: 0,
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {categoryName}
            </p>
          </div>
        </div>

        {/* Provider/Client Info */}
        {userRole === 'client' && booking.provider && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            background: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <Avatar 
              name={booking.provider.name}
              src={booking.provider.avatar}
              size="md"
              status={booking.provider.isOnline ? 'online' : 'offline'}
            />
            <div>
              <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>
                {booking.provider.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {booking.provider.businessName || 'Provider'}
              </p>
            </div>
          </div>
        )}

        {/* Booking Details Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)',
          padding: 'var(--spacing-md) 0'
        }}>
          <div>
            <p style={{ 
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              📅 Date
            </p>
            <p style={{ 
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>
              {formatDate(booking.scheduledDate)}
            </p>
          </div>
          <div>
            <p style={{ 
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              ⏰ Time
            </p>
            <p style={{ 
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>
              {formatTime(booking.scheduledTime)}
            </p>
          </div>
          <div>
            <p style={{ 
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              ⏱️ Duration
            </p>
            <p style={{ 
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>
              {booking.duration} min
            </p>
          </div>
          <div>
            <p style={{ 
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              💰 Price
            </p>
            <p style={{ 
              margin: 0,
              fontSize: '1.125rem',
              color: 'var(--primary-color)',
              fontWeight: '700'
            }}>
              {formatCurrency(booking.totalAmount)}
            </p>
          </div>
        </div>

        {/* Payment Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-md)',
          background: 'var(--background)',
          borderRadius: 'var(--radius-md)',
          marginBottom: booking.rating ? 'var(--spacing-lg)' : 0
        }}>
          <span style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)' 
          }}>
            Payment Status
          </span>
          <StatusBadge status={booking.paymentStatus} />
        </div>

        {/* Action Buttons */}
        {onStatusChange && booking.status !== 'completed' && booking.status !== 'cancelled' && (
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-sm)',
            marginTop: 'var(--spacing-lg)',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-color)'
          }}>
            {booking.status === 'pending' && userRole !== 'client' && (
              <>
                <button 
                  onClick={handleConfirm}
                  className="btn-primary"
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    fontSize: '0.875rem',
                    flex: 1
                  }}
                >
                  ✓ Confirm Booking
                </button>
                <button 
                  onClick={() => setShowCancelModal(true)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    fontSize: '0.875rem',
                    background: 'transparent',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    flex: 1
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#EF4444';
                    e.target.style.color = '#EF4444';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.color = 'var(--text-primary)';
                  }}
                >
                  ✕ Cancel
                </button>
              </>
            )}
            {booking.status === 'confirmed' && userRole !== 'client' && (
              <button 
                onClick={handleComplete}
                className="btn-primary"
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-lg)',
                  fontSize: '0.875rem',
                  width: '100%'
                }}
              >
                ✓ Mark as Completed
              </button>
            )}
            {userRole === 'client' && (booking.status === 'pending' || booking.status === 'confirmed') && (
              <button 
                onClick={() => setShowCancelModal(true)}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-lg)',
                  fontSize: '0.875rem',
                  background: 'transparent',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#EF4444';
                  e.target.style.color = '#EF4444';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.color = 'var(--text-primary)';
                }}
              >
                ✕ Cancel Booking
              </button>
            )}
          </div>
        )}

        {/* Rating & Review */}
        {booking.rating && booking.review && (
          <div style={{ 
            marginTop: 'var(--spacing-lg)',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              <span style={{ color: '#FFD700', fontSize: '1.125rem' }}>★</span>
              <span style={{ 
                fontWeight: '700',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem'
              }}>
                {booking.rating}/5
              </span>
            </div>
            <p style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}>
              "{booking.review}"
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep Booking"
        type="danger"
      />
    </>
  );
};

export default BookingCard;