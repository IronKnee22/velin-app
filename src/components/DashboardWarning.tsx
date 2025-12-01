import { AlertTriangle, CheckCircle2 } from "lucide-react";

const soldiers = [
    "SOLDIER ALPHA",
    "SOLDIER BETA",
    "SOLDIER BLACK",
    "SOLDIER DELTA",
    "SOLDIER SIGMA",
];

export function DashboardWarning() {
    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="mb-12 text-neutral-400 tracking-wider">
                    COMMAND CENTER
                </h1>

                <div className="space-y-6">
                    {soldiers.map((soldier) => (
                        <div key={soldier}>
                            <div
                                className={`flex items-center justify-between p-6 border ${soldier === "SOLDIER DELTA"
                                        ? "border-yellow-500 bg-yellow-950/20"
                                        : "border-neutral-800 bg-neutral-950"
                                    }`}
                            >
                                {/* 1. Jméno vojáka */}
                                <span className="tracking-wider flex-shrink-0">
                                    {soldier}
                                </span>

                                {/* 2. Varovné detaily */}
                                {soldier === "SOLDIER DELTA" && (
                                    <div className="flex items-center gap-6 text-yellow-500 text-sm ml-12">
                                        <span className="flex items-center gap-1">
                                            <span className="text-neutral-400">
                                                SRDEČNÍ TEP:
                                            </span>
                                            130 bpm
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="text-neutral-400">
                                                STRES:
                                            </span>
                                            Vysoký
                                        </span>
                                    </div>
                                )}

                                {/* 3. Ikona statusu */}
                                {soldier === "SOLDIER DELTA" ? (
                                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-auto" />
                                ) : (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 ml-auto" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}