import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import KPICards from './components/KPICards'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import Filters from './components/Filters'
import DataTable from './components/DataTable'
import {
  fetchTodosLosParques,
  fetchResumen,
  fetchPorComuna,
  groupByUbicacion,
  uniqueUbicaciones,
} from './api'

export default function App() {
  // estado del dashboard
  const [allParques, setAllParques] = useState([])
  const [parques, setParques] = useState([])
  const [resumen, setResumen] = useState(null)
  const [porComuna, setPorComuna] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const porUbicacion = useMemo(() => groupByUbicacion(allParques), [allParques])
  const ubicaciones = useMemo(() => uniqueUbicaciones(allParques), [allParques])

  // carga los datos cuando se abre la página
  useEffect(() => {
    async function load() {
      try {
        const [p, r, c] = await Promise.all([
          fetchTodosLosParques(),
          fetchResumen(),
          fetchPorComuna(),
        ])
        setAllParques(p)
        setParques(p)
        setResumen(r)
        setPorComuna(c)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function handleFilter(data) {
    setParques(data)
  }

  // cuando dan click en una barra del gráfico
  function handleComunaClick(numero) {
    const filtrados = allParques.filter((p) => p.COMUNA === numero)
    setParques(filtrados)
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <p className="loading">Cargando datos desde BigQuery…</p>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <main className="main">
          <p className="error">Error: {error}</p>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />

      <main className="main">
        {/* indicadores principales */}
        <KPICards resumen={resumen} />

        {/* gráficos */}
        <div className="charts-grid">
          <BarChart data={porComuna} onComunaClick={handleComunaClick} />
          <PieChart data={porUbicacion} />
        </div>

        {/* tabla con filtros */}
        <section className="section">
          <h2>Explorar datos</h2>
          <Filters
            comunaData={porComuna}
            ubicaciones={ubicaciones}
            onFilter={handleFilter}
          />
          <DataTable data={parques} />
        </section>

        <footer className="footer">
          Transformando el espacio público en salud para todos los ibaguereños.
        </footer>
      </main>
    </div>
  )
}
