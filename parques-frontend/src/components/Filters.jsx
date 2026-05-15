import { useState } from 'react'
import { fetchBuscarParques, fetchParquesDeComuna, fetchTodosLosParques } from '../api'

// agarra la ubicación del parque, con o sin acento
const UBICACION_KEY = (p) => p['UBICACIÓN'] || p['UBICACION'] || 'Sin ubicación'

export default function Filters({ comunaData, ubicaciones, onFilter }) {
  const [searchText, setSearchText] = useState('')
  const [selectedComuna, setSelectedComuna] = useState('')
  const [selectedUbicacion, setSelectedUbicacion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    applyFilters()
  }

  async function applyFilters() {
    setLoading(true)
    setError('')
    try {
      if (searchText.trim()) {
        const data = await fetchBuscarParques(searchText)
        onFilter(data)
      } else if (selectedComuna) {
        const data = await fetchParquesDeComuna(Number(selectedComuna))
        onFilter(data)
      } else if (selectedUbicacion) {
        const all = await fetchTodosLosParques()
        const filtered = all.filter(
          (p) => UBICACION_KEY(p) === selectedUbicacion
        )
        onFilter(filtered)
      } else {
        const all = await fetchTodosLosParques()
        onFilter(all)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setSearchText('')
    setSelectedComuna('')
    setSelectedUbicacion('')
    setLoading(true)
    fetchTodosLosParques()
      .then((data) => onFilter(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className="filters">
      <form onSubmit={handleSearch} className="filter-row">
        <input
          type="text"
          placeholder="Buscar por dirección o ubicación…"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '…' : 'Buscar'}
        </button>
      </form>

      <div className="filter-row">
        <select
          value={selectedComuna}
          onChange={(e) => {
            setSelectedComuna(e.target.value)
            setSearchText('')
            setSelectedUbicacion('')
          }}
          className="filter-select"
        >
          <option value="">Todas las comunas</option>
          {comunaData?.map((c) => (
            <option key={c.COMUNA} value={c.COMUNA}>
              Comuna {c.COMUNA} ({c.total_parques})
            </option>
          ))}
        </select>

        <select
          value={selectedUbicacion}
          onChange={(e) => {
            setSelectedUbicacion(e.target.value)
            setSearchText('')
            setSelectedComuna('')
          }}
          className="filter-select"
        >
          <option value="">Todos los barrios</option>
          {ubicaciones?.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
        >
          Limpiar filtros
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  )
}
