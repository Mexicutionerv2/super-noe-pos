"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  formatCurrency,
  getPackageSrp,
  type CartItem,
} from "@/data/mockProducts";

interface CartProps {
  items: CartItem[];
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  onRemove: (index: number) => void;
}

export default function Cart({
  items,
  onIncrement,
  onDecrement,
  onRemove,
}: CartProps) {
  const total = items.reduce((sum, item) => {
    return sum + getPackageSrp(item.product, item.packageType) * item.quantity;
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
        <ShoppingCart className="size-5 text-emerald-700" aria-hidden />
        <h2 className="text-sm font-semibold text-zinc-900">Current order</h2>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
          {itemCount}
        </span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Tap a product to add it to the cart.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item, index) => {
              const unitSrp = getPackageSrp(item.product, item.packageType);
              const lineTotal = unitSrp * item.quantity;
              const packageLabel =
                item.packageType === "crate"
                  ? `Crate × ${item.product.piecesPerCrate}`
                  : "Unit";

              return (
                <li
                  key={`${item.product.id}-${item.packageType}`}
                  className="rounded-xl bg-zinc-50 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-500">{packageLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className="rounded-lg p-1 text-zinc-400 hover:bg-white hover:text-red-600"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onDecrement(index)}
                        className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-700 ring-1 ring-zinc-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrement(index)}
                        className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-700 ring-1 ring-zinc-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {formatCurrency(lineTotal)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <footer className="border-t border-zinc-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">Total (SRP)</span>
          <span className="text-xl font-semibold tracking-tight text-zinc-900">
            {formatCurrency(total)}
          </span>
        </div>
      </footer>
    </aside>
  );
}
