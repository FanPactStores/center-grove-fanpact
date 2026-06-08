import { Link } from "@tanstack/react-router";
import type { StoreConfig } from "@/data/stores";
import { resetStoreState } from "@/lib/designation";
import { toast } from "sonner";

export function StoreFooter({ store }: { store: StoreConfig }) {
  return (
    <footer
      className="mt-24 border-t border-border"
      style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="font-display text-3xl tracking-tight">{store.marks.word}</div>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] opacity-70">
            Powered by FanPact
          </p>
          <p className="mt-6 max-w-md text-sm opacity-80">
            {store.fundName}. 60% of net earnings on every purchase flows back to the community.
            No extra cost, no fundraising ask, no behavior change required.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] opacity-60">Shop</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to={`${store.basePath}/shop` as "/butler/shop"} className="hover:underline">All categories</Link></li>
            <li><Link to={`${store.basePath}/team-card` as "/butler/team-card"} className="hover:underline">Team Card</Link></li>
            <li><Link to={`${store.basePath}/sponsors` as "/butler/sponsors"} className="hover:underline">Sponsors</Link></li>
            <li><Link to={`${store.basePath}/teams` as "/butler/teams"} className="hover:underline">Teams & rosters</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] opacity-60">Platform</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">FanPact home</Link></li>
            <li><Link to="/butler" className="hover:underline">Butler store</Link></li>
            <li><Link to="/center-grove" className="hover:underline">Center Grove store</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} FanPact, Inc. All brand marks belong to their owners.</span>
          <span className="flex items-center gap-3">
            <span>Demo storefront — products and contributions are illustrative.</span>
            <button
              onClick={() => {
                resetStoreState(store.id);
                toast.success("Demo reset — refresh to see the welcome flow.");
              }}
              className="rounded border border-white/30 px-2 py-0.5 font-semibold uppercase tracking-wider hover:bg-white/10"
            >
              Reset demo
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
