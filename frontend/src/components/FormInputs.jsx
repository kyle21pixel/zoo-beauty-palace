import React, { useState } from 'react';

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  icon,
  disabled = false,
  required = false,
  fullWidth = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    width: fullWidth ? '100%' : 'auto'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    display: 'flex',
    gap: '4px'
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: icon ? 'var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 40px' : 'var(--spacing-sm) var(--spacing-md)',
    fontSize: '0.9375rem',
    border: `2px solid ${error ? '#EF4444' : isFocused ? 'var(--primary-color)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-md)',
    backgroundColor: disabled ? 'var(--background)' : 'var(--surface)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s',
    outline: 'none',
    fontFamily: 'var(--font-body)'
  };

  const iconStyle = {
    position: 'absolute',
    left: '12px',
    fontSize: '1.25rem',
    opacity: 0.6,
    pointerEvents: 'none'
  };

  const helperStyle = {
    fontSize: '0.8125rem',
    color: error ? '#EF4444' : 'var(--text-secondary)',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <div style={inputWrapperStyle}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <span style={helperStyle}>{error || helperText}</span>
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
  rows = 4,
  fullWidth = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    width: fullWidth ? '100%' : 'auto'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    display: 'flex',
    gap: '4px'
  };

  const textareaStyle = {
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: '0.9375rem',
    border: `2px solid ${error ? '#EF4444' : isFocused ? 'var(--primary-color)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-md)',
    backgroundColor: disabled ? 'var(--background)' : 'var(--surface)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    resize: 'vertical',
    minHeight: `${rows * 24}px`
  };

  const helperStyle = {
    fontSize: '0.8125rem',
    color: error ? '#EF4444' : 'var(--text-secondary)',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={disabled}
        rows={rows}
        style={textareaStyle}
        {...props}
      />
      {(error || helperText) && (
        <span style={helperStyle}>{error || helperText}</span>
      )}
    </div>
  );
};

export const Select = ({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  options = [],
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    width: fullWidth ? '100%' : 'auto'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    display: 'flex',
    gap: '4px'
  };

  const selectStyle = {
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: '0.9375rem',
    border: `2px solid ${error ? '#EF4444' : isFocused ? 'var(--primary-color)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-md)',
    backgroundColor: disabled ? 'var(--background)' : 'var(--surface)',
    color: value ? 'var(--text-primary)' : 'var(--text-secondary)',
    transition: 'all 0.2s',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  const helperStyle = {
    fontSize: '0.8125rem',
    color: error ? '#EF4444' : 'var(--text-secondary)',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        disabled={disabled}
        style={selectStyle}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <span style={helperStyle}>{error || helperText}</span>
      )}
    </div>
  );
};

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  ...props
}) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    accentColor: 'var(--primary-color)'
  };

  const labelStyle = {
    fontSize: '0.9375rem',
    color: 'var(--text-primary)',
    userSelect: 'none'
  };

  return (
    <label style={containerStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={checkboxStyle}
        {...props}
      />
      <span style={labelStyle}>{label}</span>
    </label>
  );
};
