import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import type { CategorySales } from '../types/VideoGame';
import { CHART_COLORS } from '../theme';
import { formatMillions } from '../utils/metrics';
import ChartCard from './ChartCard';

interface PlatformDonutChartProps {
  data: CategorySales[];
  total: number;
}

/** Cuota de mercado por plataforma con el total en el centro del anillo. */
export default function PlatformDonutChart({ data, total }: PlatformDonutChartProps) {
  const series = data.map((d, i) => ({
    id: d.label,
    label: `${d.label} · ${total ? ((d.value / total) * 100).toFixed(1) : 0}%`,
    value: d.value,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));
  return (
    <ChartCard title="Cuota de Mercado por Plataforma" subtitle="Participación en ventas globales (top 5 + otros)">
      <Box sx={{ position: 'relative' }}>
        <PieChart
          height={260}
          series={[{ data: series, innerRadius: 55, outerRadius: 90, paddingAngle: 1, cornerRadius: 3, valueFormatter: (v) => `${v.value.toFixed(2)}M` }]}
          slotProps={{ legend: { direction: 'vertical', position: { vertical: 'middle', horizontal: 'end' } } }}
        />
      </Box>
      <Typography variant="body2" align="center" sx={{ fontWeight: 700, mt: -1 }}>
        Total: {formatMillions(total)}
      </Typography>
    </ChartCard>
  );
}
