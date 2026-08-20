import { createFileRoute } from "@tanstack/react-router";
import { STORES } from "@/data/stores";
import { MyListPage } from "@/components/fanpact/MyListPage";

export const Route = createFileRoute("/shamrocks/my-list")({
  head: () => ({ meta: [{ title: "My List — Springfield Shamrocks × FanPact" }] }),
  component: () => <MyListPage store={STORES["shamrocks"]} />,
});
