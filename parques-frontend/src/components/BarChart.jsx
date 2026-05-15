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

const COLORS = [
  '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2',
  '#b7e4c7', '#1b4332', '#1a3c34', '#3a7d5c', '#4a9c7a',
  '#6abf8e', '#8fccaa', '#2b5543',
]

export default function BarChart({ data, onComunaClick }) {
  if (!data || data.length === 0) return <p className="loading">Cargando gráfico...</p>

  return (
    <div className="chart-container">
      <p className="chart-context">Distribución Territorial</p>
      <h3>¿Cómo se reparte el bienestar en nuestras comunas?</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsBar data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d8" />
          <XAxis
            dataKey="COMUNA"
            label={{ value: 'Comuna', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 13, fill: '#666' }}
          />
          <YAxis
            label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 13, fill: '#666' }}
          />
          <Tooltip
            formatter={(value) => [`${value} parques`, 'Cantidad']}
            labelFormatter={(label) => `Comuna ${label}`}
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar
            dataKey="total_parques"
            cursor="pointer"
            onClick={(data) => {
              const comuna = data?.payload?.COMUNA ?? data?.COMUNA;
              if (comuna) onComunaClick(comuna);
            }}
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
