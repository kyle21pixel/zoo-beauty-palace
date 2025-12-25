import React from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../theme/tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  padding?: keyof typeof spacing;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = '6',
  className = '',
  style,
  onClick,
  hoverable = false,
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: borderRadius.xl,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick || hoverable ? 'pointer' : 'default',
    padding: spacing[padding],
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: '#FFFFFF',
      boxShadow: shadows.base,
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: shadows.glass,
    },
    elevated: {
      background: '#FFFFFF',
      boxShadow: shadows.lg,
    },
    outlined: {
      background: 'transparent',
      border: `2px solid ${colors.neutral[200]}`,
    },
  };

  const hoverStyles: React.CSSProperties = hoverable || onClick ? {
    transform: 'translateY(-4px)',
    boxShadow: shadows.xl,
  } : {};

  return (
    <div
      className={className}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow as string;
        }
      }}
    >
      {children}
    </div>
  );
};
