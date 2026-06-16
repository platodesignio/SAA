export type AuditMode = "quick" | "deep" | "ddat" | "rewrite" | "reply" | "ddat-advanced";

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
  result: AuditResult | DDATAdvancedResult;
}

// ── DDAT Advanced types ──────────────────────────────────────────────────────

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type DialecticalDirectionResult =
  | "Freedom-Generating"
  | "Ambivalent"
  | "Justification-Generating"
  | "Self-Enclosed Dialectic"
  | "Requires Revision";

export interface UseContextProblem {
  term: string;
  problem: string;
  suggestedClarification: string;
}

export interface DDATAdvancedScores {
  layerOverreachRisk: number;
  beliefGenerationRisk: number;
  justificationGenerationRisk: number;
  institutionalHarmRisk: number;
  freedomGenerationPotential: number;
  revisionNecessity: number;
}

export interface DDATAdvancedResult {
  mode: "ddat-advanced";
  propositionType: string;
  generationConditions: {
    primarySources: string[];
    hiddenAssumptions: string[];
    missingConditions: string[];
  };
  layerClassification: string[];
  layerOverreach: {
    riskLevel: RiskLevel;
    patterns: string[];
    explanation: string;
  };
  useContextProblems: UseContextProblem[];
  beliefGenerationRisk: {
    riskLevel: RiskLevel;
    patterns: string[];
    explanation: string;
  };
  justificationGenerationRisk: {
    riskLevel: RiskLevel;
    patterns: string[];
    explanation: string;
  };
  dialecticalDirection: {
    result: DialecticalDirectionResult;
    explanation: string;
  };
  institutionalEffect: {
    classifiedSubjects: string[];
    authorizedAgents: string[];
    agencyLoss: string[];
    invisibleConditions: string[];
    protectedInstitutions: string[];
  };
  ecologicalGenerativeContext: {
    erasedContexts: string[];
    embodiedConditions: string[];
    technologicalConditions: string[];
    institutionalConditions: string[];
  };
  scores: DDATAdvancedScores;
  revisedProposition: string;
  shortFinalDiagnosis: string;
  markdownExport: string;
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
