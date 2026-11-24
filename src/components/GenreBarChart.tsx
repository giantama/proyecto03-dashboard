import { BarChart } from '@mui/x-charts/BarChart';
import type { CategorySales } from '../types/VideoGame';
import ChartCard from './ChartCard';

interface GenreBarChartProps {
  data: CategorySales[];
}

/** Ventas totales por género (barras horizontales). */
export default function GenreBarChart({ data }: GenreBarChartProps) {
  return (
    <ChartCard title="Ventas Totales por Género" subtitle="Millones de USD (top 8 géneros)">
      <BarChart
        height={260}
        layout="horizontal"
        yAxis={[{ data: data.map((d) => d.label), scaleType: 'band', width: 90 }]}
        series={[{ data: data.map((d) => d.value), label: 'Ventas (M)', color: '#2563eb', valueFormatter: (v) => `${v?.toFixed(2)}M` }]}
        hideLegend
        borderRadius={4}
        margin={{ right: 10 }}
      />
    </ChartCard>
  );
}
