import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/butler/my-list")({
  head: () => ({ meta: [{ title: "My List — Butler × FanPact" }] }),
  component: () => <MyListPage store={STORES.butler} />,
});
