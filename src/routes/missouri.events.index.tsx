import { createFileRoute } from "@tanstack/react-router";
import { EventsListPage } from "@/components/fanpact/EventsListPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/missouri/events/")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Mizzou Athletics × FanPact" },
      { name: "description", content: "Camps, community nights, and partner activations for Missouri families and athletes." },
    ],
  }),
  component: () => <EventsListPage store={STORES.missouri} />,
});
