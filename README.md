# 🛡️ Virtuální Velín (Command Center)

Interaktivní monitorovací systém pro sledování stavu taktických jednotek v reálném čase. Aplikace simuluje biometrická data, stavy vest a detekci pádu.

## 📥 Ke stažení (Download)

Nemusíte nic instalovat. Stáhněte si hotovou aplikaci pro váš systém přímo zde:

👉 **[STÁHNOUT NEJNOVĚJŠÍ VERZI (Releases)](../../releases/latest)** 👈

- **Windows:** Stáhněte soubor `Velin-Windows.exe` a spusťte.
- **Linux:** Stáhněte soubor `Velin-Linux` (před spuštěním povolte práva: `chmod +x Velin-Linux`).

---

## 🎮 Ovládání

Aplikace je navržena pro rychlé ovládání klávesnicí bez nutnosti myši.

### 🟡 Varování (Warning Level)
Zobrazí zvýšený stres a tepovou frekvenci přímo v seznamu.
* **Q** — Soldier Alpha
* **W** — Soldier Beta
* **E** — Soldier Black
* **R** — Soldier Delta
* **T** — Soldier Sigma

### 🔴 Kritický Poplach (Critical Alert)
Otevře detailní "Mřížku smrti" se zobrazením zásahů do vesty a detekcí pádu.
* **A** — Soldier Alpha
* **S** — Soldier Beta
* **D** — Soldier Black
* **F** — Soldier Delta
* **G** — Soldier Sigma

### 🔄 Reset
* **ESC** — Okamžitě zruší všechny poplachy a vrátí systém do normálu.

---

## 🛠️ Použité technologie

Projekt kombinuje moderní webový frontend se stabilním Python backendem, zabaleným do jedné spustitelné aplikace.

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Python, FastAPI
* **Balíčkování:** PyInstaller (automatický build přes GitHub Actions)
