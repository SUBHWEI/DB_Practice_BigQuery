import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = [
  '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
  '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b',
  '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#7f8c8d',
]

export default function PieChart({ data }) {
  if (!data || data.length === 0) return <p className="loading">Cargando gráfico...</p>

  return (
    <div className="chart-container">
      <h3>Parques por Ubicación (Barrio)</h3>
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
          <Tooltip formatter={(value, _name) => [`${value} parques`, 'Cantidad']} />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  )
}
