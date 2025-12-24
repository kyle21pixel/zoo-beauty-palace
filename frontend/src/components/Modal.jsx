import React from 'react';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = '500px' 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          maxWidth,
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header */}
        {title && (
          <div style={{
            padding: 'var(--spacing-xl)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              fontWeight: '700',
              margin: 0
            }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: 'var(--spacing-xs)',
                lineHeight: 1,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: 'var(--spacing-xl)' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: 'var(--spacing-xl)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end'
          }}>
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translate(-50%, -40%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  const getConfirmButtonStyles = () => {
    const baseStyles = {
      padding: 'var(--spacing-sm) var(--spacing-xl)',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      fontSize: '0.9375rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: 'white'
    };

    const typeStyles = {
      danger: {
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
      },
      warning: {
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
      },
      info: {
        background: 'linear-gradient(135deg, var(--primary-color) 0%, #7C3AED 100%)'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = () => {
    const icons = {
      danger: '⚠️',
      warning: '⚡',
      info: 'ℹ️'
    };
    return icons[type];
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        style={{
          padding: 'var(--spacing-sm) var(--spacing-xl)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontSize: '0.9375rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = 'var(--background)'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      >
        {cancelText}
      </button>
      <button
        onClick={() => {
          onConfirm();
          onClose();
        }}
        style={getConfirmButtonStyles()}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        {confirmText}
      </button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <div style={{ textAlign: 'center', padding: 'var(--spacing-lg) 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>
          {getIcon()}
        </div>
        <p style={{
          color: 'var(--text-primary)',
          fontSize: '1.0625rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};
