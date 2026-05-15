import os
import json
import tempfile
from pathlib import Path

# credenciales de google cloud
creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
if creds_json:
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
    tmp.write(creds_json)
    tmp.close()
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
else:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(
        Path(__file__).with_name("parques-ibague-693b0648a77b.json")
    )

_client = None
_TABLA = None

def _get_client():
    global _client
    if _client is None:
        from google.cloud import bigquery
        _client = bigquery.Client()
    return _client

def _get_tabla():
    global _TABLA
    if _TABLA is None:
        c = _get_client()
        _TABLA = f"`{c.project}.PARQUES.PARQUES_BIOSALUDABLES`"
    return _TABLA

# --- consultas ---

def get_todos_los_parques():
    query = f"SELECT * FROM {_get_tabla()} ORDER BY ID"
    rows = _get_client().query(query)
    return [dict(row) for row in rows]

def get_parques_por_comuna():
    query = f"""
        SELECT COMUNA, COUNT(*) AS total_parques
        FROM {_get_tabla()}
        GROUP BY COMUNA ORDER BY COMUNA ASC
    """
    rows = _get_client().query(query)
    return [dict(row) for row in rows]

def get_resumen():
    query = f"""
        SELECT COUNT(*) AS total_parques,
               COUNT(DISTINCT COMUNA) AS total_comunas,
               COUNT(DISTINCT `IDENTIFICACION LUGAR`) AS total_tipos
        FROM {_get_tabla()}
    """
    rows = list(_get_client().query(query))
    return dict(rows[0])

def get_parques_por_tipo():
    query = f"""
        SELECT `IDENTIFICACION LUGAR` AS tipo, COUNT(*) AS total
        FROM {_get_tabla()}
        GROUP BY tipo ORDER BY total DESC
    """
    rows = _get_client().query(query)
    return [dict(row) for row in rows]

def get_parques_de_comuna(numero_comuna: int):
    query = f"""
        SELECT * FROM {_get_tabla()}
        WHERE COMUNA = {numero_comuna} ORDER BY ID
    """
    rows = _get_client().query(query)
    return [dict(row) for row in rows]

def buscar_parques(texto: str):
    texto_safe = texto.replace("'", "''")
    query = f"""
        SELECT * FROM {_get_tabla()}
        WHERE LOWER(DIRECCION) LIKE LOWER('%{texto_safe}%')
           OR LOWER(`UBICACIÓN`) LIKE LOWER('%{texto_safe}%')
        ORDER BY ID
    """
    rows = _get_client().query(query)
    return [dict(row) for row in rows]
