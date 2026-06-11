import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/assa/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — ASSA × FanPact" },
      { name: "description", content: "The commercial ecosystem powering ASSA Combat and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES.assa} />,
});
