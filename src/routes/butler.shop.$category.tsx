import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { STORES } from "@/data/stores";
import { ProductCard } from "@/components/fanpact/ProductCard";
import { CategorySidebar } from "@/components/fanpact/CategorySidebar";

export const Route = createFileRoute("/butler/shop/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat, products: getProductsByCategory(cat.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.name ?? "Category"} — Butler × FanPact` },
      { name: "description", content: loaderData?.category.blurb ?? "" },
    ],
  }),
  errorComponent: () => <ErrorView />,
  notFoundComponent: () => <ErrorView />,
  component: ButlerCategory,
});

function ErrorView() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <h1 className="font-display text-4xl tracking-tight">Category not found</h1>
      <p className="mt-3 text-muted-foreground">That category doesn't exist in the Butler store.</p>
      <Link to="/butler/shop" className="mt-6 inline-block text-sm underline">Back to all products</Link>
    </main>
  );
}

function ButlerCategory() {
  const { category, products } = Route.useLoaderData();
  const store = STORES.butler;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <Link to="/butler/shop" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          ← All categories
        </Link>
        <h1 className="mt-3 font-display text-5xl tracking-tight">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{category.blurb}</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <CategorySidebar basePath={store.basePath} activeSlug={category.slug} />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p: import("@/data/products").Product) => (
            <ProductCard key={p.id} product={p} basePath={store.basePath} />
          ))}
        </div>
      </div>
    </main>
  );
}
