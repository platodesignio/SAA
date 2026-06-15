"use client";

import { useState } from "react";
import { AuditCard } from "@/lib/auditTypes";

interface ResultCardProps {
  card: AuditCard;
  defaultOpen?: boolean;
}

export function ResultCard({ card, defaultOpen = true }: ResultCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(card.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900 tracking-wide uppercase">{card.title}</span>
        <span className="text-gray-400 text-xs ml-2">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{card.content}</p>
          <button
            onClick={handleCopy}
            className="mt-3 text-xs text-accent hover:text-blue-700 border border-accent/30 hover:border-blue-400 rounded px-2 py-1 transition-colors"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
