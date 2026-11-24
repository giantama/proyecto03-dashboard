import { Button, Paper, Stack, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlatformFilter from './PlatformFilter';
import GenreFilter from './GenreFilter';
import SearchFilter from './SearchFilter';

interface FilterBarProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  canReset: boolean;
}

/** Contenedor de filtros: en escritorio los selectores van en fila y en móvil en columna. */
export default function FilterBar(props: FilterBarProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="overline" color="text.secondary">Filtros</Typography>
        <Button size="small" startIcon={<RestartAltIcon />} onClick={props.onReset} disabled={!props.canReset}>
          Limpiar
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <PlatformFilter platforms={props.platforms} selectedPlatform={props.selectedPlatform} onPlatformChange={props.onPlatformChange} />
          <GenreFilter genres={props.genres} selectedGenre={props.selectedGenre} onGenreChange={props.onGenreChange} />
        </Stack>
        <SearchFilter value={props.search} onSearchChange={props.onSearchChange} />
      </Stack>
    </Paper>
  );
}
