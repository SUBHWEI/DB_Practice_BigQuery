import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'

// colores para cada barra
const COLORS = [
  '#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6',
  '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b',
  '#2980b9', '#27ae60', '#8e44ad',
]

export default function BarChart({ data, onComunaClick }) {
  if (!data || data.length === 0) return <p className="loading">Cargando gráfico...</p>

  return (
    <div className="chart-container">
      <h3>Parques por Comuna</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsBar data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="COMUNA"
            label={{ value: 'Comuna', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 13 }}
          />
          <YAxis
            label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            formatter={(value, _name) => [`${value} parques`, 'Cantidad']}
            labelFormatter={(label) => `Comuna ${label}`}
          />
          <Bar
            dataKey="total_parques"
            cursor="pointer"
            onClick={(entry) => onComunaClick?.(entry.COMUNA)}
            radius={[6, 6, 0, 0]}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </RechartsBar>
      </ResponsiveContainer>
      <p className="chart-hint">Haz clic en una barra para filtrar por esa comuna</p>
    </div>
  )
}
