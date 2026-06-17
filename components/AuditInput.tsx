"use client";

const EXAMPLE = "Quantum information theory has produced the hypothesis that everything is quantum information, and this view is accepted among young people.";

interface AuditInputProps {
  value: string;
  onChange: (v: string) => void;
  onLoadExample: () => void;
}

export function AuditInput({ value, onChange, onLoadExample }: AuditInputProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste a statement, argument, headline, SNS post, or AI-generated claim. Select an audit mode and run the audit."
        className="w-full min-h-[140px] resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        rows={6}
      />
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{value.length} characters</span>
        <button
          type="button"
          onClick={onLoadExample}
          className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2"
        >
          Load example
        </button>
      </div>
    </div>
  );
}

export { EXAMPLE };
