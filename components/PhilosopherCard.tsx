import { Philosopher } from "@/lib/philosopherFramework";

interface PhilosopherCardProps {
  philosopher: Philosopher;
}

export function PhilosopherCard({ philosopher }: PhilosopherCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold text-gray-900 text-sm">{philosopher.name}</h3>
        <span className="text-xs text-gray-400 whitespace-nowrap">{philosopher.country}</span>
      </div>
      <p className="text-xs text-accent font-medium mb-2">{philosopher.auditFunction}</p>
      <div className="flex flex-wrap gap-1">
        {philosopher.keyConcepts.slice(0, 4).map(concept => (
          <span key={concept} className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
}
