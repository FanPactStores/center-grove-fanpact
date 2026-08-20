import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/missouri/my-list")({
  head: () => ({ meta: [{ title: "My List — Missouri × FanPact" }] }),
  component: () => <MyListPage store={STORES.missouri} />,
});
