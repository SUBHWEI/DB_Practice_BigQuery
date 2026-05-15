import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = [
  '#2d6a4f', '#52b788', '#95d5b2', '#1b4332', '#40916c',
  '#b7e4c7', '#1a3c34', '#74c69d', '#3a7d5c', '#4a9c7a',
  '#6abf8e', '#8fccaa', '#d8f3dc', '#a3d9b2', '#2b5543',
]

export default function PieChart({ data }) {
  if (!data || data.length === 0) return <p className="loading">Cargando gráfico...</p>

  return (
    <div className="chart-container">
      <p className="chart-context">Densidad por Barrios</p>
      <h3>Identificando los núcleos con mayor oferta recreativa</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsPie>
          <Pie
            data={data}
            dataKey="total"
            nameKey="ubicacion"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={3}
            label={({ ubicacion, percent }) =>
              percent > 0.05
                ? `${ubicacion} (${(percent * 100).toFixed(0)}%)`
                : ''
            }
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} parques`, name]}
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  )
}
