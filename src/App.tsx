import { useEffect, useState } from "react";
import { DashboardAlert } from "./components/DashboardAlert";
import { SmartDashboard } from "./components/SmartDashboard";

export default function App() {
  // 1. Žluté varování (QWERT)
  const [warnings, setWarnings] = useState<boolean[]>([false, false, false, false, false]);

  // 2. Červené poplachy (ASDFG)
  const [alerts, setAlerts] = useState<boolean[]>([false, false, false, false, false]);

  const toggleIndex = (index: number, setFunction: React.Dispatch<React.SetStateAction<boolean[]>>) => {
    setFunction(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      switch (key) {
        // WARNINGS
        case 'q': toggleIndex(0, setWarnings); break;
        case 'w': toggleIndex(1, setWarnings); break;
        case 'e': toggleIndex(2, setWarnings); break;
        case 'r': toggleIndex(3, setWarnings); break;
        case 't': toggleIndex(4, setWarnings); break;

        // ALERTS
        case 'a': toggleIndex(0, setAlerts); break;
        case 's': toggleIndex(1, setAlerts); break;
        case 'd': toggleIndex(2, setAlerts); break;
        case 'f': toggleIndex(3, setAlerts); break;
        case 'g': toggleIndex(4, setAlerts); break;

        // RESET
        case 'escape':
          setWarnings([false, false, false, false, false]);
          setAlerts([false, false, false, false, false]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Zjistíme, jestli je alespoň jeden červený poplach aktivní -> pak otevřeme mřížku
  const isAnyAlertActive = alerts.some(status => status === true);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">

      {/* Vrstva 1: Základní dashboard */}
      <div className="absolute inset-0">
        <SmartDashboard warningStates={warnings} />
      </div>

      {/* Vrstva 2: Mřížka smrti */}
      {isAnyAlertActive && (
        <div className="absolute inset-0 z-50">
          <DashboardAlert
            alertStates={alerts}
            warningStates={warnings} // <-- TADY JSME PROPOJILI DATA!
          />
        </div>
      )}
    </div>
  );
}