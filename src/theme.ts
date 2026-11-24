import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    secondary: { main: '#14b8a6' },
    warning: { main: '#f59e0b' },
    background: { default: '#f1f5f9', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", Arial, sans-serif',
    h1: { fontSize: '1.35rem', fontWeight: 700 },
    h2: { fontSize: '1rem', fontWeight: 700 },
  },
  components: {
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: '1px solid #e2e8f0' } } },
  },
});

export const CHART_COLORS = ['#2563eb', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444', '#94a3b8'];
