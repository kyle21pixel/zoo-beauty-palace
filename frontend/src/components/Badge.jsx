import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon,
  pill = false
}) => {
  const sizeStyles = {
    sm: {
      padding: '2px 8px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    md: {
      padding: '4px 12px',
      fontSize: '0.8125rem',
      fontWeight: '600'
    },
    lg: {
      padding: '6px 16px',
      fontSize: '0.875rem',
      fontWeight: '600'
    }
  };

  const variantStyles = {
    default: {
      background: 'var(--background)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)'
    },
    primary: {
      background: 'rgba(90, 45, 130, 0.1)',
      color: 'var(--primary-color)',
      border: '1px solid rgba(90, 45, 130, 0.2)'
    },
    success: {
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#059669',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.1)',
      color: '#D97706',
      border: '1px solid rgba(245, 158, 11, 0.2)'
    },
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#DC2626',
      border: '1px solid rgba(239, 68, 68, 0.2)'
    },
    info: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#2563EB',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    }
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: icon ? '4px' : '0',
    borderRadius: pill ? '999px' : 'var(--radius-sm)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  return (
    <span style={style}>
      {icon && <span style={{ fontSize: '1em' }}>{icon}</span>}
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      variant: 'warning',
      icon: '⏳',
      label: 'Pending'
    },
    confirmed: {
      variant: 'info',
      icon: '✓',
      label: 'Confirmed'
    },
    'in-progress': {
      variant: 'primary',
      icon: '⚡',
      label: 'In Progress'
    },
    completed: {
      variant: 'success',
      icon: '✓',
      label: 'Completed'
    },
    cancelled: {
      variant: 'error',
      icon: '✕',
      label: 'Cancelled'
    },
    paid: {
      variant: 'success',
      icon: '💰',
      label: 'Paid'
    },
    unpaid: {
      variant: 'warning',
      icon: '⏳',
      label: 'Unpaid'
    },
    refunded: {
      variant: 'info',
      icon: '↩',
      label: 'Refunded'
    }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <Badge variant={config.variant} icon={config.icon} pill>
      {config.label}
    </Badge>
  );
};

export const CountBadge = ({ count, max = 99 }) => {
  const displayCount = count > max ? `${max}+` : count;

  if (count === 0) return null;

  return (
    <span style={{
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      color: 'white',
      fontSize: '0.6875rem',
      fontWeight: '700',
      minWidth: '18px',
      height: '18px',
      borderRadius: '999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px',
      border: '2px solid var(--surface)'
    }}>
      {displayCount}
    </span>
  );
};
