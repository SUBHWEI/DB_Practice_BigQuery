export default function KPICards({ resumen }) {
  if (!resumen) return null

  // tarjetas con los totales del dashboard
  const cards = [
    {
      label: 'Total Parques',
      value: resumen.total_parques,
      icon: '🌳',
      color: '#2ecc71',
    },
    {
      label: 'Comunas',
      value: resumen.total_comunas,
      icon: '📍',
      color: '#3498db',
    },
    {
      label: 'Tipos de Lugar',
      value: resumen.total_tipos,
      icon: '🏷️',
      color: '#f39c12',
    },
  ]

  return (
    <div className="kpi-grid">
      {cards.map((c) => (
        <div key={c.label} className="kpi-card" style={{ borderLeftColor: c.color }}>
          <span className="kpi-icon">{c.icon}</span>
          <div>
            <p className="kpi-label">{c.label}</p>
            <p className="kpi-value" style={{ color: c.color }}>{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
