import { AppBar, Chip, Toolbar, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface HeaderProps {
  title: string;
  source: string;
}

/** Encabezado: título del dashboard y fuente/fase de los datos. */
export default function Header({ title, source }: HeaderProps) {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#1e293b' }}>
      <Toolbar sx={{ gap: 1.5, flexWrap: 'wrap', py: { xs: 1.5, sm: 0 } }}>
        <SportsEsportsIcon />
        <Typography variant="h1" component="h1" sx={{ flexGrow: 1, fontSize: { xs: '1.05rem', sm: '1.35rem' } }}>
          {title}
        </Typography>
        <Chip label={source} size="small" sx={{ bgcolor: '#334155', color: '#e2e8f0' }} />
      </Toolbar>
    </AppBar>
  );
}
