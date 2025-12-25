import React from 'react';
import { colors, spacing, borderRadius, typography } from '../theme/tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  style,
  ...props
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    width: fullWidth ? '100%' : 'auto',
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    paddingLeft: leftIcon ? spacing[10] : spacing[4],
    paddingRight: rightIcon ? spacing[10] : spacing[4],
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.body,
    border: `2px solid ${error ? colors.error.main : colors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#FFFFFF',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[700],
    fontFamily: typography.fonts.body,
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: colors.neutral[400],
  };

  const leftIconStyles: React.CSSProperties = {
    ...iconStyles,
    left: spacing[3],
  };

  const rightIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: spacing[3],
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: typography.sizes.xs,
    color: error ? colors.error.main : colors.neutral[500],
    fontFamily: typography.fonts.body,
  };

  return (
    <div style={containerStyles} className={className}>
      {label && <label style={labelStyles}>{label}</label>}
      <div style={inputWrapperStyles}>
        {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
        <input
          style={inputStyles}
          onFocus={(e) => {
            e.target.style.borderColor = error ? colors.error.main : colors.primary[500];
            e.target.style.boxShadow = `0 0 0 3px ${error ? colors.error.light + '40' : colors.primary[100]}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.error.main : colors.neutral[200];
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
        {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
      </div>
      {(error || helperText) && (
        <span style={helperTextStyles}>{error || helperText}</span>
      )}
    </div>
  );
};
