import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/assa/my-list")({
  head: () => ({ meta: [{ title: "My List — ASSA × FanPact" }] }),
  component: () => <MyListPage store={STORES.assa] },
});
