# Plan del Dashboard - Parques Biosaludables Ibagué

## Objetivo
Dashboard web para visualizar los 561 parques biosaludables de Ibagué, consumiendo datos desde una API FastAPI conectada a BigQuery.

## Backend (ya existe, NO modificar)
- FastAPI corriendo en `http://localhost:8000`
- Endpoints:
  - `GET /parques` → todos los registros
  - `GET /parques/resumen` → KPIs (total parques, comunas, tipos)
  - `GET /parques/por-comuna` → conteo por comuna (barras)
  - `GET /parques/por-tipo` → conteo por tipo (torta)
  - `GET /parques/comuna/{n}` → filtro por comuna
  - `GET /parques/buscar/{texto}` → búsqueda textual

## Frontend (React + Vite)

### Estructura de componentes
```
src/
├── App.jsx           → Layout principal, orquestador
├── api.js            → Llamadas a la API (configurables por env)
├── components/
│   ├── KPICards.jsx   → 3 tarjetas: total parques, comunas, tipos
│   ├── BarChart.jsx   → Barras: parques por comuna
│   ├── PieChart.jsx   → Torta/donut: parques por tipo
│   ├── DataTable.jsx  → Tabla con todos los registros (filtratable)
│   ├── Filters.jsx    → Filtros: comuna, tipo, búsqueda
│   └── Header.jsx     → Título y descripción
└── index.css          → Estilos globales
```

### Funcionalidades
1. **KPIs** - 3 tarjetas con totales (parques, comunas, tipos)
2. **Gráfico de barras** - Parques por comuna, interactivo (click filtra)
3. **Gráfico de donut** - Parques por tipo de identificación
4. **Tabla** - Todos los registros con paginación
5. **Filtros** - Por comuna, tipo de lugar, y búsqueda por texto
6. **Responsive** - Diseño adaptable a móvil/tablet/desktop

### Librerías
- `react` + `react-dom` (v19)
- `recharts` → gráficos
- `vite` → build tool

### Despliegue (Vercel)
- Build command: `npm run build`
- Output dir: `dist`
- Env var: `VITE_API_URL` → apunta al backend en producción
