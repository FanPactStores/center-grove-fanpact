import { createFileRoute } from "@tanstack/react-router";
import { EventsListPage } from "@/components/fanpact/EventsListPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/legacy/events/")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Legacy Performance Academy × FanPact" },
      { name: "description", content: "Camps and FanPact events for Legacy & Klutch families and athletes." },
    ],
  }),
  component: () => <EventsListPage store={STORES.legacy} />,
});
