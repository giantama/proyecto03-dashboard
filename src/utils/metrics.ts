import type { CategorySales, VideoGame, YearSales } from '../types/VideoGame';

export const ALL = 'Todas';

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Valores únicos ordenados de una columna categórica. */
export function uniqueValues(games: VideoGame[], key: 'Platform' | 'Genre'): string[] {
  return Array.from(new Set(games.map((g) => g[key]))).sort();
}

/** Filtra por plataforma, género y texto de búsqueda (opcional). */
export function filterGames(games: VideoGame[], platform: string, genre: string, search = ''): VideoGame[] {
  const q = search.trim().toLowerCase();
  return games.filter(
    (g) =>
      (platform === ALL || g.Platform === platform) &&
      (genre === ALL || g.Genre === genre) &&
      (q === '' || g.Name.toLowerCase().includes(q) || g.Publisher.toLowerCase().includes(q)),
  );
}

export const totalSales = (games: VideoGame[]) => round2(games.reduce((s, g) => s + g.Global_Sales, 0));

export const averageSales = (games: VideoGame[]) => (games.length ? round2(totalSales(games) / games.length) : 0);

export function topGame(games: VideoGame[]): VideoGame | undefined {
  return games.reduce<VideoGame | undefined>((best, g) => (!best || g.Global_Sales > best.Global_Sales ? g : best), undefined);
}

/** Ventas globales agrupadas por año (serie temporal ordenada). */
export function salesByYear(games: VideoGame[]): YearSales[] {
  const map = new Map<number, number>();
  games.forEach((g) => map.set(g.Year, (map.get(g.Year) ?? 0) + g.Global_Sales));
  return Array.from(map, ([year, sales]) => ({ year, sales: round2(sales) })).sort((a, b) => a.year - b.year);
}

/** Ventas por una columna categórica, ordenadas de mayor a menor. */
export function salesBy(games: VideoGame[], key: 'Genre' | 'Platform'): CategorySales[] {
  const map = new Map<string, number>();
  games.forEach((g) => map.set(g[key], (map.get(g[key]) ?? 0) + g.Global_Sales));
  return Array.from(map, ([label, value]) => ({ label, value: round2(value) })).sort((a, b) => b.value - a.value);
}

/** Top N categorías + "Otros" con el resto (para el gráfico de anillo). */
export function topWithOthers(items: CategorySales[], n: number): CategorySales[] {
  if (items.length <= n) return items;
  const rest = items.slice(n).reduce((s, i) => s + i.value, 0);
  return [...items.slice(0, n), { label: 'Otros', value: round2(rest) }];
}

/** Formatea millones: 8920 -> "$8.92B", 0.53 -> "$0.53M". */
export function formatMillions(value: number, currency = true): string {
  const prefix = currency ? '$' : '';
  return value >= 1000 ? `${prefix}${(value / 1000).toFixed(2)}B` : `${prefix}${value.toFixed(2)}M`;
}

/** Participación porcentual de cada región en las ventas, de mayor a menor. */
export function regionShare(games: VideoGame[]): CategorySales[] {
  const sum = (k: 'NA_Sales' | 'EU_Sales' | 'JP_Sales' | 'Other_Sales') => games.reduce((s, g) => s + g[k], 0);
  const parts = [
    { label: 'Norteamérica', value: sum('NA_Sales') },
    { label: 'Europa', value: sum('EU_Sales') },
    { label: 'Japón', value: sum('JP_Sales') },
    { label: 'Otras', value: sum('Other_Sales') },
  ];
  const total = parts.reduce((s, p) => s + p.value, 0);
  return parts.map((p) => ({ label: p.label, value: total ? (p.value / total) * 100 : 0 })).sort((a, b) => b.value - a.value);
}
