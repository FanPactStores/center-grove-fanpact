import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { getCategory, type Category } from "@/data/categories";
import { getProductsByCategory, type Product } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { CategorySidebar } from "@/components/fanpact/CategorySidebar";
import { PageSearchBar, matchesSearch } from "@/components/fanpact/SearchBar";

export const Route = createFileRoute("/cmn/st-johns/shop/$category")({
  validateSearch: (search: Record<string, unknown>): { search?: string } => ({
    search: typeof search.search === "string" && search.search ? search.search : undefined,
  }),
  loader: ({ params }): { category: Category; products: Product[] } => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat, products: getProductsByCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.category.name ?? "Category"} — HSHS St. John's Children's Hospital × FanPact`,
      },
      { name: "description", content: loaderData?.category.blurb ?? "" },
      { property: "og:title", content: `${loaderData?.category.name ?? "Shop"} — St. John's Children's` },
      { property: "og:description", content: loaderData?.category.blurb ?? "" },
    ],
  }),
  errorComponent: () => <ErrorView />,
  notFoundComponent: () => <ErrorView />,
  component: StJohnsCategory,
});

function ErrorView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Category not found</h1>
      <Link to="/cmn/st-johns/shop" className="mt-6 inline-block text-sm underline">
        Back to all products
      </Link>
    </main>
  );
}

function StJohnsCategory() {
  const { category, products } = Route.useLoaderData() as {
    category: Category;
    products: Product[];
  };
  const store = STORES["cmn-st-johns"];
  const query = (Route.useSearch() as { search?: string }).search ?? "";
  const navigate = useNavigate();

  const setQuery = (v: string) =>
    navigate({
      to: "/cmn/st-johns/shop/$category",
      params: { category: category.slug },
      search: v ? { search: v } : {},
      replace: true,
    });

  const visible = products.filter((p) => matchesSearch(query, [p.name, p.brand]));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/cmn/st-johns/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      <h1 className="mt-3 font-display text-5xl tracking-tight">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{category.blurb}</p>

      <div className="my-8">
        <PageSearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <CategorySidebar basePath={store.basePath} activeSlug={category.slug} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} basePath={store.basePath} storeId={store.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
