import React from 'react';
import { motion } from 'framer-motion';
import { getServiceCategoryColor, getServiceCategoryName, formatCurrency } from '../utils/apiUtils';
import { Badge } from './Badge';

const ServiceCard = ({ service, onClick }) => {
  const categoryColor = getServiceCategoryColor(service.category);
  const categoryName = getServiceCategoryName(service.category);

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="luxury-card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
      }}
      onClick={() => onClick && onClick(service)}
    >
      {/* Top Gradient Line */}
      <div style={{
        height: '6px',
        width: '100%',
        background: `linear-gradient(90deg, ${categoryColor}, var(--secondary-color))`
      }} />

      <div style={{ padding: 'var(--spacing-xl)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: `${categoryColor}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            color: categoryColor,
            boxShadow: `0 4px 12px ${categoryColor}15`
          }}>
            {service.icon || '✨'}
          </div>
          
          {service.isPopular && (
            <Badge 
              variant="default"
              style={{
                background: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                boxShadow: '0 2px 8px rgba(255, 159, 28, 0.3)'
              }}
            >
              POPULAR
            </Badge>
          )}
        </div>

        {/* Content */}
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            color: categoryColor,
            fontWeight: '600',
            marginBottom: 'var(--spacing-xs)',
            display: 'block'
          }}>
            {categoryName}
          </span>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            margin: 0,
            fontWeight: '700',
            lineHeight: 1.2
          }}>
            {service.name}
          </h3>
        </div>

        <p style={{ 
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-xl)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {service.description}
        </p>

        {/* Footer */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Starting from</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)', lineHeight: 1 }}>
              {formatCurrency(service.price)}
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--text-secondary)', 
            fontSize: '0.875rem',
            background: 'var(--background)',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            <span>⏱️</span>
            <span>{service.duration} min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
