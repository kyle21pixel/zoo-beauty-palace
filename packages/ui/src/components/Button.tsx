import React from 'react';
import { colors, spacing, borderRadius, shadows, typography, transitions } from '../theme/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.semibold,
    borderRadius: borderRadius.lg,
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${transitions.base}`,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
    position: 'relative',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.sizes.sm,
      height: '36px',
    },
    md: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.sizes.base,
      height: '44px',
    },
    lg: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: typography.sizes.lg,
      height: '52px',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
      color: '#FFFFFF',
      boxShadow: shadows.md,
    },
    secondary: {
      background: `linear-gradient(135deg, ${colors.secondary[500]} 0%, ${colors.secondary[600]} 100%)`,
      color: '#FFFFFF',
      boxShadow: shadows.md,
    },
    accent: {
      background: `linear-gradient(135deg, ${colors.accent[500]} 0%, ${colors.accent[600]} 100%)`,
      color: colors.neutral[900],
      boxShadow: shadows.md,
    },
    outline: {
      background: 'transparent',
      color: colors.primary[500],
      border: `2px solid ${colors.primary[500]}`,
    },
    ghost: {
      background: 'transparent',
      color: colors.primary[500],
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && (
        <span style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#ffffff',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      )}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </button>
  );
};
