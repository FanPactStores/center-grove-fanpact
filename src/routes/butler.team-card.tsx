import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Smartphone, Sparkles } from "lucide-react";
import { useState } from "react";
import { STORES } from "@/data/stores";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/butler/team-card")({
  head: () => ({
    meta: [
      { title: "Team Card — Butler × FanPact" },
      { name: "description", content: "A Visa in Apple Pay and Google Pay that earns community contributions everywhere." },
    ],
  }),
  component: TeamCardPage,
});

function TeamCardPage() {
  const store = STORES.butler;
  const [step, setStep] = useState(0);
  const steps = ["Intro", "Cardholder", "Wallet", "Done"];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT: pitch + card */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{store.shortName} Team Card</div>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-tight">
            Earn contributions <span style={{ color: "var(--community)" }}>everywhere</span> you tap.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            A Stripe-issued Visa debit in Apple Pay and Google Pay. Spend you'd already make at the
            grocery store, gas pump, or coffee shop earns community contributions for {store.fundDisplay}.
          </p>

          <div className="mt-10 aspect-[1.586/1] w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-accent))", color: "white" }}>
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="font-display text-xl tracking-tight">{store.marks.word}</div>
                <div className="text-xs uppercase tracking-widest opacity-80">Team Card</div>
              </div>
              <div className="font-mono text-lg tracking-[0.2em]">4242  ••••  ••••  1834</div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Designated to</div>
                  <div className="text-sm font-semibold">{store.fundName}</div>
                </div>
                <div className="text-xs uppercase tracking-widest opacity-80">VISA</div>
              </div>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "1% community contribution at every merchant, automatically",
              "Stripe-issued — no credit check, no annual fee",
              "Add to Apple Pay or Google Pay in 30 seconds",
              "Real-time contribution ledger visible in your account",
            ].map((b) => (
              <li key={b} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 text-[var(--community)]" /> {b}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT: enrollment */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {steps.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${
                    i === step ? "text-white" : i < step ? "text-[var(--community)]" : "text-muted-foreground"
                  }`}
                  style={{
                    background: i === step ? "var(--brand)" : i < step ? "var(--community-soft)" : "var(--muted)",
                  }}
                >
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className={i === step ? "text-foreground font-semibold" : ""}>{s}</span>
                {i < steps.length - 1 && <span className="text-border">·</span>}
              </span>
            ))}
          </div>

          {step === 0 && (
            <Intro onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <Cardholder onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && (
            <Wallet onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Done store={store} onReset={() => setStep(0)} />
          )}
        </div>
      </div>
    </main>
  );
}

function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl tracking-tight">Get your Team Card</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Takes about 90 seconds. No credit pull. No card mailed — it lives in your wallet on day one.
      </p>
      <div className="mt-6 grid gap-3">
        {[
          { icon: Sparkles, t: "Step 1 — Tell us about you", d: "Name, date of birth, last 4 of SSN for ID verification." },
          { icon: Smartphone, t: "Step 2 — Add to Apple or Google Pay", d: "One tap. Card is provisioned to your wallet instantly." },
          { icon: CreditCard, t: "Step 3 — Tap and earn", d: "1% to your designated fund at every merchant. Forever." },
        ].map((s) => (
          <div key={s.t} className="flex gap-3 rounded-md border border-border p-3 text-sm">
            <s.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">{s.t}</div>
              <div className="text-xs text-muted-foreground">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <Button size="lg" className="mt-6 w-full" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }} onClick={onNext}>
        Start enrollment
      </Button>
    </div>
  );
}

function Cardholder({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onNext(); }}
      className="space-y-4"
    >
      <h2 className="font-display text-3xl tracking-tight">Your information</h2>
      <Field label="Full legal name" placeholder="Jane Bulldog" />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date of birth" placeholder="MM / DD / YYYY" />
        <Field label="Last 4 of SSN" placeholder="••••" />
      </div>
      <Field label="Email" type="email" placeholder="jane@example.com" />
      <Field label="Mobile" placeholder="(317) 555-0102" />
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit" className="flex-1" style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}>
          Continue
        </Button>
      </div>
    </form>
  );
}

function Wallet({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl tracking-tight">Add to wallet</h2>
      <p className="mt-2 text-sm text-muted-foreground">Choose where to provision your Team Card.</p>
      <div className="mt-6 grid gap-3">
        <button
          onClick={onNext}
          className="flex items-center justify-between rounded-lg border border-border bg-foreground p-4 text-background transition-all hover:scale-[1.01]"
        >
          <span className="text-sm font-semibold"> Add to Apple Wallet</span>
          <Smartphone className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted"
        >
          <span className="text-sm font-semibold">G  Add to Google Wallet</span>
          <Smartphone className="h-5 w-5" />
        </button>
      </div>
      <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Back</Button>
    </div>
  );
}

function Done({ store, onReset }: { store: typeof STORES["butler"]; onReset: () => void }) {
  return (
    <div className="text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--community-soft)", color: "var(--community)" }}
      >
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-display text-3xl tracking-tight">You're in.</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your Team Card is in your wallet. Every tap from now on contributes to {store.fundName}.
      </p>
      <div className="mt-6 rounded-lg border border-border p-4 text-left text-sm">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">First-month projection</div>
        <div className="mt-1 font-display text-3xl tracking-tight" style={{ color: "var(--community)" }}>~ $14.20</div>
        <div className="text-xs text-muted-foreground">based on average household card spend</div>
      </div>
      <Button variant="outline" className="mt-6" onClick={onReset}>Enroll another card</Button>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1.5 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
      />
    </label>
  );
}
