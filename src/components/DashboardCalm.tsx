import { CheckCircle2 } from "lucide-react";

const soldiers = [
    "SOLDIER ALPHA",
    "SOLDIER BETA",
    "SOLDIER BLACK",
    "SOLDIER DELTA",
    "SOLDIER SIGMA"
];

export function DashboardCalm() {
    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="mb-12 text-neutral-400 tracking-wider">COMMAND CENTER</h1>

                <div className="space-y-6">
                    {soldiers.map((soldier) => (
                        <div
                            key={soldier}
                            className="flex items-center justify-between p-6 border border-neutral-800 bg-neutral-950"
                        >
                            <span className="tracking-wider">{soldier}</span>
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}