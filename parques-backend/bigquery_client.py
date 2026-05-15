import os
from pathlib import Path
from google.cloud import bigquery

# credenciales: si está el json lo usa, si no (cloud run) usa adc
creds_path = Path(__file__).with_name("parques-ibague-693b0648a77b.json")
if creds_path.exists():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(creds_path)

client = bigquery.Client()
PROJECT = client.project
DATASET = "PARQUES"
TABLE   = "PARQUES_BIOSALUDABLES"
TABLA = f"`{PROJECT}.{DATASET}.{TABLE}`"

def get_todos_los_parques():
    """Retorna todos los registros de la tabla."""
    query = f"SELECT * FROM {TABLA} ORDER BY ID"
    rows = client.query(query)
    return [dict(row) for row in rows]


def get_parques_por_comuna():
    """Cuenta cuántos parques hay en cada comuna."""
    query = f"""
        SELECT
            COMUNA,
            COUNT(*) AS total_parques
        FROM {TABLA}
        GROUP BY COMUNA
        ORDER BY COMUNA ASC
    """
    rows = client.query(query)
    return [dict(row) for row in rows]


def get_resumen():
    """Totales globales para las tarjetas KPI del dashboard."""
    query = f"""
        SELECT
            COUNT(*)                              AS total_parques,
            COUNT(DISTINCT COMUNA)                AS total_comunas,
            COUNT(DISTINCT `IDENTIFICACION LUGAR`) AS total_tipos
        FROM {TABLA}
    """
    rows = list(client.query(query))
    return dict(rows[0])


def get_parques_por_tipo():
    """Agrupa por tipo de identificación de lugar."""
    query = f"""
        SELECT
            `IDENTIFICACION LUGAR` AS tipo,
            COUNT(*) AS total
        FROM {TABLA}
        GROUP BY tipo
        ORDER BY total DESC
    """
    rows = client.query(query)
    return [dict(row) for row in rows]


def get_parques_de_comuna(numero_comuna: int):
    """Filtra todos los parques de una comuna específica."""
    query = f"""
        SELECT *
        FROM {TABLA}
        WHERE COMUNA = {numero_comuna}
        ORDER BY ID
    """
    rows = client.query(query)
    return [dict(row) for row in rows]


def buscar_parques(texto: str):
    """Búsqueda por texto en DIRECCION o UBICACIÓN."""
    texto_safe = texto.replace("'", "''")   # evita SQL injection básico
    query = f"""
        SELECT *
        FROM {TABLA}
        WHERE
            LOWER(DIRECCION)  LIKE LOWER('%{texto_safe}%')
            OR LOWER(`UBICACIÓN`) LIKE LOWER('%{texto_safe}%')
        ORDER BY ID
    """
    rows = client.query(query)
    return [dict(row) for row in rows]
