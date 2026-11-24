import { Grid } from '@mui/material';
import KPICard from './KPICard';

export interface KPI {
  title: string;
  value: string | number;
  accentColor: string;
  subtitle?: string;
}

interface KPISectionProps {
  kpis: KPI[];
}

/** Distribuye las tarjetas KPI: 3 columnas en escritorio, 1 columna en móvil. */
export default function KPISection({ kpis }: KPISectionProps) {
  return (
    <Grid container spacing={2}>
      {kpis.map((k) => (
        <Grid key={k.title} size={{ xs: 12, md: 12 / kpis.length }}>
          <KPICard {...k} />
        </Grid>
      ))}
    </Grid>
  );
}
