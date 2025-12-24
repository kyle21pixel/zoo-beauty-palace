import React from 'react';
import { motion } from 'framer-motion';
import { getServiceCategoryColor, getServiceCategoryName, formatCurrency } from '../utils/apiUtils';
import { Badge } from './Badge';

const ServiceCard = ({ service, onClick }) => {
  const categoryColor = getServiceCategoryColor(service.category);
  const categoryName = getServiceCategoryName(service.category);

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="luxury-card"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '24px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}
      onClick={() => onClick && onClick(service)}
    >
      {/* Hover Gradient Overlay */}
      <div className="card-overlay" style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${categoryColor}10 0%, transparent 100%)`,
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }} />

      <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: categoryColor,
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.02)'
          }}>
            {service.icon || '✨'}
          </div>
          
          {service.isPopular && (
            <Badge 
              variant="default"
              style={{
                background: 'linear-gradient(135deg, #FF9F1C 0%, #FF7E00 100%)',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(255, 159, 28, 0.3)'
              }}
            >
              POPULAR
            </Badge>
          )}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            color: categoryColor,
            fontWeight: '700',
            marginBottom: '8px',
            display: 'block'
          }}>
            {categoryName}
          </span>
          <h3 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
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
          marginBottom: '24px',
          fontSize: '1rem',
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
