import { useCallback, useEffect, useState } from 'react';
import { fetchVideoGames } from '../services/videogamesService';
import type { VideoGame } from '../types/VideoGame';

/**
 * Hook personalizado: ejecuta la consulta a Firebase al montar el componente (useEffect)
 * y guarda registros, estado de carga y error (useState).
 */
export function useVideoGames() {
  const [games, setGames] = useState<VideoGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si el componente se desmonta
    setLoading(true);
    setError(null);

    fetchVideoGames()
      .then((data) => {
        if (!cancelled) setGames(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al consultar Firebase');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]); // solo se ejecuta al cargar y cuando el usuario pide reintentar

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);

  return { games, loading, error, retry };
}
