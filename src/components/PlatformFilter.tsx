import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ALL } from '../utils/metrics';

interface PlatformFilterProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

/** Selector de plataforma: notifica el cambio al Dashboard mediante el callback. */
export default function PlatformFilter({ platforms, selectedPlatform, onPlatformChange }: PlatformFilterProps) {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="platform-label">Plataforma</InputLabel>
      <Select
        labelId="platform-label"
        label="Plataforma"
        value={selectedPlatform}
        onChange={(e) => onPlatformChange(e.target.value)}
      >
        <MenuItem value={ALL}>Todas las plataformas</MenuItem>
        {platforms.map((p) => (
          <MenuItem key={p} value={p}>{p}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
