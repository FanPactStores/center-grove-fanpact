import { createFileRoute } from "@tanstack/react-router";
import { EventsListPage } from "@/components/fanpact/EventsListPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/assa/events/")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — ASSA × FanPact" },
      { name: "description", content: "Camps and FanPact events for ASSA Combat families across all eight hubs." },
    ],
  }),
  component: () => <EventsListPage store={STORES.assa} />,
});
