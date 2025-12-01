import { Activity, AlertTriangle, BrainCircuit, CheckCircle2 } from "lucide-react";

// Seznam vojáků
export const SOLDIERS = [
    "SOLDIER ALPHA", // Index 0 (klávesa Q)
    "SOLDIER BETA",  // Index 1 (klávesa W)
    "SOLDIER BLACK", // Index 2 (klávesa E)
    "SOLDIER DELTA", // Index 3 (klávesa R)
    "SOLDIER SIGMA"  // Index 4 (klávesa T)
];

// Pomocná funkce pro generování náhodných čísel, aby to vypadalo živě
const getRandomStats = (index: number) => {
    // Použijeme index k vytvoření "falešné náhody", aby se čísla neměnila při každém kliknutí
    const baseBpm = 120 + (index * 5);
    return {
        bpm: baseBpm + Math.floor(Math.random() * 10), // 120-170 bpm
        stress: index % 2 === 0 ? "KRITICKÝ" : "VYSOKÝ"
    };
};

interface Props {
    warningStates: boolean[]; // Pole true/false (např. [true, false, false...])
}

export function SmartDashboard({ warningStates }: Props) {
    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="mb-12 text-neutral-400 tracking-wider flex justify-between items-center">
                    <span>COMMAND CENTER</span>
                    <span className="text-xs font-mono text-neutral-600">KEYS: Q-W-E-R-T</span>
                </h1>

                <div className="space-y-4">
                    {SOLDIERS.map((soldier, index) => {
                        // Zjistíme, jestli má tento konkrétní voják varování
                        const isWarning = warningStates[index];
                        const stats = getRandomStats(index);

                        return (
                            <div
                                key={soldier}
                                className={`transition-all duration-300 border-l-4 p-6 flex items-center justify-between ${isWarning
                                        ? "bg-yellow-950/30 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                                        : "bg-neutral-950 border-neutral-800 hover:bg-neutral-900"
                                    }`}
                            >
                                {/* LEVÁ ČÁST: Jméno */}
                                <div className="flex items-center gap-4">
                                    <span className={`font-mono text-sm px-2 py-1 rounded ${isWarning ? 'bg-yellow-500 text-black font-bold' : 'bg-neutral-800 text-neutral-500'}`}>
                                        {index + 1}
                                    </span>
                                    <span className={`tracking-wider font-bold ${isWarning ? 'text-yellow-100' : 'text-neutral-400'}`}>
                                        {soldier}
                                    </span>
                                </div>

                                {/* STŘEDNÍ ČÁST: Data (zobrazí se jen při Warningu) */}
                                {isWarning && (
                                    <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex items-center gap-2 text-yellow-500">
                                            <Activity className="w-4 h-4" />
                                            <span className="text-xs text-neutral-400">TEP:</span>
                                            <span className="font-mono text-lg font-bold">{stats.bpm}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-orange-500">
                                            <BrainCircuit className="w-4 h-4" />
                                            <span className="text-xs text-neutral-400">STRES:</span>
                                            <span className="font-mono text-lg font-bold">{stats.stress}</span>
                                        </div>
                                    </div>
                                )}

                                {/* PRAVÁ ČÁST: Ikona */}
                                <div>
                                    {isWarning ? (
                                        <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
                                            <span className="text-xs font-bold tracking-widest uppercase">WARNING</span>
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-green-900/50">
                                            <span className="text-xs font-bold tracking-widest uppercase text-neutral-800">OK</span>
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}