# StyleNest Phase 3

Phase 3 adds a database-ready demo customer journey without requiring a database.

## Included
- Customer registration and demo login
- Local browser session persistence
- Wishlist and cart retained from Phase 2
- Checkout with shipping/contact details
- Delivery selection
- Demo payment selection (no real payment processing)
- Order creation and order confirmation
- My Orders page
- Orders persisted in localStorage

## Important demo limitation
This phase intentionally has no database. Demo users and orders are stored in the browser's localStorage. Do not use real passwords or sensitive payment details. A later database migration should replace the persistence methods in `components/StoreProvider.js` with API/database services while leaving the UI flow largely unchanged.

## Run
npm install
npm run dev
