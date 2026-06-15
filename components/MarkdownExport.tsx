"use client";

import { downloadMarkdown } from "@/lib/markdown";

interface MarkdownExportProps {
  content: string;
  filename?: string;
}

export function MarkdownExport({ content, filename = "statement-audit.md" }: MarkdownExportProps) {
  return (
    <button
      onClick={() => downloadMarkdown(filename, content)}
      className="text-xs text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-500 rounded px-3 py-1.5 transition-colors"
    >
      Export Markdown
    </button>
  );
}
