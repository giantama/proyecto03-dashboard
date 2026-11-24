import { useMemo, useState } from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import KPISection, { type KPI } from './components/KPISection';
import ChartsSection from './components/ChartsSection';
import SalesTable from './components/SalesTable';
import { sampleGames } from './data/sampleData';
import type { TableColumn } from './types/VideoGame';
import {
  ALL, averageSales, filterGames, formatMillions, salesBy, salesByYear, topGame, topWithOthers, totalSales, uniqueValues,
} from './utils/metrics';

const columns: TableColumn[] = [
  { header: 'Nombre', key: 'Name' },
  { header: 'Plataforma', key: 'Platform' },
  { header: 'Año', key: 'Year' },
  { header: 'Género', key: 'Genre' },
  { header: 'Ventas Globales (USD)', key: 'Global_Sales', align: 'right', format: (v) => formatMillions(Number(v)) },
];

/** Componente raíz: mantiene el estado de los filtros y distribuye los datos filtrados. */
export default function Dashboard() {
  // Estado de la interacción (useState): selección de plataforma y género
  const [selectedPlatform, setSelectedPlatform] = useState<string>(ALL);
  const [selectedGenre, setSelectedGenre] = useState<string>(ALL);

  const games = sampleGames; // Sprint 2: datos de ejemplo
  const platforms = useMemo(() => uniqueValues(games, 'Platform'), [games]);
  const genres = useMemo(() => uniqueValues(games, 'Genre'), [games]);

  // Cada cambio de estado vuelve a renderizar y recalcula los datos derivados
  const filtered = useMemo(() => filterGames(games, selectedPlatform, selectedGenre), [games, selectedPlatform, selectedGenre]);
  const total = totalSales(filtered);
  const best = topGame(filtered);

  const kpis: KPI[] = [
    { title: 'Ventas Totales Globales', value: `${formatMillions(total)} USD`, accentColor: '#2563eb', subtitle: `${filtered.length} juegos` },
    { title: 'Promedio de Ventas por Juego', value: `${formatMillions(averageSales(filtered))} USD`, accentColor: '#14b8a6' },
    { title: 'Juego Más Vendido', value: best ? `${best.Name} – ${best.Global_Sales.toFixed(2)}M` : '—', accentColor: '#f59e0b', subtitle: best?.Platform },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header title="Global Video Game Sales & Market Trends Dashboard" source="Sprint 2 · datos de ejemplo" />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <FilterBar
                platforms={platforms}
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 8 }}>
              <KPISection kpis={kpis} />
            </Grid>
          </Grid>
          <ChartsSection
            byYear={salesByYear(filtered)}
            byGenre={salesBy(filtered, 'Genre').slice(0, 8)}
            byPlatform={topWithOthers(salesBy(filtered, 'Platform'), 5)}
            total={total}
          />
          <SalesTable rows={filtered} columns={columns} />
        </Stack>
      </Container>
    </Box>
  );
}
