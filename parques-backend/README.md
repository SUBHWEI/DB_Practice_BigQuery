# Backend — Parques Biosaludables Ibagué
API REST conectada a Google BigQuery con FastAPI.

## Estructura del proyecto

```
parques-backend/
├── main.py                                    ← API (endpoints)
├── bigquery_client.py                         ← Consultas a BigQuery
├── eco-droplet-477416-f2-366f51337c9d.json   ← Tu llave JSON (NO subir a GitHub)
└── requirements.txt                           ← Dependencias
```

## 1. Instalación

```bash
pip install -r requirements.txt
```

## 2. Verificar la llave JSON

Asegúrate de que el archivo `.json` descargado de Google Cloud esté
en la misma carpeta que `bigquery_client.py` y que el nombre coincida
exactamente con el que está en la línea:

```python
Path(__file__).with_name("eco-droplet-477416-f2-366f51337c9d.json")
```

## 3. Levantar el servidor

```bash
uvicorn main:app --reload --port 8000
```

El servidor queda en: http://localhost:8000

## 4. Endpoints disponibles

| Método | Endpoint                     | Descripción                              |
|--------|------------------------------|------------------------------------------|
| GET    | /                            | Estado del servidor y proyecto BigQuery  |
| GET    | /parques                     | Todos los 561 parques                    |
| GET    | /parques/resumen             | Totales KPI (parques, comunas, tipos)    |
| GET    | /parques/por-comuna          | Conteo agrupado por comuna               |
| GET    | /parques/por-tipo            | Conteo por tipo de lugar                 |
| GET    | /parques/comuna/{numero}     | Parques de una comuna específica (1-13)  |
| GET    | /parques/buscar/{texto}      | Búsqueda por dirección o ubicación       |

## 5. Documentación automática

FastAPI genera documentación interactiva en:
- http://localhost:8000/docs  (Swagger UI)
- http://localhost:8000/redoc

## 6. Ejemplo de uso desde React

```javascript
// Tarjetas KPI
fetch("http://localhost:8000/parques/resumen")
  .then(res => res.json())
  .then(data => console.log(data));
// → { total_parques: 561, total_comunas: 13, total_tipos: 1 }

// Gráfico de barras por comuna
fetch("http://localhost:8000/parques/por-comuna")
  .then(res => res.json())
  .then(data => console.log(data));
// → [{ COMUNA: 1, total_parques: 17 }, ...]

// Parques de una comuna
fetch("http://localhost:8000/parques/comuna/7")
  .then(res => res.json())
  .then(data => console.log(data));

// Búsqueda
fetch("http://localhost:8000/parques/buscar/tejar")
  .then(res => res.json())
  .then(data => console.log(data));
```
