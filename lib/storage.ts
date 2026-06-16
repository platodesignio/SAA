import { HistoryEntry, AuditResult, DDATAdvancedResult, AuditMode } from "./auditTypes";

const STORAGE_KEY = "statement-audit-history";
const SETTINGS_KEY = "statement-audit-settings";

export interface AppSettings {
  defaultMode: AuditMode;
  historyEnabled: boolean;
  relatedLensesEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  defaultMode: "quick",
  historyEnabled: true,
  relatedLensesEnabled: true,
};

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveToHistory(input: string, mode: AuditMode, result: AuditResult | DDATAdvancedResult): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    input,
    mode,
    result,
  };

  const settings = loadSettings();
  if (!settings.historyEnabled) return entry;

  const history = loadHistory();
  history.unshift(entry);
  const trimmed = history.slice(0, 100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return entry;
}

export function deleteHistoryEntry(id: string): void {
  const history = loadHistory().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
