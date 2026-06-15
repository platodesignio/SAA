interface AuditFlagsProps {
  flags: string[];
}

export function AuditFlags({ flags }: AuditFlagsProps) {
  if (flags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {flags.map(flag => (
        <span
          key={flag}
          className="inline-block text-xs px-2 py-1 rounded border border-accent/40 bg-accent-light text-accent font-medium"
        >
          {flag}
        </span>
      ))}
    </div>
  );
}
