"use client";

import { AuditMode } from "@/lib/auditTypes";

const MODES: { value: AuditMode; label: string; description: string }[] = [
  { value: "quick", label: "Quick Audit", description: "For SNS posts, headlines, and short claims" },
  { value: "deep", label: "Deep Audit", description: "For essays, long arguments, and AI outputs" },
  { value: "ddat", label: "DDAT Audit", description: "Philosophical and institutional direction audit" },
  { value: "rewrite", label: "Neutral Rewrite", description: "Rewrite into a clearer, more defensible form" },
  { value: "reply", label: "Calm Reply", description: "Generate a calm, non-combative response" },
];

interface ModeSelectorProps {
  selected: AuditMode;
  onChange: (mode: AuditMode) => void;
}

export function ModeSelector({ selected, onChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {MODES.map(mode => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          className={`text-left px-3 py-3 rounded-lg border transition-all ${
            selected === mode.value
              ? "border-accent bg-accent-light text-accent"
              : "border-gray-200 bg-white text-gray-700 hover:border-accent/40 hover:bg-gray-50"
          }`}
        >
          <div className="font-semibold text-sm">{mode.label}</div>
          <div className={`text-xs mt-0.5 ${selected === mode.value ? "text-blue-600" : "text-gray-400"}`}>
            {mode.description}
          </div>
        </button>
      ))}
    </div>
  );
}
