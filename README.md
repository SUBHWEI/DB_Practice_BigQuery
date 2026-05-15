# 🌳 Parques Biosaludables Ibagué - Dashboard

Dashboard interactivo para visualizar y analizar los **561 parques biosaludables** de Ibagué, conectado a **BigQuery** mediante una API en **FastAPI**.

## 🔗 Links

- **Dashboard:** [db-practice-big-query.vercel.app](https://db-practice-big-query.vercel.app/)
- **Backend API:** [parques-backend.onrender.com](https://parques-backend.onrender.com/)

## 🖥️ Tecnologías

- **Frontend:** React + Vite + Recharts
- **Backend:** FastAPI (Python)
- **Base de datos:** Google BigQuery
- **Despliegue:** Vercel (frontend) + Render (backend)

## 📊 Funcionalidades

- KPIs: total de parques, comunas y tipos de lugar
- Gráfico de barras: parques por comuna (click para filtrar)
- Gráfico de donut: parques por barrio/ubicación
- Tabla paginada con todos los registros
- Filtros: búsqueda textual, por comuna y por barrio

## 🚀 Desarrollo local

```bash
# Backend
cd parques-backend
.\venv\Scripts\Activate
uvicorn main:app --reload

# Frontend (otra terminal)
cd parques-frontend
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)
