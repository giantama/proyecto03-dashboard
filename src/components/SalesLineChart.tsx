import { LineChart } from '@mui/x-charts/LineChart';
import type { YearSales } from '../types/VideoGame';
import ChartCard from './ChartCard';

interface SalesLineChartProps {
  data: YearSales[];
}

/** Evolución de las ventas globales por año. */
export default function SalesLineChart({ data }: SalesLineChartProps) {
  return (
    <ChartCard title="Evolución de Ventas Globales por Año" subtitle="Millones de USD por año de lanzamiento">
      <LineChart
        height={260}
        xAxis={[{ data: data.map((d) => d.year), scaleType: 'point', valueFormatter: (v: number) => String(v) }]}
        series={[{ data: data.map((d) => d.sales), label: 'Ventas (M)', color: '#2563eb', showMark: false, area: true, curve: 'linear' }]}
        hideLegend
        margin={{ left: 0, right: 10 }}
        sx={{ '& .MuiAreaElement-root': { fillOpacity: 0.12 } }}
      />
    </ChartCard>
  );
}
