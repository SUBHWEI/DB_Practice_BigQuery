const BASE = import.meta.env.VITE_API_URL || ''

export async function fetchTodosLosParques() {
  const res = await fetch(`${BASE}/parques`)
  if (!res.ok) throw new Error('Error al obtener parques')
  return res.json()
}

export async function fetchResumen() {
  const res = await fetch(`${BASE}/parques/resumen`)
  if (!res.ok) throw new Error('Error al obtener resumen')
  return res.json()
}

export async function fetchPorComuna() {
  const res = await fetch(`${BASE}/parques/por-comuna`)
  if (!res.ok) throw new Error('Error al obtener datos por comuna')
  return res.json()
}

export async function fetchPorTipo() {
  const res = await fetch(`${BASE}/parques/por-tipo`)
  if (!res.ok) throw new Error('Error al obtener datos por tipo')
  return res.json()
}

export async function fetchParquesDeComuna(numero) {
  const res = await fetch(`${BASE}/parques/comuna/${numero}`)
  if (!res.ok) throw new Error(`Error al obtener parques de comuna ${numero}`)
  return res.json()
}

export async function fetchBuscarParques(texto) {
  const res = await fetch(`${BASE}/parques/buscar/${encodeURIComponent(texto)}`)
  if (!res.ok) throw new Error(`Error al buscar "${texto}"`)
  return res.json()
}

export function groupByUbicacion(parques, max = 10) {
  const map = {}
  for (const p of parques) {
    const u = p['UBICACIÓN'] || p['UBICACION'] || 'Sin ubicación'
    map[u] = (map[u] || 0) + 1
  }
  const sorted = Object.entries(map)
    .map(([ubicacion, total]) => ({ ubicacion, total }))
    .sort((a, b) => b.total - a.total)

  if (sorted.length <= max) return sorted

  const top = sorted.slice(0, max)
  const otros = sorted.slice(max).reduce((sum, item) => sum + item.total, 0)
  top.push({ ubicacion: 'Otros', total: otros })
  return top
}

export function uniqueUbicaciones(parques) {
  const set = new Set()
  for (const p of parques) {
    const u = p['UBICACIÓN'] || p['UBICACION'] || 'Sin ubicación'
    if (u) set.add(u)
  }
  return [...set].sort()
}
