"use client";

import { DDATAdvancedResult, RiskLevel, DialecticalDirectionResult } from "@/lib/auditTypes";
import { downloadMarkdown } from "@/lib/markdown";

const RISK_COLOR: Record<RiskLevel, string> = {
  Low: "text-green-700 bg-green-50 border-green-200",
  Medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
  High: "text-orange-700 bg-orange-50 border-orange-200",
  Critical: "text-red-700 bg-red-50 border-red-200",
};

const DIRECTION_COLOR: Record<DialecticalDirectionResult, string> = {
  "Freedom-Generating": "text-green-700 bg-green-50 border-green-300",
  "Ambivalent": "text-yellow-700 bg-yellow-50 border-yellow-300",
  "Justification-Generating": "text-orange-700 bg-orange-50 border-orange-300",
  "Self-Enclosed Dialectic": "text-red-700 bg-red-50 border-red-300",
  "Requires Revision": "text-purple-700 bg-purple-50 border-purple-300",
};

function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${RISK_COLOR[level]}`}>
      {level}
    </span>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</h3>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 ${className}`}>
      {children}
    </div>
  );
}

function ScoreBar({ label, value, inverted = false }: { label: string; value: number; inverted?: boolean }) {
  const pct = Math.min(100, Math.max(0, value));
  const color = inverted
    ? pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-yellow-400" : "bg-red-500"
    : pct >= 70 ? "bg-red-500" : pct >= 40 ? "bg-yellow-400" : "bg-green-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className="text-xs font-mono font-semibold text-gray-700">{value}/100</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function DDATAdvancedResultView({ result, input }: { result: DDATAdvancedResult; input: string }) {
  function handleExport() {
    downloadMarkdown(`statement-audit-advanced-${Date.now()}.md`, result.markdownExport);
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded px-2 py-0.5 mb-2">
            Advanced DDAT Audit
          </div>
          <p className="text-xs text-gray-400 italic line-clamp-2">&ldquo;{input}&rdquo;</p>
        </div>
        <button
          onClick={handleExport}
          className="shrink-0 text-xs text-gray-500 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors"
        >
          Export .md
        </button>
      </div>

      {/* Proposition Type */}
      <Card>
        <SectionHeader label="Proposition Type" />
        <p className="text-sm text-gray-800 leading-relaxed">{result.propositionType}</p>
      </Card>

      {/* Dialectical Direction — prominent */}
      <Card className={`border-2 ${DIRECTION_COLOR[result.dialecticalDirection.result]}`}>
        <div className="flex items-center justify-between gap-3">
          <SectionHeader label="Dialectical Direction" />
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${DIRECTION_COLOR[result.dialecticalDirection.result]}`}>
            {result.dialecticalDirection.result}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{result.dialecticalDirection.explanation}</p>
      </Card>

      {/* Generation Conditions */}
      <Card>
        <SectionHeader label="Generation Conditions" />
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Primary sources: </span>
            <span className="text-gray-600">
              {result.generationConditions.primarySources.length > 0
                ? result.generationConditions.primarySources.join(" · ")
                : "Not explicitly identified"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Hidden assumptions</p>
            <ul className="space-y-1">
              {result.generationConditions.hiddenAssumptions.map((a, i) => (
                <li key={i} className="text-gray-600 text-xs flex gap-2">
                  <span className="text-gray-300 shrink-0">—</span>{a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Missing conditions</p>
            <ul className="space-y-1">
              {result.generationConditions.missingConditions.map((c, i) => (
                <li key={i} className="text-gray-600 text-xs flex gap-2">
                  <span className="text-gray-300 shrink-0">—</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Layer Classification + Overreach */}
      <Card>
        <SectionHeader label="Layer Classification & Overreach" />
        <div className="flex flex-wrap gap-1.5 mb-3">
          {result.layerClassification.length > 0
            ? result.layerClassification.map(l => (
                <span key={l} className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5 border border-gray-200">{l}</span>
              ))
            : <span className="text-xs text-gray-400">No specific layers detected</span>}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-600">Overreach risk:</span>
          <RiskBadge level={result.layerOverreach.riskLevel} />
        </div>
        {result.layerOverreach.patterns.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {result.layerOverreach.patterns.map((p, i) => (
              <span key={i} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded px-2 py-0.5">{p}</span>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-600 leading-relaxed">{result.layerOverreach.explanation}</p>
      </Card>

      {/* Use-Context Problems */}
      {result.useContextProblems.length > 0 && (
        <Card>
          <SectionHeader label="Use-Context Problems (Wittgensteinian Audit)" />
          <div className="space-y-4">
            {result.useContextProblems.map((p, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-3">
                <p className="text-sm font-semibold text-gray-800 mb-0.5">&ldquo;{p.term}&rdquo;</p>
                <p className="text-xs text-gray-600 mb-1">{p.problem}</p>
                <p className="text-xs text-blue-600 italic">{p.suggestedClarification}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Belief + Justification Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <SectionHeader label="Belief-Generation Risk" />
          <div className="flex items-center gap-2 mb-2">
            <RiskBadge level={result.beliefGenerationRisk.riskLevel} />
          </div>
          {result.beliefGenerationRisk.patterns.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {result.beliefGenerationRisk.patterns.map((p, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 border border-gray-200">{p}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-600 leading-relaxed">{result.beliefGenerationRisk.explanation}</p>
        </Card>
        <Card>
          <SectionHeader label="Justification-Generation Risk" />
          <div className="flex items-center gap-2 mb-2">
            <RiskBadge level={result.justificationGenerationRisk.riskLevel} />
          </div>
          {result.justificationGenerationRisk.patterns.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {result.justificationGenerationRisk.patterns.map((p, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 border border-gray-200">{p}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-600 leading-relaxed">{result.justificationGenerationRisk.explanation}</p>
        </Card>
      </div>

      {/* Institutional Effect */}
      <Card>
        <SectionHeader label="Institutional Effect" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Classified subjects</p>
            <ul className="space-y-0.5">{result.institutionalEffect.classifiedSubjects.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Authorized agents</p>
            <ul className="space-y-0.5">{result.institutionalEffect.authorizedAgents.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Agency loss</p>
            <ul className="space-y-0.5">{result.institutionalEffect.agencyLoss.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Invisible conditions</p>
            <ul className="space-y-0.5">{result.institutionalEffect.invisibleConditions.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          {result.institutionalEffect.protectedInstitutions.length > 0 && (
            <div className="sm:col-span-2">
              <p className="font-semibold text-gray-700 mb-1">Protected institutions</p>
              <ul className="space-y-0.5">{result.institutionalEffect.protectedInstitutions.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
            </div>
          )}
        </div>
      </Card>

      {/* Ecological Context */}
      <Card>
        <SectionHeader label="Ecological Generative Context" />
        <div className="space-y-2 text-xs text-gray-600">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Erased contexts</p>
            <ul className="space-y-0.5">{result.ecologicalGenerativeContext.erasedContexts.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Technological conditions</p>
            <ul className="space-y-0.5">{result.ecologicalGenerativeContext.technologicalConditions.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Institutional conditions</p>
            <ul className="space-y-0.5">{result.ecologicalGenerativeContext.institutionalConditions.map((s, i) => <li key={i} className="flex gap-1"><span className="text-gray-300">—</span>{s}</li>)}</ul>
          </div>
        </div>
      </Card>

      {/* Heuristic Scores */}
      <Card>
        <SectionHeader label="Heuristic Scores" />
        <p className="text-xs text-gray-400 italic mb-3">
          These scores are heuristic audit indicators, not moral judgments of persons.
        </p>
        <div className="space-y-3">
          <ScoreBar label="Layer Overreach Risk" value={result.scores.layerOverreachRisk} />
          <ScoreBar label="Belief-Generation Risk" value={result.scores.beliefGenerationRisk} />
          <ScoreBar label="Justification-Generation Risk" value={result.scores.justificationGenerationRisk} />
          <ScoreBar label="Institutional Harm Risk" value={result.scores.institutionalHarmRisk} />
          <ScoreBar label="Freedom-Generation Potential" value={result.scores.freedomGenerationPotential} inverted />
          <ScoreBar label="Revision Necessity" value={result.scores.revisionNecessity} />
        </div>
      </Card>

      {/* Revised Proposition */}
      <Card>
        <SectionHeader label="Revised Proposition" />
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{result.revisedProposition}</div>
      </Card>

      {/* Short Final Diagnosis */}
      <Card className="border-gray-900 bg-gray-900 text-white">
        <SectionHeader label="Final Diagnosis" />
        <p className="text-sm leading-relaxed text-gray-200">{result.shortFinalDiagnosis}</p>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-gray-300 text-center">
        We audit propositions and systems, not persons.
      </p>
    </div>
  );
}
