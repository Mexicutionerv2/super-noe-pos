export type ProductCategory = "beverages" | "packaged-goods";
export type PackageType = "crate" | "unit";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  /** Wholesale cost of the listed sellable package (crate for beverages, unit for packaged goods). */
  wholesaleCost: number;
  /** Suggested retail price at a ~20% markup over wholesale. */
  srp: number;
  /** Pieces in a crate. Packaged goods sold as single units use 1. */
  piecesPerCrate: number;
  defaultPackage: PackageType;
}

export interface CartItem {
  product: Product;
  quantity: number;
  packageType: PackageType;
}

const MARKUP = 1.2;

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function suggestedRetailFromWholesale(wholesaleCost: number): number {
  return roundCurrency(wholesaleCost * MARKUP);
}

export function getPackageWholesale(
  product: Product,
  packageType: PackageType,
): number {
  if (packageType === "unit" && product.piecesPerCrate > 1) {
    return roundCurrency(product.wholesaleCost / product.piecesPerCrate);
  }
  return product.wholesaleCost;
}

export function getPackageSrp(product: Product, packageType: PackageType): number {
  return suggestedRetailFromWholesale(getPackageWholesale(product, packageType));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

export const mockProducts: Product[] = [
  {
    id: "coca-cola-355-ml-lata-nr",
    name: "Coca Cola 355 ML Lata NR",
    category: "beverages",
    wholesaleCost: 468.0,
    srp: suggestedRetailFromWholesale(468.0),
    piecesPerCrate: 24,
    defaultPackage: "crate",
  },
  {
    id: "coca-cola-2-lt-pet-nr",
    name: "Coca Cola 2 LT PET NR",
    category: "beverages",
    wholesaleCost: 325.0,
    srp: suggestedRetailFromWholesale(325.0),
    piecesPerCrate: 24,
    defaultPackage: "crate",
  },
  {
    id: "ciel-1-5-lt-pet-nr",
    name: "Ciel 1.5 LT PET NR",
    category: "beverages",
    wholesaleCost: 225.0,
    srp: suggestedRetailFromWholesale(225.0),
    piecesPerCrate: 36,
    defaultPackage: "crate",
  },
  {
    id: "monster-energy-473-ml-lata-nr",
    name: "Monster Energy 473 ML Lata NR",
    category: "beverages",
    wholesaleCost: 150.0,
    srp: suggestedRetailFromWholesale(150.0),
    piecesPerCrate: 8,
    defaultPackage: "crate",
  },
  {
    id: "crossantines-chocolate-32g",
    name: "Crossantines Chocolate 32g",
    category: "packaged-goods",
    wholesaleCost: 6.64,
    srp: suggestedRetailFromWholesale(6.64),
    piecesPerCrate: 1,
    defaultPackage: "unit",
  },
  {
    id: "rebanadas",
    name: "Rebanadas",
    category: "packaged-goods",
    wholesaleCost: 8.3,
    srp: suggestedRetailFromWholesale(8.3),
    piecesPerCrate: 1,
    defaultPackage: "unit",
  },
  {
    id: "concha-vainilla-1p",
    name: "Concha Vainilla 1p",
    category: "packaged-goods",
    wholesaleCost: 8.3,
    srp: suggestedRetailFromWholesale(8.3),
    piecesPerCrate: 1,
    defaultPackage: "unit",
  },
  {
    id: "nito-variedad-1p",
    name: "Nito Variedad 1p",
    category: "packaged-goods",
    wholesaleCost: 14.11,
    srp: suggestedRetailFromWholesale(14.11),
    piecesPerCrate: 1,
    defaultPackage: "unit",
  },
  {
    id: "bimbunuelos-6p-clasico-canela",
    name: "Bimbuñuelos 6p Clásico / Canela",
    category: "packaged-goods",
    wholesaleCost: 18.26,
    srp: suggestedRetailFromWholesale(18.26),
    piecesPerCrate: 1,
    defaultPackage: "unit",
  },
];
