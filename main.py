import webbrowser
import uvicorn
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# --- FIX PRO WINDOWS (Verze 2.0 - Neprůstřelná) ---
# Problém: Když není konzole, sys.stdout je None.
# Řešení: Přesměrujeme výstup do "černé díry" systému.
# os.devnull je opravdový souborový objekt, takže to Uvicorn nepozná a nespadne.
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")
# --------------------------------------------------

app = FastAPI()

def get_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

dist_folder = get_path("dist")

@app.get("/api/status")
def get_status():
    return {"status": "running"}

if os.path.exists(dist_folder):
    app.mount("/", StaticFiles(directory=dist_folder, html=True), name="static")

def start():
    webbrowser.open("http://127.0.0.1:8000")
    
    # DEFINICE LOGOVÁNÍ BEZ BAREV
    # Tímto přepíšeme výchozí chování Uvicornu a zakážeme mu sahat na barvy.
    log_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "()": "uvicorn.logging.DefaultFormatter",
                "fmt": "%(levelprefix)s %(message)s",
                "use_colors": False,  # <--- TOTO JE KLÍČOVÉ (Vypneme barvy)
            },
            "access": {
                "()": "uvicorn.logging.AccessFormatter",
                "fmt": '%(levelprefix)s %(client_addr)s - "%(request_line)s" %(status_code)s',
                "use_colors": False,  # <--- TOTO JE KLÍČOVÉ
            },
        },
        "handlers": {
            "default": {
                "formatter": "default",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stderr",
            },
            "access": {
                "formatter": "access",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "uvicorn": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.error": {"level": "INFO"},
            "uvicorn.access": {"handlers": ["access"], "level": "INFO", "propagate": False},
        },
    }

    # Spustíme server s naší bezpečnou konfigurací
    uvicorn.run(app, host="127.0.0.1", port=8000, log_config=log_config)

if __name__ == "__main__":
    start()