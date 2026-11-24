import { Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/** Contenedor visual común para los gráficos (título + subtítulo). */
export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h2" component="h2">{title}</Typography>
      <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
      {children}
    </Paper>
  );
}
