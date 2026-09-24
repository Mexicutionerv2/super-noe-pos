# Super Noe POS - Milestone 1 Benchmark

## Objective
Build a mobile-first Point of Sale interface with a responsive product grid, live search, category filtering, and a persistent shopping cart with total calculation.

## Tech Stack
Next.js (App Router), TypeScript (strict mode, no `any`), Tailwind CSS, Lucide React icons.

## Data Constraints & Mock Data
Products must support dual pricing and package types. Use this exact mock data in a new file `src/data/mockProducts.ts`:

1. **Beverages (Crate vs. Unit Logic)**
   - Coca Cola 355 ML Lata NR: Crate of 24 pieces. Wholesale cost: $468.00.
   - Coca Cola 2 LT PET NR: Crate of 24 pieces. Wholesale cost: $325.00.
   - Ciel 1.5 LT PET NR: Crate of 36 pieces. Wholesale cost: $225.00.
   - Monster Energy 473 ML Lata NR: Crate of 8 pieces. Wholesale cost: $150.00.

2. **Packaged Goods (Wholesale vs. Suggested Retail Logic)**
   - Crossantines Chocolate 32g: Wholesale $6.64.
   - Rebanadas: Wholesale $8.30.
   - Concha Vainilla 1p: Wholesale $8.30.
   - Nito Variedad 1p: Wholesale $14.11.
   - Bimbuñuelos 6p Clásico / Canela: Wholesale $18.26.

## Component Architecture
1. `src/components/pos/ProductGrid.tsx` - Displays the items.
2. `src/components/pos/Cart.tsx` - Handles the current order.
3. `src/components/pos/SearchBar.tsx` - Filters the product grid.