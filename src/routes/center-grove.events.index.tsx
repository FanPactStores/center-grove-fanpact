import { createFileRoute } from "@tanstack/react-router";
import { EventsListPage } from "@/components/fanpact/EventsListPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/center-grove/events/")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Center Grove × FanPact" },
      { name: "description", content: "Camps, community nights, and partner activations for Center Grove families and athletes." },
    ],
  }),
  component: () => <EventsListPage store={STORES["center-grove"]} />,
});
