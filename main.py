import webbrowser
import uvicorn
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# --- FIX PRO WINDOWS NOCONSOLE ---
# Když nemáme konzoli, sys.stdout a sys.stderr jsou None.
# Cokoliv se pokusí něco vypsat (print, log), tak spadne.
# Vytvoříme "černou díru", kam se to bude sypat, aby to nepadalo.
class NullWriter:
    def write(self, text):
        pass
    def flush(self):
        pass
    def isatty(self):
        return False # Říkáme: "Ne, nejsme terminál, neposílej barvy"

if sys.stdout is None:
    sys.stdout = NullWriter()
if sys.stderr is None:
    sys.stderr = NullWriter()
# ---------------------------------

app = FastAPI()

def get_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

dist_folder = get_path("dist")

# Endpoint pro kontrolu
@app.get("/api/status")
def get_status():
    return {"status": "running"}

if os.path.exists(dist_folder):
    app.mount("/", StaticFiles(directory=dist_folder, html=True), name="static")

def start():
    # Otevře prohlížeč
    webbrowser.open("http://127.0.0.1:8000")
    
    # OPRAVA: log_config=None
    # Tím zakážeme Uvicornu nastavovat si barevné logování, které způsobuje pád
    uvicorn.run(app, host="127.0.0.1", port=8000, log_config=None)

if __name__ == "__main__":
    start()