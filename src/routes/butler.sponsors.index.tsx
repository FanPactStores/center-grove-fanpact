import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/butler/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — Butler × FanPact" },
      { name: "description", content: "The commercial ecosystem powering Butler and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES.butler} />,
});
