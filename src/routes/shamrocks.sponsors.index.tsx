import { createFileRoute } from "@tanstack/react-router";
import { UnifiedSponsorsPage } from "@/components/fanpact/UnifiedSponsorsPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/shamrocks/sponsors/")({
  head: () => ({
    meta: [
      { title: "Sponsors, Partners & Brands — Springfield Shamrocks × FanPact" },
      { name: "description", content: "The commercial ecosystem powering Springfield Shamrocks and the FanPact community — national brands, local partners, and enterprise partners." },
    ],
  }),
  component: () => <UnifiedSponsorsPage store={STORES["shamrocks"]} />,
});
