import React, { useState } from 'react';

const Logo = ({ width = '150px', height = 'auto', style = {}, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span 
        className={className}
        style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--primary-color)',
          letterSpacing: '-0.02em',
          textDecoration: 'none',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          ...style 
        }}
      >
        Zoo Beauty Palace
      </span>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="Zoo Beauty Palace" 
      width={width}
      height={height}
      style={{ objectFit: 'contain', ...style }}
      className={className}
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = "/logo.svg"; // Fallback to svg if png fails
        if (e.target.src.includes('logo.svg')) {
             e.target.onerror = () => setImgError(true);
        }
      }}
    />
  );
};

export default Logo;
