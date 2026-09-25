'use client';

import { Package, Plus } from 'lucide-react';
import type { Category, Product } from '@/types/pos';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

/**
 * Category → badge color mapping. Tied to real packaging cues rather than
 * arbitrary color: bottle green for beverages, crust gold for fresh bread,
 * and the red/white of a Gansito wrapper for packaged snack cakes.
 */
const CATEGORY_BADGE: Record<Category, string> = {
  Bebidas: 'bg-[#2F5D4E]/10 text-[#2F5D4E]',
  'Pan Dulce': 'bg-[#E8A23A]/15 text-[#B0742A]',
  Pastelitos: 'bg-[#B23A2E]/10 text-[#B23A2E]',
  Todos: 'bg-[#2B2118]/10 text-[#2B2118]',
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2118] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF7]';

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#DCD3C0] bg-[#FFFCF7] p-4 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE[product.category]}`}
        >
          {product.category}
        </span>

        <h3 className="mt-2 text-base font-semibold leading-snug text-[#2B2118]">
          {product.name}
        </h3>

        {/* Business rule: wholesale cost never appears in this view. */}
        <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#2B2118]">
          {currency.format(product.retailPriceUnit)}
          <span className="ml-1 text-sm font-normal text-[#2B2118]/50">/ unit</span>
        </p>
      </div>

      {product.allowsCrates ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addItem(product, 'unit')}
            className={`flex flex-col items-center gap-0.5 rounded-xl bg-[#E8A23A] px-3 py-2.5 text-[#2B2118] transition-colors hover:bg-[#DA9530] active:bg-[#C98526] ${FOCUS_RING}`}
          >
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              Add Unit
            </span>
          </button>

          <button
            type="button"
            onClick={() => addItem(product, 'crate')}
            className={`flex flex-col items-center gap-0.5 rounded-xl bg-[#2F5D4E] px-3 py-2.5 text-[#FFFCF7] transition-colors hover:bg-[#274D40] active:bg-[#1F3F35] ${FOCUS_RING}`}
          >
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Package className="h-3.5 w-3.5" strokeWidth={2.5} />
              Add Crate
            </span>
            {product.retailPriceCrate !== undefined && (
              <span className="font-mono text-xs tabular-nums opacity-90">
                {currency.format(product.retailPriceCrate)}
              </span>
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => addItem(product, 'unit')}
          className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#E8A23A] px-3 py-2.5 text-sm font-semibold text-[#2B2118] transition-colors hover:bg-[#DA9530] active:bg-[#C98526] ${FOCUS_RING}`}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add Unit
        </button>
      )}
    </div>
  );
}
