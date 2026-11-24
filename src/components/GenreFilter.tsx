import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ALL } from '../utils/metrics';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

/** Selector de género: notifica el cambio al Dashboard mediante el callback. */
export default function GenreFilter({ genres, selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="genre-label">Género</InputLabel>
      <Select labelId="genre-label" label="Género" value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
        <MenuItem value={ALL}>Todos los géneros</MenuItem>
        {genres.map((g) => (
          <MenuItem key={g} value={g}>{g}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
