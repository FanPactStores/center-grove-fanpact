import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/missouri/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — Missouri × FanPact" },
      { name: "description", content: "The commercial ecosystem powering Missouri and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES.missouri} />,
});
