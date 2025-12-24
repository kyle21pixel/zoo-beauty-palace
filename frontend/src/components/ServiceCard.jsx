// frontend/src/components/ServiceCard.js
import React from 'react';
import { getServiceCategoryColor, getServiceCategoryName, formatCurrency } from '../utils/apiUtils';

const ServiceCard = ({ service, onClick }) => {
  const categoryColor = getServiceCategoryColor(service.category);
  const categoryName = getServiceCategoryName(service.category);

  return (
    <div 
      className="service-card"
      style={{
        border: `2px solid ${categoryColor}`,
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: '#fff',
      }}
      onClick={() => onClick && onClick(service)}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <h3 style={{ color: categoryColor, margin: '0 0 10px 0' }}>{service.name}</h3>
      <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>
        {service.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
            {categoryName}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}>
            {formatCurrency(service.price.min)} - {formatCurrency(service.price.max)}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
            ~{service.duration} min
          </p>
          {service.rating && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
              <span style={{ fontSize: '14px' }}>
                {service.rating.average} ({service.rating.count})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;