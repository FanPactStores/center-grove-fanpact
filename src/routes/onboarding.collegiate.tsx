import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/onboarding/collegiate")({
  head: () => ({
    meta: [
      { title: "Collegiate Onboarding — Coming Soon | FanPact" },
      {
        name: "description",
        content:
          "Collegiate NIL storefront onboarding is coming soon. Share your details and a FanPact rep will follow up.",
      },
      { property: "og:title", content: "Collegiate Onboarding — Coming Soon | FanPact" },
      {
        property: "og:description",
        content: "Join the interest list for collegiate NIL storefronts on FanPact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollegiateStub,
});

function CollegiateStub() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", university: "", role: "" });
  const valid = form.name.trim() && form.email.trim() && form.university.trim();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[#13294B]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo variant="white" height={30} />
          </Link>
          <Link to="/onboarding" className="text-sm text-white/70 hover:text-white">
            Onboarding
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <GraduationCap className="h-4 w-4" /> Collegiate Programs
        </div>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          Collegiate onboarding is coming soon
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're finalizing the NIL-compliant collegiate onboarding experience. Tell us
          about your program and a FanPact rep will follow up.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          {sent ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5" style={{ color: "#13294B" }} />
              <div>
                <div className="font-display text-2xl tracking-tight">Thanks — you're on the list</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  A FanPact rep will follow up with {form.email}.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) setSent(true);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="cg-name">Full name</Label>
                <Input id="cg-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cg-email">Email</Label>
                <Input id="cg-email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cg-univ">University</Label>
                <Input id="cg-univ" maxLength={150} value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cg-role">Role</Label>
                <Input id="cg-role" maxLength={100} placeholder="e.g. Deputy AD, NIL Director" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={!valid} className="w-full md:w-auto" style={{ background: "#13294B", color: "#fff" }}>
                  Request info
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
