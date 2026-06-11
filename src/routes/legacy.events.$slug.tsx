import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { EventDetailPage } from "@/components/fanpact/EventDetailPage";
import { getEvent } from "@/data/events";
import { STORES } from "@/data/stores";

export const Route = createFileRoute("/legacy/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent("legacy", params.slug);
    if (!event) throw notFound();
    return { slug: event.slug };
  },
  head: ({ loaderData }) => {
    const event = loaderData ? getEvent("legacy", loaderData.slug) : null;
    return {
      meta: [
        { title: `${event?.name ?? "Event"} — Legacy × FanPact` },
        { name: "description", content: event?.subtitle ?? "" },
      ],
    };
  },
  errorComponent: () => <NotFound />,
  notFoundComponent: () => <NotFound />,
  component: EventRoute,
});

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Event not found</h1>
      <Link to="/legacy/events" className="mt-6 inline-block text-sm underline">All events</Link>
    </main>
  );
}

function EventRoute() {
  const { slug } = Route.useLoaderData();
  const event = getEvent("legacy", slug);
  if (!event) return <NotFound />;
  return <EventDetailPage store={STORES.legacy} event={event} />;
}
