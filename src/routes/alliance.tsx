import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Brain,
  Briefcase,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  PiggyBank,
  Shield,
  Wrench,
} from "lucide-react";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";

export const Route = createFileRoute("/alliance")({
  head: () => ({
    meta: [
      { title: "FanPact Alliance — Coordinated Community Investment" },
      {
        name: "description",
        content:
          "Commerce funds. The Alliance coordinates. Research measures. How FanPact connects communities with partners in healthcare, education, and workforce readiness.",
      },
      { property: "og:title", content: "FanPact Alliance — Coordinated Community Investment" },
      {
        property: "og:description",
        content:
          "Commerce → Alliance → Programs → Research → Outcomes. Coordinating community investment that commerce alone cannot solve.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FanPact Alliance" },
      {
        name: "twitter:description",
        content: "Commerce funds. The Alliance coordinates. Research measures.",
      },
    ],
  }),
  component: AlliancePage,
});

const SOLUTIONS = [
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Brain, label: "Mental Health" },
  { icon: PiggyBank, label: "Financial Literacy" },
  { icon: Shield, label: "Armed Services / Military" },
  { icon: Wrench, label: "Trades" },
  { icon: FlaskConical, label: "STEM" },
  { icon: GraduationCap, label: "College Access" },
  { icon: Briefcase, label: "Career Readiness" },
  { icon: Activity, label: "Community Wellness" },
];

const FLOW = ["Commerce", "Alliance", "Programs", "Research", "Outcomes"];

function AlliancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className="border-b border-border"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo variant="white" height={32} />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            Back to FanPact Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] opacity-60">FanPact Alliance</div>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] tracking-tight">
            FANPACT<br />
            <span style={{ color: "var(--gold)" }}>ALLIANCE</span>
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl tracking-tight md:text-2xl">
            Commerce funds. The Alliance coordinates. Research measures.
          </p>
        </div>
      </header>

      {/* SECTION 1 — WHY */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Why the Alliance exists
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            Commerce funds. The Alliance coordinates.{" "}
            <span style={{ color: "var(--gold)" }}>Research measures.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            The FanPact Alliance exists to coordinate community investments that cannot be solved
            through commerce alone. Every purchase on FanPact already funds the team or program a
            family chooses. The Alliance goes further, connecting communities with partners who
            invest in healthcare, education, workforce readiness, and long-term opportunity, and
            with the research that measures whether that investment actually works.
          </p>
        </div>
      </section>

      {/* SECTION 2 — HOW IT WORKS */}
      <section className="border-b border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            How it works
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="rounded-full border border-border bg-background px-5 py-2 font-display text-lg tracking-tight">
                  {step}
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowRight className="h-4 w-4" style={{ color: "var(--gold)" }} />
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
            Every purchase strengthens a community. The Alliance connects that commerce to partners
            who can do more, funding programs, opening pathways, coordinating support. Research
            measures the results, and what&apos;s learned shapes the next investment.
          </p>
        </div>
      </section>

      {/* SECTION 3 — COMMUNITY SOLUTIONS */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Community solutions
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            The Alliance coordinates partners across the areas where communities need it most
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-card px-6 py-6">
                <s.icon className="h-6 w-6" style={{ color: "var(--gold)" }} />
                <span className="font-display text-xl tracking-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — RESEARCH */}
      <section
        className="border-b border-border py-24"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:px-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] opacity-60">Research</div>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Why measurement matters
            </h2>
            <p className="mt-6 max-w-lg text-lg opacity-80">
              We believe communities deserve evidence that coordinated investment improves outcomes,
              not just the belief that it does.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.22em] opacity-60">
              What the study is designed to find
            </div>
            <p className="mt-4 text-lg opacity-90">
              The study is designed to evaluate whether structured, commerce-funded community
              investment, paired with coordinated educational, vocational, and community support, is
              associated with improvements in youth participation, educational pathways, and
              workforce outcomes over time.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TRANSPARENCY */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Transparency
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            Transparency isn&apos;t an add-on to this work,{" "}
            <span style={{ color: "var(--gold)" }}>it&apos;s the point of it.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            As the Alliance grows, we&apos;re committed to publishing what we learn: annual reports,
            outcome metrics, research findings, and progress toward the communities we serve.
          </p>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo variant="compact" height={24} />
          </Link>
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© 2026</span>
            <FanPactLogo variant="compact" height={20} />
            <span>
              , Inc. Community Commerce Platform. Demo experience — all products and contributions
              illustrative.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
