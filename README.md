# Proyecto 03 – Dashboard Interactivo: Global Video Game Sales

**ESPOL · FIEC · Desarrollo de Aplicaciones Web y Móviles (SOFG1006)**
Autor: Gianluigi Tamayo Prado

Dashboard interactivo construido con **React + TypeScript (Vite)**, **Material UI** y **Firebase Realtime Database**
sobre el dataset [Video Game Sales (Kaggle)](https://www.kaggle.com/datasets/gregorut/videogamesales).

## Sprint 1 – Transformación de datos CSV a JSON

| Archivo | Descripción |
|---|---|
| `data/vgsales.csv` | Dataset original (16 598 registros) |
| `scripts/csv_to_json.py` | Script de transformación y validación |
| `data/vgsales.json` | Resultado (16 327 registros válidos) listo para Firebase |

### Ejecutar la transformación
Requisitos: Python 3.8+ (solo librería estándar).

```bash
python scripts/csv_to_json.py
```

El script:
1. Lee `data/vgsales.csv` con `csv.DictReader` (UTF-8).
2. Limpia espacios en blanco en las variables categóricas (`Name`, `Platform`, `Genre`, `Publisher`).
3. Reemplaza `Publisher` faltante (`N/A`) por `"Unknown"` (58 casos).
4. Convierte `Year` a entero y agrega `Release_Date` en formato ISO `YYYY-01-01`; descarta los 271 registros sin año.
5. Convierte las ventas (`NA_Sales`, `EU_Sales`, `JP_Sales`, `Other_Sales`, `Global_Sales`) a números con 2 decimales.
6. Escribe `{"videogames": [...]}` en `data/vgsales.json` y valida estructura, claves, tipos y cantidad de registros.

## Sprint 2 – Componentes e interfaces React

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción en dist/
```

Estructura (según el árbol de componentes de la Fase 3):

```
src/
├── Dashboard.tsx            # raíz: estado de filtros (useState) y datos derivados
├── components/
│   ├── Header.tsx
│   ├── FilterBar.tsx  ├── PlatformFilter.tsx  └── GenreFilter.tsx
│   ├── KPISection.tsx └── KPICard.tsx
│   ├── ChartsSection.tsx ├── SalesLineChart.tsx ├── GenreBarChart.tsx ├── PlatformDonutChart.tsx
│   ├── ChartCard.tsx
│   └── SalesTable.tsx
├── data/sampleData.ts       # datos de ejemplo del sprint 2
├── types/VideoGame.ts       # tipos TypeScript
└── utils/metrics.ts         # cálculos de KPIs y agregaciones
```

## Sprint 3 – Conexión de React con Firebase

- **Proyecto Firebase:** `proyecto03-vgsales` · Realtime Database `https://proyecto03-vgsales-default-rtdb.firebaseio.com` (us-central1).
- **Datos:** el arreglo `videogames` de `data/vgsales.json` (16 327 registros) se importó en el nodo `/videogames`.
- **Reglas** (`database.rules.json`): lectura pública solo de `/videogames`, escritura deshabilitada.

| Archivo | Responsabilidad |
|---|---|
| `src/firebase/config.ts` | Inicializa la app de Firebase y exporta la instancia `db` (módulo centralizado). |
| `src/services/videogamesService.ts` | `fetchVideoGames()`: consulta asíncrona `get(ref(db, 'videogames'))` y normaliza el resultado. |
| `src/hooks/useVideoGames.ts` | Hook con `useEffect` (consulta al montar) y `useState` (`games`, `loading`, `error`). |
| `src/Dashboard.tsx` | Usa el hook, muestra carga/error y reemplaza los datos de ejemplo por los de Firebase. |

## Dashboard final

**Sitio publicado:** https://giantama.github.io/proyecto03-dashboard/

Funcionalidades:
- Filtros por **plataforma** y **género**, **búsqueda** por nombre de juego o editora y botón **Limpiar**.
- KPIs calculados sobre los datos filtrados: ventas totales, promedio por juego (con región líder) y juego más vendido.
- Gráficos (MUI X Charts): evolución anual (líneas), ventas por género (barras) y cuota por plataforma (anillo).
- Tabla de detalle con **orden por columna**, **paginación** y scroll horizontal en móvil.
- Estados de **carga** y **error** (con reintento) al consultar Firebase.

Despliegue: el workflow `.github/workflows/deploy.yml` compila el proyecto y publica `dist/` en la rama `gh-pages`
en cada push a `main` (también se puede publicar manualmente con `npm run deploy`).
