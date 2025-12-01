import webbrowser
import uvicorn
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Vytvoření aplikace
app = FastAPI()

# Zjištění cesty k souborům (důležité pro budoucí .exe)
def get_path(relative_path):
    try:
        # PyInstaller vytváří dočasnou složku _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

# Cesta k React "dist" složce
dist_folder = get_path("dist")

# Zkontrolujeme, jestli dist existuje (pro jistotu)
if not os.path.exists(dist_folder):
    print(f"CHYBA: Složka 'dist' nebyla nalezena na cestě: {dist_folder}")
    print("Ujisti se, že jsi spustil 'npm run build'")

# 1. API Endpointy (pokud bys chtěl v budoucnu komunikovat s Pythonem)
@app.get("/api/status")
def get_status():
    return {"status": "running", "backend": "python"}

# 2. Servírování React aplikace
# Všechny ostatní soubory (CSS, JS, obrázky) najde ve složce dist
app.mount("/", StaticFiles(directory=dist_folder, html=True), name="static")

# Funkce pro spuštění
def start():
    # Otevře prohlížeč po startu serveru
    # (Malé zpoždění není potřeba, uvicorn startuje rychle)
    webbrowser.open("http://127.0.0.1:8000")
    
    # Spustí server
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")

if __name__ == "__main__":
    start()