import { useMemo, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import KPISection, { type KPI } from './components/KPISection';
import ChartsSection from './components/ChartsSection';
import SalesTable from './components/SalesTable';
import { useVideoGames } from './hooks/useVideoGames';
import type { TableColumn } from './types/VideoGame';
import {
  ALL, averageSales, filterGames, formatMillions, regionShare, salesBy, salesByYear, topGame, topWithOthers, totalSales, uniqueValues,
} from './utils/metrics';

const columns: TableColumn[] = [
  { header: 'Nombre', key: 'Name' },
  { header: 'Plataforma', key: 'Platform' },
  { header: 'Año', key: 'Year' },
  { header: 'Género', key: 'Genre' },
  { header: 'Editora', key: 'Publisher' },
  { header: 'Ventas Globales (USD)', key: 'Global_Sales', align: 'right', format: (v) => formatMillions(Number(v)) },
];

/** Componente raíz: obtiene los datos de Firebase, mantiene el estado de los filtros y distribuye los datos filtrados. */
export default function Dashboard() {
  // Registros recuperados desde Firebase Realtime Database (useEffect + useState dentro del hook)
  const { games, loading, error, retry } = useVideoGames();

  // Estado de la interacción
  const [selectedPlatform, setSelectedPlatform] = useState<string>(ALL);
  const [selectedGenre, setSelectedGenre] = useState<string>(ALL);
  const [search, setSearch] = useState<string>('');

  const platforms = useMemo(() => uniqueValues(games, 'Platform'), [games]);
  const genres = useMemo(() => uniqueValues(games, 'Genre'), [games]);
  const filtered = useMemo(
    () => filterGames(games, selectedPlatform, selectedGenre, search),
    [games, selectedPlatform, selectedGenre, search],
  );

  const total = totalSales(filtered);
  const best = topGame(filtered);
  const regions = regionShare(filtered);
  const leader = regions[0];

  const kpis: KPI[] = [
    { title: 'Ventas Totales Globales', value: `${formatMillions(total)} USD`, accentColor: '#2563eb', subtitle: `${filtered.length.toLocaleString()} juegos` },
    { title: 'Promedio de Ventas por Juego', value: `${formatMillions(averageSales(filtered))} USD`, accentColor: '#14b8a6', subtitle: leader ? `Región líder: ${leader.label} (${leader.value.toFixed(1)}%)` : undefined },
    { title: 'Juego Más Vendido', value: best ? `${best.Name} – ${best.Global_Sales.toFixed(2)}M` : '—', accentColor: '#f59e0b', subtitle: best ? `${best.Platform} · ${best.Year}` : undefined },
  ];

  const resetFilters = () => {
    setSelectedPlatform(ALL);
    setSelectedGenre(ALL);
    setSearch('');
  };
  const canReset = selectedPlatform !== ALL || selectedGenre !== ALL || search !== '';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header
        title="Global Video Game Sales & Market Trends Dashboard"
        source={loading ? 'Conectando con Firebase…' : `Firebase · ${games.length.toLocaleString()} registros`}
      />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {loading && (
          <Stack spacing={2} sx={{ py: 10, alignItems: 'center' }}>
            <CircularProgress />
            <Typography color="text.secondary">Cargando registros desde Firebase…</Typography>
          </Stack>
        )}
        {error && (
          <Alert severity="error" action={<Button color="inherit" onClick={retry}>Reintentar</Button>}>
            No se pudieron cargar los datos: {error}
          </Alert>
        )}
        {!loading && !error && (
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
                  search={search}
                  onSearchChange={setSearch}
                  onReset={resetFilters}
                  canReset={canReset}
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
            <Typography variant="caption" color="text.secondary" align="center">
              Fuente: Video Game Sales (Kaggle) · Ventas en millones · ESPOL – Desarrollo de Aplicaciones Web y Móviles · Gianluigi Tamayo y Roy García
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
