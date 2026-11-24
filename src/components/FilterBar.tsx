import { Paper, Stack, Typography } from '@mui/material';
import PlatformFilter from './PlatformFilter';
import GenreFilter from './GenreFilter';

interface FilterBarProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

/** Contenedor de filtros: en escritorio los selectores van en fila y en móvil en columna. */
export default function FilterBar(props: FilterBarProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="overline" color="text.secondary">Filtros</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
        <PlatformFilter
          platforms={props.platforms}
          selectedPlatform={props.selectedPlatform}
          onPlatformChange={props.onPlatformChange}
        />
        <GenreFilter genres={props.genres} selectedGenre={props.selectedGenre} onGenreChange={props.onGenreChange} />
      </Stack>
    </Paper>
  );
}
