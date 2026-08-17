import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "Start Your Storefront — FanPact Onboarding" },
      {
        name: "description",
        content:
          "Set up a FanPact storefront for your youth organization or collegiate program. No cost to your organization or families.",
      },
      { property: "og:title", content: "Start Your Storefront — FanPact Onboarding" },
      {
        property: "og:description",
        content: "Choose your path: youth organizations or collegiate programs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingLanding,
});

function OnboardingLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[#13294B]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo variant="white" height={30} />
          </Link>
          <Link to="/" className="text-sm text-white/70 hover:text-white">
            Back to FanPact Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Onboarding
        </div>
        <h1 className="mt-3 font-display text-5xl tracking-tight">
          Start your FanPact storefront
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Choose the path that matches your program. Setup takes a few minutes and
          there is no cost to your organization or its families.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            to="/onboarding/youth"
            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <Users className="h-6 w-6" style={{ color: "#13294B" }} />
            <h2 className="mt-4 font-display text-3xl tracking-tight">
              Youth Organizations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Clubs, leagues, academies, and community alliances. Build your
              divisions, teams, and participants — then invite families to opt in.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#13294B" }}>
              Begin onboarding
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/onboarding/collegiate"
            className="group rounded-2xl border border-dashed border-border bg-muted/30 p-8 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <GraduationCap className="h-6 w-6 text-muted-foreground" />
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Coming soon
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-muted-foreground">
              Collegiate Programs
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              NIL-compliant collegiate storefronts. Onboarding opens soon — leave
              your details and we'll reach out.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Join the interest list
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
