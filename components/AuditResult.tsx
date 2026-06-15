"use client";

import { AuditResult as AuditResultType } from "@/lib/auditTypes";
import { ResultCard } from "./ResultCard";
import { AuditFlags } from "./AuditFlags";
import { RelatedLenses } from "./RelatedLenses";
import { MarkdownExport } from "./MarkdownExport";

const MODE_LABELS: Record<string, string> = {
  quick: "Quick Audit",
  deep: "Deep Audit",
  ddat: "DDAT Audit",
  rewrite: "Neutral Rewrite",
  reply: "Calm Reply",
};

interface AuditResultProps {
  result: AuditResultType;
  input: string;
}

const SUMMARY_CARD_IDS = ["claim-core", "main-problem", "better-version", "neutral", "very-short", "claim-direction"];

export function AuditResultView({ result, input }: AuditResultProps) {
  const summaryCards = result.cards.filter(c => SUMMARY_CARD_IDS.includes(c.id));
  const detailCards = result.cards.filter(c => !SUMMARY_CARD_IDS.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{MODE_LABELS[result.mode] ?? result.mode}</h2>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{input.slice(0, 80)}{input.length > 80 ? "…" : ""}</p>
        </div>
        <MarkdownExport
          content={result.markdownExport}
          filename={`statement-audit-${result.mode}-${Date.now()}.md`}
        />
      </div>

      {/* Audit flags */}
      <AuditFlags flags={result.auditFlags} />

      {/* Summary cards */}
      {summaryCards.length > 0 && (
        <div>
          {summaryCards.map(card => (
            <ResultCard key={card.id} card={card} defaultOpen={true} />
          ))}
        </div>
      )}

      {/* Detail cards */}
      {detailCards.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Detailed Analysis</p>
          {detailCards.map((card, i) => (
            <ResultCard key={card.id} card={card} defaultOpen={i < 3} />
          ))}
        </div>
      )}

      {/* Related lenses */}
      {result.relatedLenses && result.relatedLenses.length > 0 && (
        <RelatedLenses lenses={result.relatedLenses} />
      )}

      {/* Footer */}
      <div className="border-t border-gray-100 pt-4 text-xs text-gray-400">
        <p>This tool does not determine final truth. It clarifies the conditions under which a claim could be evaluated.</p>
        <p className="mt-1">No person rating. No moral score. No debate game.</p>
      </div>
    </div>
  );
}
