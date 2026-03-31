# Full-Stack Guide (TPC Logistics)

This repo is now focused on a React + Vite frontend. The previous Next.js app and API routes were removed.

## Frontend setup
1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Optional backend (Prisma)
If you plan to wire a separate API for the frontend, the Prisma schema and seed scripts are still included.
1. Create the local database and migrations:
   `npx prisma migrate dev --name init`
2. Seed demo data:
   `npm run seed`

## Expected API (if you wire a backend)
- `GET /api/track?trackingId=...`

## Switching to PostgreSQL (production)
1. Update `prisma/schema.prisma` datasource to `provider = "postgresql"`.
2. Set `DATABASE_URL` to your Postgres connection string.
3. Run:
   `npx prisma migrate deploy`
