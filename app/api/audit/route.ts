import { NextRequest, NextResponse } from "next/server";
import { AuditRequest } from "@/lib/auditTypes";
import { runMockAudit } from "@/lib/mockAuditEngine";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AuditRequest;
    const { text, mode } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    if (!["quick", "deep", "ddat", "rewrite", "reply"].includes(mode)) {
      return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    }

    const result = runMockAudit({ text: text.trim(), mode });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Audit failed." }, { status: 500 });
  }
}
