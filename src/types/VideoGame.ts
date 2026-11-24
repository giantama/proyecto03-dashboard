/** Estructura de un registro del dataset Video Game Sales (vgsales.json). */
export interface VideoGame {
  id: number;
  Rank: number;
  Name: string;
  Platform: string;
  Genre: string;
  Publisher: string;
  Year: number;
  Release_Date: string;
  NA_Sales: number;
  EU_Sales: number;
  JP_Sales: number;
  Other_Sales: number;
  Global_Sales: number;
}

/** Punto de la serie temporal (año / ventas globales). */
export interface YearSales {
  year: number;
  sales: number;
}

/** Ventas acumuladas por categoría (género o plataforma). */
export interface CategorySales {
  label: string;
  value: number;
}

/** Configuración de una columna de la tabla reutilizable. */
export interface TableColumn {
  header: string;
  key: keyof VideoGame;
  align?: 'left' | 'right';
  format?: (value: VideoGame[keyof VideoGame]) => string;
}
