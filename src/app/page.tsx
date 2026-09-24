"use client";

import { useMemo, useState } from "react";
import Cart from "@/components/pos/Cart";
import ProductGrid from "@/components/pos/ProductGrid";
import SearchBar, { type CategoryFilter } from "@/components/pos/SearchBar";
import {
  mockProducts,
  type CartItem,
  type PackageType,
  type Product,
} from "@/data/mockProducts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return mockProducts.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  function addToCart(product: Product, packageType: PackageType) {
    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          item.product.id === product.id && item.packageType === packageType,
      );

      if (existingIndex === -1) {
        return [...current, { product, quantity: 1, packageType }];
      }

      return current.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function increment(index: number) {
    setCart((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrement(index: number) {
    setCart((current) =>
      current.flatMap((item, itemIndex) => {
        if (itemIndex !== index) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }

  function remove(index: number) {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
          Point of sale
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
          Super Noe POS
        </h1>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-stretch lg:p-6">
        <section className="flex min-h-0 flex-col gap-4">
          <SearchBar
            query={query}
            category={category}
            onQueryChange={setQuery}
            onCategoryChange={setCategory}
          />
          <ProductGrid products={filteredProducts} onAdd={addToCart} />
        </section>

        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-7.5rem)]">
          <Cart
            items={cart}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={remove}
          />
        </div>
      </main>
    </div>
  );
}
