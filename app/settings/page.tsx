"use client";

import { useEffect, useState } from "react";
import { AppSettings, loadSettings, saveSettings, clearHistory } from "@/lib/storage";
import { AuditMode } from "@/lib/auditTypes";

const MODES: { value: AuditMode; label: string }[] = [
  { value: "quick", label: "Quick Audit" },
  { value: "deep", label: "Deep Audit" },
  { value: "ddat", label: "DDAT Audit" },
  { value: "rewrite", label: "Neutral Rewrite" },
  { value: "reply", label: "Calm Reply" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  function update(patch: Partial<AppSettings>) {
    if (!settings) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleClearHistory() {
    if (confirm("Delete all local audit history? This cannot be undone.")) {
      clearHistory();
    }
  }

  if (!settings) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure Statement Audit for your workflow.</p>
      </div>

      {saved && (
        <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          Settings saved.
        </div>
      )}

      {/* Default mode */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Default Audit Mode</h2>
        <div className="grid grid-cols-1 gap-2">
          {MODES.map(m => (
            <label key={m.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="defaultMode"
                value={m.value}
                checked={settings.defaultMode === m.value}
                onChange={() => update({ defaultMode: m.value })}
                className="accent-accent"
              />
              <span className="text-sm text-gray-700">{m.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Local History</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.historyEnabled}
            onChange={e => update({ historyEnabled: e.target.checked })}
            className="accent-accent"
          />
          <span className="text-sm text-gray-700">Save audit history locally</span>
        </label>
        <p className="text-xs text-gray-400">History is stored in your browser's localStorage only.</p>
        <button
          onClick={handleClearHistory}
          className="text-xs text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-300 rounded px-3 py-1.5 transition-colors"
        >
          Clear local history
        </button>
      </section>

      {/* Related lenses */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Related Audit Lenses</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.relatedLensesEnabled}
            onChange={e => update({ relatedLensesEnabled: e.target.checked })}
            className="accent-accent"
          />
          <span className="text-sm text-gray-700">Show Related Audit Lenses in Deep and DDAT audits</span>
        </label>
        <p className="text-xs text-gray-400">Suggests relevant philosophical frameworks based on detected audit flags.</p>
      </section>

      {/* Markdown export */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Markdown Export</h2>
        <p className="text-xs text-gray-500">Each audit result includes an Export Markdown button. Exports include the original statement, audit flags, all cards, and related lenses.</p>
      </section>

      {/* API */}
      <section className="space-y-3 border-t border-gray-100 pt-6">
        <h2 className="text-sm font-semibold text-gray-900">API Mode</h2>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-xs text-gray-500">
            This version uses a local mock audit engine. A future version may optionally connect to an external LLM API for deeper analysis. When enabled, a clear notice will appear before any data is sent externally, and you will be able to disable it at any time.
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section className="space-y-3 border-t border-gray-100 pt-6">
        <h2 className="text-sm font-semibold text-gray-900">Privacy</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          Your audit history is stored locally on your device by default. No data is sent to a server in the current configuration. The local history can be cleared at any time.
        </p>
        <p className="text-xs text-gray-600">
          Do not paste private, confidential, medical, legal, or sensitive personal information unless you understand the risk.
        </p>
      </section>

      {/* Principle */}
      <section className="border-t border-gray-100 pt-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2">
          <p className="text-xs font-semibold text-gray-900">Audit Ethics Principle</p>
          <p className="text-xs text-gray-600">Audit ethics must audit scoring systems without converting persons into ethical scores.</p>
          <p className="text-xs text-gray-600 mt-1">No person rating. No moral score. No debate game.</p>
        </div>
      </section>
    </div>
  );
}
