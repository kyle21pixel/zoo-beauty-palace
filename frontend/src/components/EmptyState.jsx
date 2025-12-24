import React from 'react';

export const EmptyState = ({ 
  icon = '📭',
  title = 'No items found',
  description,
  action,
  actionLabel,
  size = 'md' // 'sm' | 'md' | 'lg'
}) => {
  const sizeConfig = {
    sm: {
      iconSize: '3rem',
      titleSize: '1.25rem',
      descSize: '0.875rem',
      padding: 'var(--spacing-2xl)'
    },
    md: {
      iconSize: '4rem',
      titleSize: '1.5rem',
      descSize: '1rem',
      padding: 'var(--spacing-3xl)'
    },
    lg: {
      iconSize: '5rem',
      titleSize: '1.75rem',
      descSize: '1.125rem',
      padding: 'var(--spacing-3xl) var(--spacing-2xl)'
    }
  };

  const config = sizeConfig[size];

  return (
    <div style={{
      textAlign: 'center',
      padding: config.padding,
      backgroundColor: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ 
        fontSize: config.iconSize, 
        marginBottom: 'var(--spacing-lg)',
        opacity: 0.8
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: config.titleSize,
        color: 'var(--text-primary)',
        marginBottom: description ? 'var(--spacing-sm)' : 'var(--spacing-lg)',
        fontWeight: '700'
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: config.descSize,
          marginBottom: action ? 'var(--spacing-xl)' : 0,
          lineHeight: 1.6,
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          {description}
        </p>
      )}
      {action && actionLabel && (
        <button
          onClick={action}
          className="btn-primary"
          style={{
            padding: 'var(--spacing-sm) var(--spacing-xl)',
            fontSize: '0.9375rem'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ 
  title = 'Something went wrong',
  description = 'An error occurred while loading this content.',
  onRetry,
  retryLabel = 'Try Again'
}) => {
  return (
    <EmptyState
      icon="⚠️"
      title={title}
      description={description}
      action={onRetry}
      actionLabel={retryLabel}
      size="md"
    />
  );
};

export const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-3xl)',
      gap: 'var(--spacing-lg)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--border-color)',
        borderTop: '4px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '1rem',
        margin: 0
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
