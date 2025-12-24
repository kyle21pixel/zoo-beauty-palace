// frontend/src/components/BookingCard.js
import React from 'react';
import { formatCurrency, formatDate, formatTime, getServiceCategoryColor, getServiceCategoryName } from '../utils/apiUtils';

const BookingCard = ({ booking, onStatusChange }) => {
  const categoryColor = getServiceCategoryColor(booking.service?.category);
  const categoryName = getServiceCategoryName(booking.service?.category);

  const getStatusStyle = (status) => {
    const styles = {
      pending: { color: '#FFA500', backgroundColor: '#FFF3CD' },
      confirmed: { color: '#007BFF', backgroundColor: '#D1ECF1' },
      completed: { color: '#28A745', backgroundColor: '#D4EDDA' },
      cancelled: { color: '#DC3545', backgroundColor: '#F8D7DA' },
    };
    return styles[status] || styles.pending;
  };

  const statusStyle = getStatusStyle(booking.status);

  return (
    <div 
      className="booking-card"
      style={{
        border: `1px solid #ddd`,
        borderRadius: '8px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0', color: categoryColor }}>
            {booking.service?.name || 'Service Name'}
          </h4>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
            {categoryName}
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
            <div>
              <strong>Date:</strong> {formatDate(booking.scheduledDate)}
            </div>
            <div>
              <strong>Time:</strong> {formatTime(booking.scheduledTime)}
            </div>
            <div>
              <strong>Duration:</strong> {booking.duration} min
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div 
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: statusStyle.color,
              backgroundColor: statusStyle.backgroundColor,
              marginBottom: '10px'
            }}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#5A2D82' }}>
            {formatCurrency(booking.totalAmount)}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
          </div>
        </div>
      </div>
      
      {onStatusChange && booking.status !== 'completed' && booking.status !== 'cancelled' && (
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          {booking.status === 'pending' && (
            <>
              <button 
                onClick={() => onStatusChange(booking.id, 'confirmed')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#28A745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
              <button 
                onClick={() => onStatusChange(booking.id, 'cancelled')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#DC3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <button 
              onClick={() => onStatusChange(booking.id, 'completed')}
              style={{
                padding: '6px 12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Mark as Completed
            </button>
          )}
        </div>
      )}
      
      {booking.rating && booking.review && (
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
            <span style={{ fontWeight: 'bold' }}>Rating: {booking.rating}/5</span>
          </div>
          <p style={{ margin: '0', color: '#666' }}>"{booking.review}"</p>
        </div>
      )}
    </div>
  );
};

export default BookingCard;