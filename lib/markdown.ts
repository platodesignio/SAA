import { AuditResult } from "./auditTypes";

const MODE_LABELS: Record<string, string> = {
  quick: "Quick Audit",
  deep: "Deep Audit",
  ddat: "DDAT Audit",
  rewrite: "Neutral Rewrite",
  reply: "Calm Reply",
};

export function generateMarkdown(input: string, result: AuditResult): string {
  const modeLabel = MODE_LABELS[result.mode] ?? result.mode;
  const date = new Date().toISOString().split("T")[0];

  const lines: string[] = [
    `# Statement Audit — ${modeLabel}`,
    ``,
    `**Date:** ${date}`,
    ``,
    `---`,
    ``,
    `## Original Statement`,
    ``,
    `> ${input.split("\n").join("\n> ")}`,
    ``,
    `---`,
    ``,
  ];

  if (result.auditFlags.length > 0) {
    lines.push(`## Audit Flags`, ``);
    for (const flag of result.auditFlags) {
      lines.push(`- ${flag}`);
    }
    lines.push(``);
    lines.push(`---`, ``);
  }

  for (const card of result.cards) {
    lines.push(`## ${card.title}`, ``);
    lines.push(card.content, ``);
    lines.push(`---`, ``);
  }

  if (result.relatedLenses && result.relatedLenses.length > 0) {
    lines.push(`## Related Audit Lenses`, ``);
    for (const lens of result.relatedLenses) {
      lines.push(`**${lens.name}:** ${lens.reason}`);
    }
    lines.push(``);
    lines.push(`---`, ``);
  }

  lines.push(`*Statement Audit — audits claims, not persons.*`);
  lines.push(`*This tool does not determine final truth. It clarifies the conditions under which a claim could be evaluated.*`);

  return lines.join("\n");
}

export function downloadMarkdown(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
