import React from 'react';
import { getServiceCategoryColor, getServiceCategoryName, formatCurrency } from '../utils/apiUtils';
import { Badge } from './Badge';

const ServiceCard = ({ service, onClick }) => {
  const categoryColor = getServiceCategoryColor(service.category);
  const categoryName = getServiceCategoryName(service.category);

  return (
    <div 
      style={{
        background: 'var(--surface)',
        border: '2px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-xl)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 8px var(--shadow-light)'
      }}
      onClick={() => onClick && onClick(service)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 32px var(--shadow-light)';
        e.currentTarget.style.borderColor = categoryColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-light)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      {/* Top accent gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${categoryColor}, var(--secondary-color))`
      }} />

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--spacing-md)',
        gap: 'var(--spacing-sm)'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.375rem',
          color: 'var(--text-primary)',
          margin: 0,
          fontWeight: '700',
          lineHeight: 1.3,
          flex: 1
        }}>
          {service.name}
        </h3>
        {service.isPopular && (
          <Badge variant="primary" icon="🔥" size="sm">
            Popular
          </Badge>
        )}
      </div>

      {/* Category Badge */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <Badge 
          variant="default"
          size="sm"
          style={{
            background: `${categoryColor}15`,
            color: categoryColor,
            border: `1px solid ${categoryColor}30`
          }}
        >
          {categoryName}
        </Badge>
      </div>

      {/* Description */}
      <p style={{ 
        color: 'var(--text-secondary)',
        margin: '0 0 var(--spacing-lg) 0',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {service.description}
      </p>

      {/* Stats Row */}
      <div style={{ 
        display: 'flex',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)',
        paddingBottom: 'var(--spacing-md)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '1rem' }}>⏱️</span>
          <span style={{ 
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            fontWeight: '500'
          }}>
            {service.duration} min
          </span>
        </div>
        {service.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#FFD700', fontSize: '1rem' }}>★</span>
            <span style={{ 
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>
              {service.rating}
            </span>
            {service.reviewCount && (
              <span style={{ 
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)'
              }}>
                ({service.reviewCount})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with Price */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
            Price Range
          </p>
          <p style={{ 
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--primary-color)',
            fontFamily: 'var(--font-heading)'
          }}>
            {formatCurrency(service.price.min)} - {formatCurrency(service.price.max)}
          </p>
        </div>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${categoryColor}, var(--secondary-color))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          transition: 'transform 0.2s',
          flexShrink: 0
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        >
          →
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;