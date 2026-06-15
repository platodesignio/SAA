"use client";

import { HistoryEntry } from "@/lib/auditTypes";
import { downloadMarkdown } from "@/lib/markdown";

const MODE_LABELS: Record<string, string> = {
  quick: "Quick",
  deep: "Deep",
  ddat: "DDAT",
  rewrite: "Rewrite",
  reply: "Reply",
};

interface HistoryListProps {
  entries: HistoryEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryList({ entries, onDelete, onClearAll, onSelect }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-sm">No audit history yet.</p>
        <p className="text-xs mt-1">Audits will appear here after you run them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={onClearAll}
          className="text-xs text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-300 rounded px-3 py-1.5 transition-colors"
        >
          Clear all history
        </button>
      </div>
      {entries.map(entry => (
        <div key={entry.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
            onClick={() => onSelect(entry)}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-accent bg-accent-light border border-accent/20 rounded px-1.5 py-0.5">
                {MODE_LABELS[entry.mode] ?? entry.mode}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{entry.input}</p>
            {entry.result.auditFlags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {entry.result.auditFlags.slice(0, 3).map(f => (
                  <span key={f} className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5">{f}</span>
                ))}
              </div>
            )}
          </button>
          <div className="flex border-t border-gray-100">
            <button
              onClick={() => downloadMarkdown(`statement-audit-${entry.id}.md`, entry.result.markdownExport)}
              className="flex-1 text-xs text-gray-500 hover:text-gray-800 px-3 py-2 hover:bg-gray-50 transition-colors border-r border-gray-100"
            >
              Export
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="flex-1 text-xs text-gray-400 hover:text-red-600 px-3 py-2 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
