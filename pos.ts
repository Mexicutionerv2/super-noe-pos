/**
 * Core domain types for Super Noe POS.
 *
 * These types model two distinct inventory shapes:
 *  - Packaged Goods (Pan Dulce / Pastelitos): sold strictly by the unit.
 *  - Beverages (Bebidas): sold either by the individual unit or by the full crate.
 *
 * `allowsCrates` + the optional crate-related fields are what let a single
 * `Product` shape represent both cases without resorting to a discriminated
 * union — simpler call sites, at the cost of a few optional fields on
 * unit-only products. If the catalog grows more packaging variants
 * (e.g. "box", "pallet"), revisit this as a discriminated union keyed on a
 * `packaging` field instead of a boolean.
 */

/** Top-level catalog groupings. 'Todos' ("All") is a UI filter value only —
 *  no individual Product should ever be tagged with it. */
export type Category = 'Bebidas' | 'Pan Dulce' | 'Pastelitos' | 'Todos';

/** How a given cart line is being sold: as a loose unit, or a sealed crate. */
export type UnitType = 'unit' | 'crate';

/** How a completed sale was settled. */
export type PaymentMethod = 'Efectivo' | 'Tarjeta' | 'Transferencia';

export interface Product {
  /** Stable, unique, human-readable slug (e.g. "coca-cola-355ml-lata-nr"). */
  id: string;
  name: string;
  category: Category;

  /** Whether this product may be sold by the crate in addition to by the unit. */
  allowsCrates: boolean;
  /** Number of individual units in one crate. Required when allowsCrates is true. */
  piecesPerCrate?: number;

  /** Wholesale (cost) price per individual unit. Always present. */
  wholesaleCostUnit: number;
  /** Wholesale (cost) price per full crate. Present only when allowsCrates is true. */
  wholesaleCostCrate?: number;

  /** Suggested retail price per individual unit. Always present. */
  retailPriceUnit: number;
  /** Suggested retail price per full crate. Present only when allowsCrates is true. */
  retailPriceCrate?: number;

  /** Current stock, expressed in individual units (a crate consumes `piecesPerCrate` of this). */
  stockUnits: number;
}

export interface CartItem {
  product: Product;
  unitType: UnitType;
  /** Number of `unitType` lots (i.e. 2 crates, or 5 loose units). */
  quantity: number;
  /** Price per single `unitType` lot at the moment this line was added — locked in,
   *  so later catalog price edits don't retroactively change an open cart. */
  unitPrice: number;
  /** quantity * unitPrice, rounded to 2 decimals. */
  subtotal: number;
}

export interface SaleTransaction {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}
