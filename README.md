# Proyecto 03 – Dashboard Interactivo: Global Video Game Sales

**ESPOL · FIEC · Desarrollo de Aplicaciones Web y Móviles (SOFG1006)**
Integrantes: Gianluigi Tamayo – Roy García

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
