import React from 'react';

const Logo = ({ width = '150px', height = 'auto', style = {}, className = '' }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Zoo Beauty Palace" 
      width={width}
      height={height}
      style={{ objectFit: 'contain', ...style }}
      className={className}
    />
  );
};

export default Logo;
