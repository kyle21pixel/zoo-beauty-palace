import React from 'react';
import { getServiceCategoryColor, getServiceCategoryName, formatCurrency } from '../utils/apiUtils';
import { Badge } from './Badge';

const ServiceCard = ({ service, onClick }) => {
  const categoryColor = getServiceCategoryColor(service.category);
  const categoryName = getServiceCategoryName(service.category);

  return (
    <div 
      className="luxury-card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-xl)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => onClick && onClick(service)}
    >
      {/* Animated Overlay */}
      <div className="service-card-overlay" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Top accent gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${categoryColor}, var(--secondary-color))`,
        zIndex: 1
      }} />

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 'var(--spacing-md)',
        gap: 'var(--spacing-sm)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 'var(--spacing-xs)' }}>
            <Badge 
              variant="default"
              size="sm"
              style={{
                background: `${categoryColor}10`,
                color: categoryColor,
                border: `1px solid ${categoryColor}20`,
                fontWeight: '600'
              }}
            >
              {categoryName}
            </Badge>
          </div>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.375rem',
            color: 'var(--text-primary)',
            margin: 0,
            fontWeight: '700',
            lineHeight: 1.3
          }}>
            {service.name}
          </h3>
        </div>
        
        <div className="service-card-icon" style={{
          fontSize: '2rem',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
        }}>
          {service.icon || '✨'}
        </div>
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
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        flex: 1
      }}>
        {service.description}
      </p>

      {/* Stats Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: 'var(--spacing-md)',
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '600'
          }}>
            Starting at
          </span>
          <span className="gradient-text" style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700',
            fontFamily: 'var(--font-heading)'
          }}>
            {formatCurrency(service.price)}
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-xs)',
          background: 'var(--background)',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '1rem' }}>⏱️</span>
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            {service.duration}m
          </span>
        </div>
      </div>
      
      {service.isPopular && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '-30px',
          background: 'linear-gradient(135deg, #FF9F1C 0%, #FBBF24 100%)',
          color: 'white',
          padding: '4px 40px',
          transform: 'rotate(45deg)',
          fontSize: '0.75rem',
          fontWeight: '700',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 2
        }}>
          POPULAR
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
