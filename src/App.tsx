import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}
