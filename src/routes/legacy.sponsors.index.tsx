import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/legacy/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — Legacy × FanPact" },
      { name: "description", content: "The commercial ecosystem powering Legacy Performance Academy and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES.legacy} />,
});
