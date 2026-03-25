# TPC Logistics Platform (Next.js + Prisma)

Full-stack logistics platform with public tracking, client portal, and admin dashboard.

## Local setup (SQLite)
1. Install dependencies: `npm install`
2. Update environment values in `.env` if needed.
3. Create the database and run migrations:
   `npx prisma migrate dev --name init`
4. Seed sample data:
   `npm run seed`
5. Start the app:
   `npm run dev`

## Default seed credentials
Admin:
- Email: `admin@tpclogistics.com`
- Password: `Admin@12345` (change via `.env`)

Client:
- Email: `clienta@tpclogistics.com`
- Password: `Client@12345` (change via `.env`)

## Key routes
- `/` public marketing site
- `/track` public tracking lookup
- `/login` login for admin and client accounts
- `/portal` client portal (auth required)
- `/admin` admin dashboard (auth required)

## Production notes
For production, switch Prisma to PostgreSQL by updating `prisma/schema.prisma` and set `DATABASE_URL` accordingly.
