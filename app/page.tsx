"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuditInput, EXAMPLE } from "@/components/AuditInput";
import { ModeSelector } from "@/components/ModeSelector";
import { AuditMode } from "@/lib/auditTypes";

export default function HomePage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<AuditMode>("quick");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAudit() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const result = await res.json();
      // Store in sessionStorage for the result page
      sessionStorage.setItem("audit-result", JSON.stringify({ input: text, result }));
      // Also save to history
      const { saveToHistory } = await import("@/lib/storage");
      saveToHistory(text, mode, result);
      router.push("/audit");
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Statement Audit</h1>
        <p className="text-lg text-gray-500">Do not win arguments. Clarify them.</p>
        <p className="text-xs text-gray-400 pt-1">This tool audits claims, not persons.</p>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <AuditInput
          value={text}
          onChange={setText}
          onLoadExample={() => setText(EXAMPLE)}
        />

        {/* Mode selector */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Select audit mode</p>
          <ModeSelector selected={mode} onChange={setMode} />
        </div>

        {/* Submit */}
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

      {/* Principle cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        {[
          { title: "Clarification", body: "Statement Audit does not decide who is right. It clarifies what is being claimed and under what conditions it could be evaluated." },
          { title: "No Scoring", body: "No person ratings. No moral scores. No correctness meters. Audit ethics must audit scoring systems without converting persons into ethical scores." },
          { title: "Limitation", body: "Statement Audit is not a truth machine. It clarifies the conditions under which a claim could be evaluated. Final judgment remains with the reader." },
        ].map(card => (
          <div key={card.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">{card.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
