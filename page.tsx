'use client';

import { useMemo, useState } from 'react';
import type { Category } from '@/types/pos';
import { CATALOG_PRODUCTS } from '@/data/catalog';
import Header from '@/components/pos/Header';
import ProductCard from '@/components/pos/ProductCard';
import Cart from '@/components/pos/Cart';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesQuery = query.length === 0 || product.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F4EFE3] pb-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-6 sm:px-6 lg:grid lg:grid-cols-3 lg:items-start">
        {/* Left two-thirds on desktop, full width above the cart on mobile. */}
        <section className="lg:col-span-2">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD3C0] bg-[#FFFCF7]/60 px-4 py-16 text-center">
              <p className="text-sm text-[#2B2118]/60">
                {searchQuery ? `No products match "${searchQuery}".` : 'No products in this category yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Right one-third on desktop, pinned while the product grid scrolls. */}
        <aside className="lg:sticky lg:top-20 lg:col-span-1 lg:h-[calc(100vh-6rem)]">
          <Cart />
        </aside>
      </main>
    </div>
  );
}
