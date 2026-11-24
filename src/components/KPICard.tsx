import { Paper, Typography } from '@mui/material';

interface KPICardProps {
  title: string;
  value: string | number;
  accentColor: string;
  subtitle?: string;
}

/** Tarjeta reutilizable de indicador (se instancia 3 veces en KPISection). */
export default function KPICard({ title, value, accentColor, subtitle }: KPICardProps) {
  return (
    <Paper sx={{ p: 2, height: '100%', borderLeft: `5px solid ${accentColor}` }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' }, fontWeight: 700, mt: 0.5, wordBreak: 'break-word' }}>
        {value}
      </Typography>
      {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
    </Paper>
  );
}
