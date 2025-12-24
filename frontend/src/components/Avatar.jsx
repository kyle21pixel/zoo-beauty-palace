import React from 'react';

export const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  name = '',
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status, // 'online' | 'offline' | 'busy' | 'away'
  shape = 'circle' // 'circle' | 'rounded' | 'square'
}) => {
  const sizeMap = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '56px',
    xl: '80px'
  };

  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '28px'
  };

  const borderRadiusMap = {
    circle: '50%',
    rounded: 'var(--radius-md)',
    square: '0'
  };

  const statusColors = {
    online: '#10B981',
    offline: '#9CA3AF',
    busy: '#EF4444',
    away: '#F59E0B'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const containerStyle = {
    position: 'relative',
    width: sizeMap[size],
    height: sizeMap[size],
    flexShrink: 0,
    display: 'inline-block'
  };

  const avatarStyle = {
    width: '100%',
    height: '100%',
    borderRadius: borderRadiusMap[shape],
    objectFit: 'cover',
    background: src ? 'var(--background)' : 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeMap[size],
    fontWeight: '600',
    border: '2px solid var(--surface)'
  };

  const statusStyle = status ? {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: size === 'xs' ? '8px' : size === 'sm' ? '10px' : size === 'md' ? '12px' : '14px',
    height: size === 'xs' ? '8px' : size === 'sm' ? '10px' : size === 'md' ? '12px' : '14px',
    borderRadius: '50%',
    backgroundColor: statusColors[status],
    border: '2px solid var(--surface)'
  } : null;

  return (
    <div style={containerStyle}>
      {src ? (
        <img src={src} alt={alt} style={avatarStyle} />
      ) : (
        <div style={avatarStyle}>
          {getInitials(name)}
        </div>
      )}
      {status && <div style={statusStyle} />}
    </div>
  );
};

export const AvatarGroup = ({ avatars = [], max = 3, size = 'md' }) => {
  const sizeMap = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '56px',
    xl: '80px'
  };

  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      marginLeft: size === 'xs' ? '-8px' : size === 'sm' ? '-10px' : '-12px'
    }}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: size === 'xs' ? '8px' : size === 'sm' ? '10px' : '12px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            alt={avatar.alt}
            size={size}
            shape="circle"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderRadius: '50%',
          background: 'var(--background)',
          border: '2px solid var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : '14px',
          fontWeight: '600',
          color: 'var(--text-secondary)',
          marginLeft: size === 'xs' ? '8px' : size === 'sm' ? '10px' : '12px'
        }}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
