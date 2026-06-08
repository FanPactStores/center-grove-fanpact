import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/legacy/my-list")({
  head: () => ({ meta: [{ title: "My List — Legacy × FanPact" }] }),
  component: () => <MyListPage store={STORES.legacy} />,
});
