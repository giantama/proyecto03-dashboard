import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFilterProps {
  value: string;
  onSearchChange: (value: string) => void;
}

/** Búsqueda por nombre de juego o editora. */
export default function SearchFilter({ value, onSearchChange }: SearchFilterProps) {
  return (
    <TextField
      size="small"
      fullWidth
      label="Buscar juego o editora"
      value={value}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) } }}
    />
  );
}
