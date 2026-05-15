export default function KPICards({ resumen }) {
  if (!resumen) return null

  const cards = [
    {
      label: 'Parques',
      value: resumen.total_parques,
      icon: '🌳',
      desc: 'Espacios activos en toda la red urbana.',
    },
    {
      label: 'Comunas',
      value: resumen.total_comunas,
      icon: '📍',
      desc: 'Territorios con cobertura biosaludable.',
    },
    {
      label: 'Tipos de lugar',
      value: resumen.total_tipos,
      icon: '🏷️',
      desc: 'Áreas especializadas para el ejercicio.',
    },
  ]

  return (
    <div className="kpi-grid">
      {cards.map((c) => (
        <div key={c.label} className="kpi-card">
          <span className="kpi-icon-bg">{c.icon}</span>
          <div className="kpi-body">
            <p className="kpi-value">{c.value}</p>
            <p className="kpi-label">{c.label}</p>
            <p className="kpi-desc">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
