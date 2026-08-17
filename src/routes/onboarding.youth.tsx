import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardSignature,
  Layers,
  Plus,
  Sparkles,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import { FanPactLogo } from "@/components/fanpact/FanPactLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AGREEMENT_SECTIONS,
  AGREEMENT_TITLE,
  AGREEMENT_VERSION,
} from "@/data/participation-agreement";

export const Route = createFileRoute("/onboarding/youth")({
  head: () => ({
    meta: [
      { title: "Youth Organization Onboarding — FanPact" },
      {
        name: "description",
        content:
          "Set up your youth organization's FanPact storefront: org basics, participation agreement, fund routing, and your division/team structure.",
      },
      { property: "og:title", content: "Youth Organization Onboarding — FanPact" },
      {
        property: "og:description",
        content: "No cost to your organization or families. Takes a few minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YouthOnboarding,
});

type Participant = { id: string; name: string };
type Team = { id: string; name: string; participants: Participant[] };
type Division = { id: string; name: string; teams: Team[] };

type FundChoice = "fanpact" | "own" | "no-ein";

const FUND_OPTIONS: { id: FundChoice; title: string; body: string }[] = [
  {
    id: "fanpact",
    title: "Let FanPact set this up for you",
    body: "We create and manage the receiving account on your behalf. Fastest path to go live.",
  },
  {
    id: "own",
    title: "We'll provide our own account details",
    body: "Use your existing organization bank account and EIN. We'll collect details securely via Stripe.",
  },
  {
    id: "no-ein",
    title: "We don't have an EIN yet",
    body: "No problem — we'll route contributions through an interim path while your paperwork is pending.",
  },
];

const STEPS = [
  { n: 1, label: "Welcome" },
  { n: 2, label: "Organization" },
  { n: 3, label: "Agreement" },
  { n: 4, label: "Funds" },
  { n: 5, label: "Structure" },
  { n: 6, label: "Confirmation" },
];

const uid = () => Math.random().toString(36).slice(2, 9);

function YouthOnboarding() {
  const [step, setStep] = useState(1);

  const [org, setOrg] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    sports: "",
    size: "",
    location: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [signedAt, setSignedAt] = useState<string | null>(null);

  const [fund, setFund] = useState<FundChoice | null>(null);

  const [divisions, setDivisions] = useState<Division[]>([]);

  const orgValid =
    org.orgName.trim() && org.contactName.trim() && org.email.trim() && org.location.trim();
  const agreementValid = agreed && signature.trim().length > 2;

  const totals = useMemo(() => {
    const teams = divisions.reduce((s, d) => s + d.teams.length, 0);
    const participants = divisions.reduce(
      (s, d) => s + d.teams.reduce((ss, t) => ss + t.participants.length, 0),
      0,
    );
    return { divisions: divisions.length, teams, participants };
  }, [divisions]);

  const next = () => {
    if (step === 3 && !signedAt) setSignedAt(new Date().toISOString());
    setStep((s) => Math.min(6, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[#13294B]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link to="/" aria-label="FanPact home" className="inline-flex">
            <FanPactLogo variant="white" height={30} />
          </Link>
          <Link to="/onboarding" className="text-sm text-white/70 hover:text-white">
            Change path
          </Link>
        </div>
      </header>

      {/* STEP RAIL */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-x-5 gap-y-2 px-6 py-3 text-[11px] uppercase tracking-widest">
          {STEPS.map((s) => (
            <span
              key={s.n}
              className={
                s.n === step
                  ? "font-semibold text-foreground"
                  : s.n < step
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground/60"
              }
            >
              {s.n}. {s.label}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-6 py-14">
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="h-4 w-4" /> Step 1 · Welcome
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Let's set up your organization's storefront
            </h1>
            <p className="mt-4 text-muted-foreground">
              You're about to create a FanPact storefront for your organization. Families
              shop the everyday brands they already buy — groceries, pet food, household
              essentials — and 60% of net earnings flows back to the team or participant
              they designate.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "No cost to your organization or your families — ever.",
                "Takes a few minutes: basics, agreement, fund routing, and your team structure.",
                "You can invite teams and families to opt in once your structure is set.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#13294B" }} />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Building2 className="h-4 w-4" /> Step 2 · Organization basics
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight">Tell us about your organization</h1>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field label="Organization name" id="o-name" value={org.orgName} onChange={(v) => setOrg({ ...org, orgName: v })} required />
              <Field label="Primary contact name" id="o-contact" value={org.contactName} onChange={(v) => setOrg({ ...org, contactName: v })} required />
              <Field label="Contact email" id="o-email" type="email" value={org.email} onChange={(v) => setOrg({ ...org, email: v })} required />
              <Field label="Contact phone" id="o-phone" value={org.phone} onChange={(v) => setOrg({ ...org, phone: v })} />
              <Field label="Sport(s)" id="o-sports" placeholder="Baseball, Softball, Soccer" value={org.sports} onChange={(v) => setOrg({ ...org, sports: v })} />
              <Field label="Approximate size (participants/families)" id="o-size" placeholder="e.g. 450" value={org.size} onChange={(v) => setOrg({ ...org, size: v })} />
              <Field label="State / location" id="o-loc" placeholder="Greenwood, IN" value={org.location} onChange={(v) => setOrg({ ...org, location: v })} required />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <ClipboardSignature className="h-4 w-4" /> Step 3 · Participation Agreement
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight">{AGREEMENT_TITLE}</h1>
            <div className="mt-2 text-xs text-muted-foreground">Version {AGREEMENT_VERSION}</div>

            <div className="mt-6 max-h-80 overflow-y-auto rounded-xl border border-border bg-card p-6 text-sm leading-relaxed">
              <div className="font-display text-xl tracking-tight">{AGREEMENT_TITLE}</div>
              <div className="mt-4 space-y-4">
                {AGREEMENT_SECTIONS.map((s) => (
                  <p key={s.heading} className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{s.heading} </span>
                    {s.body}
                  </p>
                ))}
              </div>
            </div>

            <label htmlFor="agree" className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
              <Checkbox id="agree" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
              <span>I have read and agree to the FanPact Participation Agreement</span>
            </label>

            <div className="mt-6 max-w-md">
              <Field
                label="Typed full legal name (electronic signature)"
                id="sig"
                value={signature}
                onChange={setSignature}
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                By typing your name you consent to sign electronically. Timestamp and
                agreement version are recorded on submit.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Wallet className="h-4 w-4" /> Step 4 · Fund-receiving choice
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight">Where should contributions land?</h1>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {FUND_OPTIONS.map((o) => {
                const active = fund === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setFund(o.id)}
                    className={`rounded-2xl border p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      active ? "border-transparent shadow-lg ring-2" : "border-border bg-card"
                    }`}
                    style={active ? { background: "#13294B", color: "#fff" } : undefined}
                  >
                    <div className="font-display text-xl tracking-tight">{o.title}</div>
                    <p className={`mt-3 text-sm ${active ? "text-white/80" : "text-muted-foreground"}`}>
                      {o.body}
                    </p>
                  </button>
                );
              })}
            </div>

            {fund === "no-ein" && (
              <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6 text-sm">
                <div className="font-display text-xl tracking-tight">Interim path</div>
                <p className="mt-3 text-muted-foreground">
                  While your EIN application is pending, FanPact holds your organization's
                  contributions in a dedicated ledger. Nothing is lost — balances transfer
                  in full once your entity is registered and your receiving account is
                  connected through Stripe. Your storefront can launch and families can
                  begin contributing in the meantime.
                </p>
                <p className="mt-3 font-semibold">A FanPact rep will follow up.</p>
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <StructureBuilder
            orgName={org.orgName || "Your Organization"}
            divisions={divisions}
            setDivisions={setDivisions}
          />
        )}

        {step === 6 && (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" /> Step 6 · Confirmation
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight">
              {org.orgName || "Your organization"} is ready for opt-ins
            </h1>
            <p className="mt-4 text-muted-foreground">
              Here's a recap of what you submitted. Next, teams and families are invited
              to opt in — once they activate, your storefront goes live.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <SummaryCard title="Organization">
                <Row k="Name" v={org.orgName} />
                <Row k="Contact" v={org.contactName} />
                <Row k="Email" v={org.email} />
                <Row k="Phone" v={org.phone} />
                <Row k="Sport(s)" v={org.sports} />
                <Row k="Approx. size" v={org.size} />
                <Row k="Location" v={org.location} />
              </SummaryCard>

              <SummaryCard title="Agreement">
                <Row k="Document" v={AGREEMENT_TITLE} />
                <Row k="Version" v={AGREEMENT_VERSION} />
                <Row k="Signed by" v={signature} />
                <Row
                  k="Timestamp"
                  v={signedAt ? new Date(signedAt).toLocaleString() : "—"}
                />
                <Row k="Consent" v={agreed ? "Accepted" : "Not accepted"} />
              </SummaryCard>

              <SummaryCard title="Fund routing">
                <Row
                  k="Selection"
                  v={FUND_OPTIONS.find((o) => o.id === fund)?.title ?? "Not selected"}
                />
                {fund === "no-ein" && <Row k="Next step" v="FanPact rep will follow up" />}
              </SummaryCard>

              <SummaryCard title="Structure">
                <Row k="Divisions" v={String(totals.divisions)} />
                <Row k="Teams" v={String(totals.teams)} />
                <Row k="Participants" v={String(totals.participants)} />
              </SummaryCard>
            </div>

            {divisions.length > 0 && (
              <div className="mt-6 rounded-xl border border-border bg-card p-6 text-sm">
                <div className="font-display text-lg tracking-tight">{org.orgName || "Organization"}</div>
                <ul className="mt-3 space-y-2">
                  {divisions.map((d) => (
                    <li key={d.id}>
                      <span className="font-semibold">{d.name}</span>
                      <ul className="ml-5 mt-1 space-y-1 text-muted-foreground">
                        {d.teams.map((t) => (
                          <li key={t.id}>
                            {t.name}
                            {t.participants.length > 0 && (
                              <span> — {t.participants.map((p) => p.name).join(", ")}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <OptInPlaceholder />

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
                style={{ background: "#13294B" }}
              >
                Back to FanPact Home
              </Link>
              <Link
                to="/center-grove"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold uppercase tracking-wider"
              >
                See an example storefront
              </Link>
            </div>
          </div>
        )}

        {/* NAV */}
        {step < 6 && (
          <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <Button variant="ghost" onClick={back} disabled={step === 1} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={next}
              disabled={
                (step === 2 && !orgValid) ||
                (step === 3 && !agreementValid) ||
                (step === 4 && !fund)
              }
              className="gap-2"
              style={{ background: "#13294B", color: "#fff" }}
            >
              {step === 5 ? "Review & finish" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        maxLength={200}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{title}</div>
      <dl className="mt-4 space-y-2 text-sm">{children}</dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v?.trim() ? v : "—"}</dd>
    </div>
  );
}

function StructureBuilder({
  orgName,
  divisions,
  setDivisions,
}: {
  orgName: string;
  divisions: Division[];
  setDivisions: (d: Division[]) => void;
}) {
  const [divName, setDivName] = useState("");

  const addDivision = () => {
    if (!divName.trim()) return;
    setDivisions([...divisions, { id: uid(), name: divName.trim(), teams: [] }]);
    setDivName("");
  };

  const update = (id: string, fn: (d: Division) => Division) =>
    setDivisions(divisions.map((d) => (d.id === id ? fn(d) : d)));

  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <Layers className="h-4 w-4" /> Step 5 · Organization structure
      </div>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Build your structure</h1>
      <p className="mt-4 text-muted-foreground">
        Add divisions, then teams within each division, then optionally participants.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="font-display text-2xl tracking-tight">{orgName}</div>

        <div className="mt-5 space-y-5">
          {divisions.map((d) => (
            <DivisionBlock
              key={d.id}
              division={d}
              onChange={(fn) => update(d.id, fn)}
              onRemove={() => setDivisions(divisions.filter((x) => x.id !== d.id))}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Input
            placeholder="Division name (e.g. 12U, Softball, Fall Travel)"
            maxLength={80}
            value={divName}
            onChange={(e) => setDivName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDivision())}
          />
          <Button onClick={addDivision} className="gap-2 whitespace-nowrap" style={{ background: "#13294B", color: "#fff" }}>
            <Plus className="h-4 w-4" /> Add division
          </Button>
        </div>
      </div>

      <OptInPlaceholder />
    </div>
  );
}

function DivisionBlock({
  division,
  onChange,
  onRemove,
}: {
  division: Division;
  onChange: (fn: (d: Division) => Division) => void;
  onRemove: () => void;
}) {
  const [teamName, setTeamName] = useState("");

  const addTeam = () => {
    if (!teamName.trim()) return;
    onChange((d) => ({
      ...d,
      teams: [...d.teams, { id: uid(), name: teamName.trim(), participants: [] }],
    }));
    setTeamName("");
  };

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <Layers className="h-4 w-4 text-muted-foreground" />
          {division.name}
        </div>
        <button onClick={onRemove} aria-label={`Remove ${division.name}`} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-4 mt-4 space-y-3 border-l border-border pl-4">
        {division.teams.map((t) => (
          <TeamBlock
            key={t.id}
            team={t}
            onChange={(fn) =>
              onChange((d) => ({
                ...d,
                teams: d.teams.map((x) => (x.id === t.id ? fn(x) : x)),
              }))
            }
            onRemove={() =>
              onChange((d) => ({ ...d, teams: d.teams.filter((x) => x.id !== t.id) }))
            }
          />
        ))}

        <div className="flex gap-2">
          <Input
            placeholder="Team name (e.g. 12U Black — Coach Ellis)"
            maxLength={80}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTeam())}
          />
          <Button variant="outline" onClick={addTeam} className="gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" /> Add team
          </Button>
        </div>
      </div>
    </div>
  );
}

function TeamBlock({
  team,
  onChange,
  onRemove,
}: {
  team: Team;
  onChange: (fn: (t: Team) => Team) => void;
  onRemove: () => void;
}) {
  const [name, setName] = useState("");

  const addParticipant = () => {
    if (!name.trim()) return;
    onChange((t) => ({ ...t, participants: [...t.participants, { id: uid(), name: name.trim() }] }));
    setName("");
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Users className="h-4 w-4 text-muted-foreground" />
          {team.name}
        </div>
        <button onClick={onRemove} aria-label={`Remove ${team.name}`} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-4 mt-3 space-y-2 border-l border-border pl-4">
        {team.participants.length > 0 && (
          <ul className="space-y-1 text-sm text-muted-foreground">
            {team.participants.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3">
                {p.name}
                <button
                  onClick={() =>
                    onChange((t) => ({
                      ...t,
                      participants: t.participants.filter((x) => x.id !== p.id),
                    }))
                  }
                  aria-label={`Remove ${p.name}`}
                  className="hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="Participant name (optional)"
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addParticipant())}
          />
          <Button variant="ghost" size="sm" onClick={addParticipant} className="whitespace-nowrap">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

function OptInPlaceholder() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl tracking-tight">Team &amp; Family Opt-In</h2>
            <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Coming soon
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Once your structure is set up, individual teams and families will be invited
            to opt in and activate their own participation.
          </p>
        </div>
        <Button disabled variant="outline">
          Invite teams &amp; families
        </Button>
      </div>
    </div>
  );
}
