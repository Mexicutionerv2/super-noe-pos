import { create } from 'zustand';
import type { CartItem, Product, UnitType } from '@/types/pos';

/**
 * Rounds to 2 decimals using an epsilon nudge to dodge classic floating-point
 * artifacts (e.g. 1.005 * 100 => 100.49999999999999 without it).
 */
function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Resolves the correct retail price for a given unit type, defensively
 *  falling back to the unit price if a crate price is missing. */
function resolveUnitPrice(product: Product, unitType: UnitType): number {
  if (unitType === 'crate') {
    return product.retailPriceCrate ?? product.retailPriceUnit;
  }
  return product.retailPriceUnit;
}

interface CartState {
  items: CartItem[];

  /**
   * Adds one lot of `unitType` for `product`. If a line for this exact
   * product + unitType pair already exists, its quantity is incremented
   * instead of creating a duplicate line. No-ops if `unitType` is 'crate'
   * for a product that doesn't allow crate sales — a data-integrity guard,
   * since the UI should never offer that option in the first place.
   */
  addItem: (product: Product, unitType: UnitType) => void;

  /** Removes the entire line for this product + unitType pair, regardless of quantity. */
  removeItem: (productId: string, unitType: UnitType) => void;

  /**
   * Adjusts quantity by `delta` (positive or negative) for a product + unitType
   * line. If the resulting quantity is <= 0, the line is removed entirely.
   */
  updateQuantity: (productId: string, unitType: UnitType, delta: number) => void;

  /** Empties the cart. */
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],

  addItem: (product, unitType) =>
    set((state) => {
      if (unitType === 'crate' && !product.allowsCrates) {
        return state;
      }

      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.unitType === unitType
      );

      if (existingIndex !== -1) {
        const existingItem = state.items[existingIndex];
        const newQuantity = existingItem.quantity + 1;
        const updatedItem: CartItem = {
          ...existingItem,
          quantity: newQuantity,
          subtotal: roundCurrency(newQuantity * existingItem.unitPrice),
        };
        const items = [...state.items];
        items[existingIndex] = updatedItem;
        return { items };
      }

      const unitPrice = resolveUnitPrice(product, unitType);
      const newItem: CartItem = {
        product,
        unitType,
        quantity: 1,
        unitPrice,
        subtotal: roundCurrency(unitPrice),
      };
      return { items: [...state.items, newItem] };
    }),

  removeItem: (productId, unitType) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.unitType === unitType)
      ),
    })),

  updateQuantity: (productId, unitType, delta) =>
    set((state) => {
      const items: CartItem[] = [];
      for (const item of state.items) {
        if (item.product.id !== productId || item.unitType !== unitType) {
          items.push(item);
          continue;
        }
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
          continue; // drop the line
        }
        items.push({
          ...item,
          quantity: newQuantity,
          subtotal: roundCurrency(newQuantity * item.unitPrice),
        });
      }
      return { items };
    }),

  clearCart: () => set({ items: [] }),
}));

/**
 * Selectors — exported standalone so components can subscribe to just the
 * derived value they need (e.g. `useCartStore(selectCartCount)`), rather
 * than the whole `items` array. Zustand does not memoize derived state for
 * you, so these are kept as pure functions computed from `items` on every
 * call; that's cheap here since cart sizes are small (tens of lines, not
 * thousands).
 */

/** Total number of lots across all lines (2 crates + 3 units = 5, not 2 lines). */
export const selectCartCount = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

/** Sum of all line subtotals, rounded to 2 decimals. */
export const selectCartTotal = (state: CartState): number =>
  roundCurrency(state.items.reduce((total, item) => total + item.subtotal, 0));
