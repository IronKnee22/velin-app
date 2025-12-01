import { Activity, AlertTriangle, BrainCircuit, MoveDown, Skull } from "lucide-react";

const SOLDIERS = ["ALPHA", "BETA", "BLACK", "DELTA", "SIGMA"];

// Komponenta pro malou vestu (Ještě menší verze)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MiniVest = ({ label, hits }: { label: string, hits: any }) => (
    // Změna aspect ratio na [3/4] (nižší), menší margin bottom (mb-1)
    <div className="w-full aspect-[4/4] border-2 border-red-900 bg-red-950/30 rounded flex flex-col mb-1 relative overflow-hidden shadow-sm">
        {/* Menší text v hlavičce a menší padding */}
        <div className="text-center bg-red-900/50 text-[8px] font-bold py-0.5 uppercase text-red-300 leading-none">
            {label}
        </div>
        {/* Menší padding (p-0.5) a menší mezery (gap-0.5) uvnitř mřížky */}
        <div className="grid grid-cols-2 grid-rows-2 flex-grow p-0.5 gap-0.5">
            {["TL", "TR", "BL", "BR"].map(q => {
                const isHit = hits[q];
                return (
                    <div
                        key={q}
                        className={`border border-red-800/30 rounded flex items-center justify-center relative ${isHit ? 'bg-red-900/40' : 'bg-transparent'}`}
                    >
                        {/* Menší písmo pro označení kvadrantu */}
                        <span className="text-[8px] text-red-800/50 font-mono z-0 leading-none">{q}</span>
                        {isHit && (
                            <>
                                {/* O trochu menší tečka */}
                                <div className="absolute w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7] z-10 border border-white/50"></div>
                                <div className="absolute w-full h-full bg-red-500/20 animate-pulse rounded"></div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    </div>
);

interface Props {
    alertStates: boolean[];
    warningStates: boolean[];
}

export function DashboardAlert({ alertStates, warningStates }: Props) {
    return (
        <div className="fixed inset-0 z-50 p-2 bg-black/85 backdrop-blur-md flex flex-col">
            <div className="grid grid-cols-5 gap-2 h-full pb-8">

                {SOLDIERS.map((name, index) => {
                    const isCritical = alertStates[index];
                    const isWarning = warningStates[index];

                    // Simulace pádu (jen u sudých)
                    const isFallDetected = (index % 2 === 0);

                    // Stylizace
                    let borderClass = "border-neutral-900";
                    let bgClass = "bg-neutral-950/80";
                    let opacityClass = "opacity-40 scale-95";
                    let headerClass = "bg-neutral-900 text-neutral-600 border-neutral-800";

                    if (isCritical) {
                        borderClass = "border-red-600";
                        bgClass = "bg-black shadow-[0_0_30px_rgba(220,38,38,0.4)]";
                        opacityClass = "opacity-100 scale-100";
                        headerClass = "bg-red-600 text-white border-red-600";
                    } else if (isWarning) {
                        borderClass = "border-yellow-500";
                        bgClass = "bg-yellow-950/20";
                        opacityClass = "opacity-100 scale-100";
                        headerClass = "bg-yellow-600 text-black border-yellow-500";
                    }

                    const isTorsoHit = (index + 1) % 2 === 0;
                    const activeHits = { TL: true, TR: false, BL: isTorsoHit, BR: false };

                    return (
                        <div
                            key={name}
                            className={`relative h-full border transition-all duration-300 flex flex-col overflow-hidden ${borderClass} ${bgClass} ${opacityClass}`}
                        >
                            <div className={`py-2 text-center border-b font-black tracking-widest text-lg ${headerClass}`}>
                                {name}
                            </div>

                            <div className="p-2 flex flex-col h-full relative">

                                {/* --- STAV 1: CRITICAL --- */}
                                {isCritical && (
                                    <>
                                        <div className="absolute inset-0 bg-red-900/5 animate-pulse pointer-events-none"></div>

                                        {/* FALL DETECTED */}
                                        {isFallDetected ? (
                                            <div className="text-center mb-4 mt-4 animate-pulse">
                                                <MoveDown className="w-10 h-10 text-orange-500 mx-auto mb-1" />
                                                <div className="text-xl font-black text-orange-500 tracking-tighter leading-none">
                                                    FALL
                                                </div>
                                                <div className="text-xl font-black text-orange-500 tracking-tighter leading-none">
                                                    DETECTED
                                                </div>
                                            </div>
                                        ) : (
                                            // Větší mezera, pokud nespadl, aby to bylo vyvážené
                                            <div className="mt-12"></div>
                                        )}

                                        {/* Kontejner pro vesty - přidán padding po stranách (px-4) a menší mezera (gap-0.5) */}
                                        <div className="flex-grow flex flex-col justify-center gap-0.5 px-4">
                                            <MiniVest label="FRONT PLATE" hits={activeHits} />
                                            <MiniVest label="BACK PLATE" hits={{ TL: false, TR: true, BL: false, BR: false }} />
                                        </div>

                                        <div className="mt-auto border-t border-red-800 pt-2 text-center">
                                            <div className="flex items-center justify-center gap-2 text-white font-bold bg-red-600 py-1 px-2 rounded text-xs">
                                                <Skull className="w-3 h-3" />
                                                <span>EVAC REQUIRED</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* --- STAV 2: WARNING --- */}
                                {!isCritical && isWarning && (
                                    <>
                                        <div className="text-center mb-6 mt-4">
                                            <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                                            <div className="text-xl font-bold text-yellow-500">WARNING</div>
                                        </div>

                                        <div className="space-y-4 flex-grow px-2">
                                            <div className="bg-yellow-900/20 border border-yellow-600/30 p-2 rounded text-center">
                                                <div className="flex justify-center text-yellow-500 mb-1"><Activity className="w-5 h-5" /></div>
                                                <div className="text-2xl font-mono font-bold text-yellow-400">145</div>
                                                <div className="text-[10px] text-yellow-600 uppercase">BPM</div>
                                            </div>
                                            <div className="bg-yellow-900/20 border border-yellow-600/30 p-2 rounded text-center">
                                                <div className="flex justify-center text-orange-500 mb-1"><BrainCircuit className="w-5 h-5" /></div>
                                                <div className="text-lg font-mono font-bold text-orange-400">HIGH</div>
                                                <div className="text-[10px] text-orange-600 uppercase">STRESS</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* --- STAV 3: IDLE --- */}
                                {!isCritical && !isWarning && (
                                    <div className="flex items-center justify-center h-full text-neutral-800 font-mono text-xs rotate-90 opacity-50">
                                        NO SIGNAL
                                    </div>
                                )}

                            </div>
                        </div>
                    );
                })}

            </div>

            <div className="absolute bottom-2 left-0 w-full text-center pointer-events-none">
                <span className="bg-black/90 text-neutral-500 px-4 py-1 rounded border border-neutral-800 text-[10px] font-mono">
                    CRITICAL: [A-S-D-F-G] &nbsp;|&nbsp; WARNING: [Q-W-E-R-T] &nbsp;|&nbsp; ESC: RESET
                </span>
            </div>
        </div>
    );
}