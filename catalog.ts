import type { Product } from '@/types/pos';

/**
 * Seed catalog for Super Noe POS.
 *
 * `stockUnits` values are placeholders (not supplied by the business data)
 * and should be wired up to real inventory counts once that source exists.
 * Everything else — pricing, packaging, category — reflects the figures
 * given in the business context.
 */
export const CATALOG_PRODUCTS: Product[] = [
  // ---- Pan Dulce (packaged, unit only) ----
  {
    id: 'crossantines-chocolate-32g',
    name: 'Crossantines Chocolate 32g',
    category: 'Pan Dulce',
    allowsCrates: false,
    wholesaleCostUnit: 6.64,
    retailPriceUnit: 8.0,
    stockUnits: 60,
  },
  {
    id: 'rebanadas',
    name: 'Rebanadas',
    category: 'Pan Dulce',
    allowsCrates: false,
    wholesaleCostUnit: 8.3,
    retailPriceUnit: 10.0,
    stockUnits: 60,
  },
  {
    id: 'concha-vainilla-1p',
    name: 'Concha Vainilla 1p',
    category: 'Pan Dulce',
    allowsCrates: false,
    wholesaleCostUnit: 8.3,
    retailPriceUnit: 10.0,
    stockUnits: 60,
  },

  // ---- Pastelitos (packaged snack cakes, unit only) ----
  {
    id: 'nito-variedad-1p',
    name: 'Nito Variedad 1p',
    category: 'Pastelitos',
    allowsCrates: false,
    wholesaleCostUnit: 14.11,
    retailPriceUnit: 17.0,
    stockUnits: 50,
  },
  {
    id: 'gansito',
    name: 'Gansito',
    category: 'Pastelitos',
    allowsCrates: false,
    wholesaleCostUnit: 16.8,
    retailPriceUnit: 20.0,
    stockUnits: 50,
  },
  {
    id: 'pinguinos-2p-80g',
    name: 'Pingüinos 2p 80g',
    category: 'Pastelitos',
    allowsCrates: false,
    wholesaleCostUnit: 20.16,
    retailPriceUnit: 24.0,
    stockUnits: 50,
  },

  // ---- Bebidas (unit or crate) ----
  {
    id: 'coca-cola-355ml-lata-nr',
    name: 'Coca Cola 355 ML Lata NR',
    category: 'Bebidas',
    allowsCrates: true,
    piecesPerCrate: 24,
    wholesaleCostUnit: 19.5,
    wholesaleCostCrate: 468.0,
    retailPriceUnit: 24.0,
    retailPriceCrate: 540.0,
    stockUnits: 240,
  },
  {
    id: 'coca-cola-2lt-pet-nr',
    name: 'Coca Cola 2 LT PET NR',
    category: 'Bebidas',
    allowsCrates: true,
    piecesPerCrate: 24,
    wholesaleCostUnit: 13.54,
    wholesaleCostCrate: 325.0,
    retailPriceUnit: 18.0,
    retailPriceCrate: 390.0,
    stockUnits: 240,
  },
  {
    id: 'monster-energy-473ml-lata-nr',
    name: 'Monster Energy 473 ML Lata NR',
    category: 'Bebidas',
    allowsCrates: true,
    piecesPerCrate: 8,
    wholesaleCostUnit: 18.75,
    wholesaleCostCrate: 150.0,
    retailPriceUnit: 25.0,
    retailPriceCrate: 180.0,
    stockUnits: 80,
  },
  {
    id: 'ciel-1.5lt-pet-nr',
    name: 'Ciel 1.5 LT PET NR',
    category: 'Bebidas',
    allowsCrates: true,
    piecesPerCrate: 36,
    wholesaleCostUnit: 6.25,
    wholesaleCostCrate: 225.0,
    retailPriceUnit: 10.0,
    retailPriceCrate: 300.0,
    stockUnits: 360,
  },
];
