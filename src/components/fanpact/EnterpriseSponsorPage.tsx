import { Fragment, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";
import type { EnterprisePartner, FormField } from "@/data/enterprise-partners";
import type { StoreConfig } from "@/data/stores";

const NAVY = "#13294B";
const NAVY_DEEPER = "#0d1d36";
const GOLD = "#BA7517";
const GOLD_SOFT = "rgba(186,117,23,0.12)";

type Props = {
  store: StoreConfig;
  partner: EnterprisePartner;
};

export function EnterpriseSponsorPage({ store, partner }: Props) {
  const [activeTab, setActiveTab] = useState(
    partner.pathSection?.tabs[0]?.key ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setVal = (name: string, v: string | string[]) => {
    setValues((p) => ({ ...p, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const toggleCheck = (name: string, opt: string) => {
    const cur = (values[name] as string[] | undefined) ?? [];
    const next = cur.includes(opt) ? cur.filter((c) => c !== opt) : [...cur, opt];
    setVal(name, next);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    for (const f of partner.formFields) {
      if (!f.required) continue;
      const v = values[f.name];
      if (!v || (typeof v === "string" && v.trim().length === 0)) {
        newErrors[f.name] = `${f.label} is required`;
      }
      if (f.type === "email" && typeof v === "string" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        newErrors[f.name] = "Enter a valid email";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thanks — your $75 credit is on its way.", {
        description: `${partner.shortName} will be in touch shortly.`,
      });
    }, 700);
  };

  const partnerHrefBack = `${store.basePath}/sponsors`;

  const StepArrow = () => (
    <div className="hidden items-center justify-center md:flex">
      <ChevronRight className="h-8 w-8" style={{ color: GOLD, opacity: 0.5 }} />
    </div>
  );

  return (
    <main className="bg-white">
      {/* BREADCRUMB + BACK */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-foreground">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to={store.basePath as string} className="hover:text-foreground">{store.shortName}</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to={partnerHrefBack as string} className="hover:text-foreground">Sponsors</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">{partner.shortName}</li>
            </ol>
          </nav>
          <Link
            to={partnerHrefBack as string}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline"
            style={{ color: NAVY }}
          >
            ← Back to Sponsors
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={partner.heroImage}
          alt={partner.heroAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(13,29,54,0.78) 55%, rgba(19,41,75,0.7) 100%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ background: GOLD_SOFT, color: GOLD, border: `1px solid ${GOLD}` }}
            >
              <Star className="h-3 w-3" /> {partner.badge}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-white">
              {partner.headline}
            </h1>
            <p className="mt-4 font-display text-xl tracking-tight md:text-2xl" style={{ color: "#FACC15" }}>
              {partner.subheadline}
            </p>
            <p className="mt-6 max-w-2xl text-base text-white md:text-lg">{partner.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02]"
                style={{ background: GOLD, color: "#0b1220" }}
              >
                {partner.primaryCta} <ArrowRight className="h-4 w-4" />
              </button>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                style={{ background: GOLD, color: "#0b1220" }}
              >
                {partner.creditBadge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 text-center text-white">
            <div className="text-xs uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              Three Steps · Real Credits
            </div>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              Your Credit Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {partner.steps.map((s, i) => (
              <Fragment key={s.title}>
                <div
                  className="flex flex-col rounded-2xl border p-6"
                  style={{
                    background: NAVY_DEEPER,
                    borderColor: GOLD,
                    color: "white",
                  }}
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: GOLD }}
                  >
                    {s.label}
                  </div>
                  <h3 className="mt-2 font-display text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-white/80">{s.body}</p>
                  <div
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{ background: GOLD, color: "#0b1220" }}
                  >
                    <Check className="h-3.5 w-3.5" />
                    {s.credit}
                  </div>
                </div>
                {i < partner.steps.length - 1 && <StepArrow />}
              </Fragment>
            ))}
          </div>

          <div className="mt-10 text-center text-white">
            <p className="font-display text-2xl tracking-tight" style={{ color: GOLD }}>
              {partner.totalCredits}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-white/60">
              {partner.creditsDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* MIDDLE BENEFITS SECTION */}
      <section className="py-20" style={{ background: NAVY_DEEPER }}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 max-w-3xl text-white">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: GOLD }}>
              {partner.middleSectionTitle}
            </h2>
            <p className="mt-4 text-white/85">{partner.middleSectionSubhead}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partner.benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border p-6 text-white"
                style={{ background: NAVY, borderColor: "rgba(186,117,23,0.35)" }}
              >
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: GOLD_SOFT, color: GOLD }}
                >
                  <b.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-white/75">{b.body}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-10 rounded-2xl border p-8 text-center"
            style={{ background: GOLD, color: "#0b1220", borderColor: GOLD }}
          >
            <p className="mx-auto max-w-3xl font-display text-lg md:text-xl">
              {partner.benefitsCalloutBody}
            </p>
            {partner.benefitsCalloutCta && (
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#0b1220] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-black"
              >
                {partner.benefitsCalloutCta} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* OPTIONAL PATH SECTION (USAREC) */}
      {partner.pathSection && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                {partner.pathSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{partner.pathSection.body}</p>
            </div>

            <div className="mb-8 inline-flex rounded-full border p-1" style={{ borderColor: NAVY }}>
              {partner.pathSection.tabs.map((t) => {
                const active = t.key === activeTab;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className="rounded-full px-6 py-2 text-sm font-semibold transition-colors"
                    style={{
                      background: active ? NAVY : "transparent",
                      color: active ? "white" : NAVY,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {partner.pathSection.tabs
              .filter((t) => t.key === activeTab)
              .map((t) => (
                <div key={t.key} className="grid gap-5 md:grid-cols-2">
                  {t.cards.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border p-6"
                      style={{ borderColor: "rgba(19,41,75,0.15)", background: "white" }}
                    >
                      <h3 className="font-display text-xl tracking-tight" style={{ color: NAVY }}>
                        {c.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                      {c.pills && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {c.pills.map((p) => (
                            <span
                              key={p}
                              className="rounded-full border px-3 py-1 text-xs font-medium"
                              style={{ borderColor: GOLD, color: NAVY }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* AUDIENCE GRID (Edward Jones) */}
      {partner.audienceSection && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                {partner.audienceSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{partner.audienceSection.subhead}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {partner.audienceSection.cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border-t-4 bg-white p-7 shadow-sm"
                  style={{ borderTopColor: c.accent, borderColor: "rgba(19,41,75,0.12)" }}
                >
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ background: `${c.accent}1a`, color: c.accent }}
                  >
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight" style={{ color: NAVY }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.pills.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border px-3 py-1 text-[11px] font-medium"
                        style={{ borderColor: c.accent, color: c.accent }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}
      {partner.educationSection && (
        <section className="py-20" style={{ background: "#f6f7f9" }}>
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                {partner.educationSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{partner.educationSection.subhead}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partner.educationSection.cards.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-col rounded-2xl border bg-white p-6"
                  style={{ borderColor: "rgba(19,41,75,0.12)" }}
                >
                  <span
                    className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: GOLD_SOFT, color: GOLD }}
                  >
                    {c.tag}
                  </span>
                  <h3 className="mt-4 font-display text-lg tracking-tight" style={{ color: NAVY }}>
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.body}</p>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="mt-4 inline-flex items-center gap-1 self-start text-xs font-semibold uppercase tracking-wider"
                    style={{ color: GOLD }}
                  >
                    Learn More <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACCOUNT TYPES */}
      {partner.accountTypesSection && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
                {partner.accountTypesSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{partner.accountTypesSection.subhead}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partner.accountTypesSection.items.map((it) => (
                <div
                  key={it.title}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "rgba(19,41,75,0.15)", background: "white" }}
                >
                  <h3 className="font-display text-base tracking-tight" style={{ color: NAVY }}>
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
                </div>
              ))}
            </div>
            <div
              className="mt-8 rounded-2xl border p-7 text-center"
              style={{ background: GOLD, color: "#0b1220", borderColor: GOLD }}
            >
              <p className="mx-auto max-w-3xl font-display text-lg md:text-xl">
                {partner.accountTypesSection.callout}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* COMPLIANCE NOTE */}
      {partner.complianceNote && (
        <section className="py-14" style={{ background: NAVY_DEEPER }}>
          <div className="mx-auto max-w-4xl px-4 text-center text-white lg:px-8">
            <h3 className="font-display text-2xl tracking-tight" style={{ color: GOLD }}>
              {partner.complianceNote.title}
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/80">
              {partner.complianceNote.body}
            </p>
          </div>
        </section>
      )}

      {/* STATS BAR */}
      {partner.statsBar && (
        <section className="border-y py-10" style={{ background: NAVY, borderColor: GOLD }}>
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {partner.statsBar.map((s) => (
              <div
                key={s}
                className="rounded-full px-5 py-3 text-center text-sm font-semibold"
                style={{ background: NAVY_DEEPER, color: GOLD, border: `1px solid ${GOLD}` }}
              >
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FORM */}
      <section id="partner-form" className="py-20" style={{ background: "#f6f7f9" }}>
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl" style={{ color: NAVY }}>
              {partner.formTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{partner.formBody}</p>
          </div>

          <div
            className="mb-6 rounded-xl border-2 p-4 text-center text-sm font-semibold"
            style={{ borderColor: GOLD, background: GOLD_SOFT, color: NAVY }}
          >
            {partner.formCreditCallout}
          </div>

          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-center gap-3">
            {[1, 2, 3].map((n) => {
              const active = n === 1;
              return (
                <div key={n} className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: active ? GOLD : "white",
                      color: active ? "#0b1220" : NAVY,
                      border: `2px solid ${active ? GOLD : "rgba(19,41,75,0.25)"}`,
                    }}
                  >
                    {n}
                  </div>
                  {n < 3 && (
                    <div className="h-px w-8" style={{ background: "rgba(19,41,75,0.25)" }} />
                  )}
                </div>
              );
            })}
          </div>

          {submitted ? (
            <div
              className="rounded-2xl border-2 p-10 text-center"
              style={{ borderColor: GOLD, background: "white" }}
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: GOLD }}
              >
                <Check className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-tight" style={{ color: NAVY }}>
                You're in — Step 1 complete.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Your $75 community credit has been queued. {partner.shortName} will be in touch
                within their standard follow-up window.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
              style={{ borderColor: "rgba(19,41,75,0.12)" }}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {partner.formFields.map((f) => (
                  <FieldRenderer
                    key={f.name}
                    field={f}
                    value={values[f.name]}
                    error={errors[f.name]}
                    onChange={(v) => setVal(f.name, v)}
                    onToggle={(opt) => toggleCheck(f.name, opt)}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-sm font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-[1.01] disabled:opacity-60"
                style={{ background: GOLD, color: "#0b1220" }}
              >
                {submitting ? "Submitting…" : partner.submitLabel}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <div className="mt-5 space-y-2 text-center text-xs text-muted-foreground">
                {partner.formFootnotes.map((fn) => (
                  <p key={fn}>{fn}</p>
                ))}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="border-t" style={{ background: NAVY, borderColor: GOLD }}>
        <div className="mx-auto max-w-5xl px-4 py-8 text-center lg:px-8">
          <p className="text-xs text-white/70">
            This enterprise sponsor campaign is funded by {partner.name}. Participation is
            voluntary. Community credits are subject to FanPact's standard verification and
            escrow terms. Credits are illustrative for demo purposes.
          </p>
        </div>
      </section>
    </main>
  );
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
  onToggle,
}: {
  field: FormField;
  value: string | string[] | undefined;
  error?: string;
  onChange: (v: string) => void;
  onToggle: (opt: string) => void;
}) {
  const baseClass =
    "w-full rounded-md border bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2";
  const borderStyle = {
    borderColor: error ? "#dc2626" : "rgba(19,41,75,0.18)",
  } as React.CSSProperties;

  const span = field.half ? "md:col-span-1" : "md:col-span-2";
  const id = `field-${field.name}`;

  const label = (
    <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: NAVY }}>
      {field.label}
      {field.required && <span style={{ color: GOLD }}> *</span>}
    </label>
  );

  if (field.type === "textarea") {
    return (
      <div className={span}>
        {label}
        <textarea
          id={id}
          rows={4}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          style={{ ...borderStyle, ['--tw-ring-color' as never]: GOLD }}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={span}>
        {label}
        <select
          id={id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          style={{ ...borderStyle, ['--tw-ring-color' as never]: GOLD }}
        >
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (field.type === "radio") {
    const v = (value as string) ?? "";
    return (
      <div className={span}>
        {label}
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => {
            const active = v === o;
            return (
              <button
                type="button"
                key={o}
                onClick={() => onChange(o)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: active ? GOLD : "rgba(19,41,75,0.25)",
                  background: active ? GOLD : "white",
                  color: active ? "#0b1220" : NAVY,
                }}
              >
                {o}
              </button>
            );
          })}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (field.type === "checkbox-group") {
    const arr = (value as string[] | undefined) ?? [];
    return (
      <div className="md:col-span-2">
        {label}
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options?.map((o) => {
            const checked = arr.includes(o);
            return (
              <label
                key={o}
                className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm"
                style={{
                  borderColor: checked ? GOLD : "rgba(19,41,75,0.18)",
                  background: checked ? GOLD_SOFT : "white",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(o)}
                  className="h-4 w-4"
                  style={{ accentColor: GOLD }}
                />
                <span style={{ color: NAVY }}>{o}</span>
              </label>
            );
          })}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className={span}>
      {label}
      <input
        id={id}
        type={field.type}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        style={{ ...borderStyle, ['--tw-ring-color' as never]: GOLD }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
