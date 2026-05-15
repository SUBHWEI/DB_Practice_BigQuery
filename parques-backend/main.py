from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from bigquery_client import (
    _get_client,
    get_todos_los_parques,
    get_parques_por_comuna,
    get_resumen,
    get_parques_por_tipo,
    get_parques_de_comuna,
    buscar_parques,
)

# configuración de la api
app = FastAPI(
    title="API Parques Biosaludables - Ibagué",
    description="Backend conectado a BigQuery con datos de parques biosaludables",
    version="1.0.0",
)

# para que react se pueda conectar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cambiar en producción
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- endpoints ---

@app.get("/", tags=["Estado"])
def root():
    """Verifica que el servidor esté corriendo y conectado a BigQuery."""
    return {
        "estado": "activo",
        "proyecto_bigquery": _get_client().project,
        "mensaje": "API Parques Biosaludables funcionando correctamente",
    }


@app.get("/parques", tags=["Parques"])
def parques():
    """
    Retorna todos los parques (561 registros).
    Úsalo para la tabla completa del dashboard.
    """
    return get_todos_los_parques()


@app.get("/parques/resumen", tags=["Parques"])
def resumen():
    """
    Retorna totales globales:
    - total_parques
    - total_comunas
    - total_tipos
    Úsalo para las tarjetas KPI del dashboard.
    """
    return get_resumen()


@app.get("/parques/por-comuna", tags=["Parques"])
def por_comuna():
    """
    Retorna el conteo de parques agrupado por número de comuna.
    Úsalo para el gráfico de barras del dashboard.
    Ejemplo de respuesta:
        [{"COMUNA": 1, "total_parques": 17}, ...]
    """
    return get_parques_por_comuna()


@app.get("/parques/por-tipo", tags=["Parques"])
def por_tipo():
    """
    Retorna el conteo agrupado por tipo de identificación de lugar.
    Úsalo para el gráfico de torta/donut del dashboard.
    """
    return get_parques_por_tipo()


@app.get("/parques/comuna/{numero}", tags=["Parques"])
def parques_de_comuna(numero: int):
    """
    Retorna solo los parques de la comuna indicada.
    Ejemplo: /parques/comuna/7  → parques de la comuna 7
    """
    if numero < 1 or numero > 13:
        raise HTTPException(
            status_code=400,
            detail="El número de comuna debe estar entre 1 y 13",
        )
    resultado = get_parques_de_comuna(numero)
    if not resultado:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontraron parques en la comuna {numero}",
        )
    return resultado


@app.get("/parques/buscar/{texto}", tags=["Parques"])
def buscar(texto: str):
    """
    Busca parques por texto en la dirección o ubicación.
    Ejemplo: /parques/buscar/tejar
    """
    resultado = buscar_parques(texto)
    if not resultado:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontraron parques con '{texto}'",
        )
    return resultado
