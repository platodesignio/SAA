"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HistoryEntry } from "@/lib/auditTypes";
import { loadHistory, deleteHistoryEntry, clearHistory } from "@/lib/storage";
import { HistoryList } from "@/components/HistoryList";

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEntries(loadHistory());
  }, []);

  function handleDelete(id: string) {
    deleteHistoryEntry(id);
    setEntries(loadHistory());
  }

  function handleClearAll() {
    if (confirm("Delete all audit history? This cannot be undone.")) {
      clearHistory();
      setEntries([]);
    }
  }

  function handleSelect(entry: HistoryEntry) {
    sessionStorage.setItem("audit-result", JSON.stringify({ input: entry.input, result: entry.result }));
    router.push("/audit");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Audit History</h1>
        <p className="text-sm text-gray-500 mt-1">Your audit history is stored locally on your device. Nothing is sent to a server.</p>
      </div>
      <HistoryList
        entries={entries}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
        onSelect={handleSelect}
      />
    </div>
  );
}
