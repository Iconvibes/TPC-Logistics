# TPC Logistics Platform (React + Vite)

Frontend logistics experience with marketing, tracking, quote, dashboard, and sustainability pages.

## Local setup
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

## Optional backend (Prisma)
If you wire a separate API for `/api/*`, the Prisma schema and seed scripts are still available in `prisma/`.
1. `npx prisma migrate dev --name init`
2. `npm run seed`

## Key routes
- `/` public marketing site
- `/track` public tracking lookup (expects `GET /api/track?trackingId=...`)
- `/quote` request a quote
- `/dashboard` client dashboard
- `/sustainability` sustainability overview
