import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/center-grove/my-list")({
  head: () => ({ meta: [{ title: "My List — Center Grove × FanPact" }] }),
  component: () => <MyListPage store={STORES["center-grove"]} />,
});
