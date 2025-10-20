// src/theme/tokens.ts
export const colors = {
  brandDark: '#051941',
  brandBlue: '#092D74',
  // dark mode colors
  bg: '#0B1220',
  surface: '#111A2E',
  surface2: '#0E1730',
  outline: '#26304A',
  textPrimary: '#E6ECFF',
  textSecondary: '#8FA1C2',
  placeholder: '#6D7A98',
  // status colors
  success: '#1ECB7B',
  danger: '#FF5B5B',
  // base
  'black.100': '#EEEEEE',
};

export const radius = {
  xl: 16,
  full: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

export const typography = {
  title: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  meta: { fontSize: 12, fontWeight: '400' as const },
};
