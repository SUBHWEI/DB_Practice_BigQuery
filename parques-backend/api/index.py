import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from asgiref.wsgi import AsgiToWsgi
from main import app

handler = AsgiToWsgi(app)
