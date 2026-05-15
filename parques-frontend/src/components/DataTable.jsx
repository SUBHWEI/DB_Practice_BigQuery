import { useState, useMemo } from 'react'

const PAGE_SIZE = 20

export default function DataTable({ data }) {
  const [page, setPage] = useState(1)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data?.length || 0) / PAGE_SIZE)),
    [data]
  )

  const pageData = useMemo(() => {
    if (!data) return []
    const start = (page - 1) * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, page])

  // Reset page when data changes
  useMemo(() => {
    if (data && page > Math.ceil(data.length / PAGE_SIZE)) {
      setPage(1)
    }
  }, [data, page])

  if (!data || data.length === 0) {
    return <p className="loading">No hay datos para mostrar.</p>
  }

  const columns = ['ID', 'IDENTIFICACIÓN LUGAR', 'DIRECCIÓN', 'UBICACIÓN', 'COMUNA']

  return (
    <div className="table-wrapper">
      <h3>Registros ({data.length})</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={row.ID || i}>
                <td>{row.ID}</td>
                <td>{row['IDENTIFICACION LUGAR']}</td>
                <td>{row['DIRECCION']}</td>
                <td>{row['UBICACIÓN'] || row['UBICACION'] || '-'}</td>
                <td>{row['COMUNA']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="btn btn-secondary btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
