import { createFileRoute } from "@tanstack/react-router";
import { EventsListPage } from "@/components/fanpact/EventsListPage";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/butler/events/")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Butler Athletics × FanPact" },
      { name: "description", content: "Camps, community nights, and partner activations for Butler families and athletes." },
    ],
  }),
  component: () => <EventsListPage store={STORES.butler} />,
});
