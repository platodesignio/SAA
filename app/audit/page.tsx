"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditResult } from "@/lib/auditTypes";
import { AuditResultView } from "@/components/AuditResult";
import { AuditInput, EXAMPLE } from "@/components/AuditInput";
import { ModeSelector } from "@/components/ModeSelector";
import { AuditMode } from "@/lib/auditTypes";

export default function AuditPage() {
  const router = useRouter();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState<AuditMode>("quick");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"result" | "new">("result");

  useEffect(() => {
    const stored = sessionStorage.getItem("audit-result");
    if (stored) {
      const { input: i, result: r } = JSON.parse(stored);
      setInput(i);
      setResult(r);
      setMode(r.mode);
      setView("result");
    } else {
      setView("new");
    }
  }, []);

  async function handleAudit() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const r = await res.json();
      const { saveToHistory } = await import("@/lib/storage");
      saveToHistory(text, mode, r);
      sessionStorage.setItem("audit-result", JSON.stringify({ input: text, result: r }));
      setInput(text);
      setResult(r);
      setView("result");
    } finally {
      setLoading(false);
    }
  }

  if (view === "result" && result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setView("new"); setText(input); setMode(result.mode); }}
            className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5 transition-colors"
          >
            ← New Audit
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Home
          </button>
        </div>
        <AuditResultView result={result} input={input} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">New Audit</h1>
        <p className="text-sm text-gray-500 mt-1">Paste a statement, select a mode, and run the audit.</p>
      </div>
      <AuditInput value={text} onChange={setText} onLoadExample={() => setText(EXAMPLE)} />
      <ModeSelector selected={mode} onChange={setMode} />
      <button
        onClick={handleAudit}
        disabled={!text.trim() || loading}
        className="w-full py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Auditing…" : "Run Audit"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        Do not paste private, confidential, medical, legal, or sensitive personal information.
      </p>
    </div>
  );
}
