import { RelatedLens } from "@/lib/auditTypes";

interface RelatedLensesProps {
  lenses: RelatedLens[];
}

export function RelatedLenses({ lenses }: RelatedLensesProps) {
  if (!lenses || lenses.length === 0) return null;
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Related Audit Lenses</span>
      </div>
      <div className="px-4 py-3 bg-white">
        <p className="text-xs text-gray-500 mb-3">These philosophical frameworks are relevant to the audit flags detected in this statement.</p>
        <div className="space-y-2">
          {lenses.map(lens => (
            <div key={lens.philosopherId} className="text-sm">
              <span className="font-semibold text-gray-900">{lens.name}</span>
              <span className="text-gray-500"> — </span>
              <span className="text-gray-700">{lens.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
