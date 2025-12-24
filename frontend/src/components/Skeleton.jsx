import React from 'react';

export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = 'var(--radius-sm)',
  style = {}
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, var(--border-color) 0%, var(--surface) 50%, var(--border-color) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div style={{
      background: 'var(--surface)',
      padding: 'var(--spacing-xl)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)'
    }}>
      <Skeleton height="24px" width="60%" style={{ marginBottom: 'var(--spacing-md)' }} />
      <Skeleton height="16px" width="100%" style={{ marginBottom: 'var(--spacing-sm)' }} />
      <Skeleton height="16px" width="80%" style={{ marginBottom: 'var(--spacing-lg)' }} />
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <Skeleton height="36px" width="100px" borderRadius="var(--radius-md)" />
        <Skeleton height="36px" width="100px" borderRadius="var(--radius-md)" />
      </div>
    </div>
  );
};

export const SkeletonStat = () => {
  return (
    <div style={{
      background: 'var(--surface)',
      padding: 'var(--spacing-xl)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)'
    }}>
      <Skeleton height="40px" width="40px" borderRadius="50%" style={{ marginBottom: 'var(--spacing-md)' }} />
      <Skeleton height="32px" width="60px" style={{ marginBottom: 'var(--spacing-sm)' }} />
      <Skeleton height="16px" width="80%" />
    </div>
  );
};

export const SkeletonList = ({ count = 3 }) => {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-lg)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="20px" width="80%" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-lg)',
            borderBottom: rowIndex < rows - 1 ? '1px solid var(--border-color)' : 'none'
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="16px" width="70%" />
          ))}
        </div>
      ))}
    </div>
  );
};
