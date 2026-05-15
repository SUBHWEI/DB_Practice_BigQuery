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
  fetchParquesDeComuna,
  groupByUbicacion,
  uniqueUbicaciones,
} from './api'

export default function App() {
  const [allParques, setAllParques] = useState([])
  const [parques, setParques] = useState([])
  const [resumen, setResumen] = useState(null)
  const [porComuna, setPorComuna] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const porUbicacion = useMemo(() => groupByUbicacion(allParques), [allParques])
  const ubicaciones = useMemo(() => uniqueUbicaciones(allParques), [allParques])

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

  async function handleComunaClick(numero) {
    try {
      const data = await fetchParquesDeComuna(numero)
      setParques(data)
    } catch (err) {
      setError(err.message)
    }
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
        <KPICards resumen={resumen} />

        <div className="charts-grid">
          <BarChart data={porComuna} onComunaClick={handleComunaClick} />
          <PieChart data={porUbicacion} />
        </div>

        <section className="section">
          <h2>Explorar datos</h2>
          <Filters
            comunaData={porComuna}
            ubicaciones={ubicaciones}
            onFilter={handleFilter}
          />
          <DataTable data={parques} />
        </section>
      </main>
    </div>
  )
}
