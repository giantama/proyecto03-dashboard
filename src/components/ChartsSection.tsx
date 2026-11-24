import { Grid } from '@mui/material';
import type { CategorySales, YearSales } from '../types/VideoGame';
import SalesLineChart from './SalesLineChart';
import GenreBarChart from './GenreBarChart';
import PlatformDonutChart from './PlatformDonutChart';

interface ChartsSectionProps {
  byYear: YearSales[];
  byGenre: CategorySales[];
  byPlatform: CategorySales[];
  total: number;
}

/** Layout de gráficos: 3 columnas en escritorio, 1 columna en móvil. */
export default function ChartsSection({ byYear, byGenre, byPlatform, total }: ChartsSectionProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}><SalesLineChart data={byYear} /></Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}><GenreBarChart data={byGenre} /></Grid>
      <Grid size={{ xs: 12, md: 12, lg: 4 }}><PlatformDonutChart data={byPlatform} total={total} /></Grid>
    </Grid>
  );
}
