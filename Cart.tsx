'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { selectCartCount, selectCartTotal, useCartStore } from '@/store/useCartStore';

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2118] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF7]';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#DCD3C0] bg-[#FFFCF7] shadow-sm">
      <div className="border-b-4 border-double border-[#DCD3C0] px-4 py-3">
        <h2 className="text-base font-semibold text-[#2B2118]">Current ticket</h2>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-4 py-10 text-center text-sm text-[#2B2118]/50">
          No items yet. Tap a product to start the ticket.
        </div>
      ) : (
        <ul className="flex-1 divide-y divide-dotted divide-[#DCD3C0] overflow-y-auto px-4">
          {items.map((item) => (
            <li key={`${item.product.id}-${item.unitType}`} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-[#2B2118]">{item.product.name}</p>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      item.unitType === 'crate'
                        ? 'bg-[#2F5D4E]/10 text-[#2F5D4E]'
                        : 'bg-[#E8A23A]/15 text-[#B0742A]'
                    }`}
                  >
                    {item.unitType === 'crate' ? 'Crate' : 'Unit'}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.unitType, -1)}
                    aria-label={`Decrease quantity of ${item.product.name}`}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#DCD3C0] text-[#2B2118] transition-colors hover:border-[#2B2118]/40 ${FOCUS_RING}`}
                  >
                    <Minus className="h-3 w-3" strokeWidth={2.5} />
                  </button>

                  <span className="w-5 text-center font-mono text-sm tabular-nums text-[#2B2118]">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.unitType, 1)}
                    aria-label={`Increase quantity of ${item.product.name}`}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#DCD3C0] text-[#2B2118] transition-colors hover:border-[#2B2118]/40 ${FOCUS_RING}`}
                  >
                    <Plus className="h-3 w-3" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <p className="shrink-0 font-mono text-sm font-semibold tabular-nums text-[#2B2118]">
                {currency.format(item.subtotal)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.product.id, item.unitType)}
                aria-label={`Remove ${item.product.name} from cart`}
                className={`shrink-0 rounded text-[#B23A2E]/60 transition-colors hover:text-[#B23A2E] ${FOCUS_RING}`}
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="sticky bottom-0 border-t-2 border-dashed border-[#DCD3C0] bg-[#FFFCF7] px-4 py-3">
        <div className="flex items-center justify-between text-sm text-[#2B2118]/60">
          <span>
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-base font-semibold text-[#2B2118]">Total</span>
          <span className="font-mono text-xl font-bold tabular-nums text-[#2B2118]">
            {currency.format(cartTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
