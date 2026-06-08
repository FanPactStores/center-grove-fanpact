export function PercentAnchor({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-6">
      <div
        className="hero-stat font-display"
        style={{ color: "var(--community)" }}
      >
        60<span style={{ color: "var(--ink)", opacity: 0.4 }}>%</span>
      </div>
      <div className="max-w-[14ch] border-l-2 pl-4 text-sm uppercase tracking-[0.18em] text-muted-foreground" style={{ borderColor: "var(--community)" }}>
        {subtitle ?? "of net earnings to the community fund"}
      </div>
    </div>
  );
}
