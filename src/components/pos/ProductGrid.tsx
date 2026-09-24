"use client";

import { Package, Plus } from "lucide-react";
import {
  formatCurrency,
  getPackageSrp,
  getPackageWholesale,
  type PackageType,
  type Product,
} from "@/data/mockProducts";

interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product, packageType: PackageType) => void;
}

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-12 text-center text-sm text-zinc-500">
        No products match your search.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAdd={onAdd} />
        </li>
      ))}
    </ul>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, packageType: PackageType) => void;
}) {
  const canSellByCrate = product.piecesPerCrate > 1;
  const packageType: PackageType = product.defaultPackage;
  const wholesale = getPackageWholesale(product, packageType);
  const srp = getPackageSrp(product, packageType);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Package className="size-5" aria-hidden />
      </div>
      <h2 className="text-sm font-semibold leading-snug text-zinc-900">
        {product.name}
      </h2>
      <p className="mt-1 text-xs text-zinc-500">
        {canSellByCrate
          ? `Crate of ${product.piecesPerCrate} · unit ${formatCurrency(getPackageSrp(product, "unit"))}`
          : "Sold by unit"}
      </p>
      <div className="mt-3 flex flex-1 flex-col justify-end gap-1">
        <p className="text-xs text-zinc-500">
          Wholesale {formatCurrency(wholesale)}
        </p>
        <p className="text-base font-semibold text-zinc-900">
          SRP {formatCurrency(srp)}
        </p>
      </div>
      {canSellByCrate ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <AddButton
            label="Unit"
            onClick={() => onAdd(product, "unit")}
          />
          <AddButton
            label="Crate"
            emphasized
            onClick={() => onAdd(product, "crate")}
          />
        </div>
      ) : (
        <AddButton
          className="mt-3 w-full"
          label="Add"
          emphasized
          onClick={() => onAdd(product, "unit")}
        />
      )}
    </article>
  );
}

function AddButton({
  label,
  onClick,
  emphasized = false,
  className = "",
}: {
  label: string;
  onClick: () => void;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-1 rounded-xl text-sm font-medium transition-colors ${
        emphasized
          ? "bg-emerald-700 text-white hover:bg-emerald-800"
          : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
      } ${className}`}
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  );
}
