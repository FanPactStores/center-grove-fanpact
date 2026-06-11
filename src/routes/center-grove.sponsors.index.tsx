import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/center-grove/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — Center Grove × FanPact" },
      { name: "description", content: "The commercial ecosystem powering Center Grove and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES["center-grove"]} />,
});
