/**
 * Zoo Beauty Palace - Design System
 * Premium Beauty-Tech Aesthetic
 */

// Color Palette
export const colors = {
  // Primary - Soft Rose / Blush Pink
  primary: {
    50: '#FFF5F7',
    100: '#FFE3E8',
    200: '#FFC7D1',
    300: '#FF9BB0',
    400: '#FF6E8F',
    500: '#FF4275', // Main primary
    600: '#E63B69',
    700: '#CC2D5A',
    800: '#B3214B',
    900: '#99153C',
  },
  
  // Secondary - Deep Plum / Royal Purple
  secondary: {
    50: '#F5F3F7',
    100: '#E8E1EF',
    200: '#D1C3DF',
    300: '#B39CCF',
    400: '#9575BF',
    500: '#774EAF', // Main secondary
    600: '#6A459D',
    700: '#5C3B8B',
    800: '#4F3279',
    900: '#412867',
  },
  
  // Accent - Gold / Champagne
  accent: {
    50: '#FFFBF5',
    100: '#FFF4E0',
    200: '#FFE8C2',
    300: '#FFD699',
    400: '#FFC470',
    500: '#FFB347', // Main accent
    600: '#E6A13F',
    700: '#CC8F37',
    800: '#B37D2F',
    900: '#996B27',
  },
  
  // Neutrals
  neutral: {
    ivory: '#FAF8F6',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    charcoal: '#1A1A1A',
    900: '#0A0A0A',
  },
  
  // Semantic colors
  success: {
    light: '#86EFAC',
    main: '#22C55E',
    dark: '#15803D',
  },
  error: {
    light: '#FCA5A5',
    main: '#EF4444',
    dark: '#B91C1C',
  },
  warning: {
    light: '#FCD34D',
    main: '#F59E0B',
    dark: '#B45309',
  },
  info: {
    light: '#93C5FD',
    main: '#3B82F6',
    dark: '#1E40AF',
  },
};

// Typography
export const typography = {
  fonts: {
    heading: '"Playfair Display", "Georgia", serif',
    body: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
  },
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Glassmorphism
  glass: '0 8px 32px 0 rgba(255, 66, 117, 0.15)',
  glassLight: '0 4px 16px 0 rgba(255, 66, 117, 0.1)',
};

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary[400]} 0%, ${colors.secondary[600]} 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent[400]} 0%, ${colors.accent[600]} 100%)`,
  sunset: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.secondary[500]} 50%, ${colors.accent[500]} 100%)`,
  premium: `linear-gradient(135deg, ${colors.secondary[600]} 0%, ${colors.primary[500]} 100%)`,
  soft: `linear-gradient(180deg, ${colors.primary[50]} 0%, ${colors.neutral.ivory} 100%)`,
};

// Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index layers
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Transitions
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Export all tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  breakpoints,
  zIndex,
  transitions,
};

export default designTokens;
