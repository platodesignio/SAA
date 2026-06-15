export type AuditMode = "quick" | "deep" | "ddat" | "rewrite" | "reply";

export interface AuditCard {
  id: string;
  title: string;
  content: string;
}

export interface RelatedLens {
  philosopherId: string;
  name: string;
  reason: string;
}

export interface AuditRequest {
  text: string;
  mode: AuditMode;
}

export interface AuditResult {
  mode: AuditMode;
  claimCore: string;
  auditFlags: string[];
  cards: AuditCard[];
  relatedLenses?: RelatedLens[];
  betterVersion?: string;
  calmReply?: string;
  markdownExport: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  mode: AuditMode;
  result: AuditResult;
}

export type DDATStatus =
  | "Clarification-Oriented"
  | "Needs Definition"
  | "Evidence Missing"
  | "Conceptual Overreach"
  | "Truth/Consensus Confusion"
  | "Data Givenness Risk"
  | "Epistemic Injustice Risk"
  | "Classification Fixation Risk"
  | "Future Closure Risk"
  | "Responsibility Diffusion"
  | "Non-Domination Risk"
  | "Better as Hypothesis"
  | "Requires External Correction"
  | "Self-Justification Risk";
