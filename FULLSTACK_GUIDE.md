# Full-Stack Guide (TPC Logistics)

This project now runs on **Next.js + Prisma** with:
- Public tracking page
- Client portal
- Admin dashboard
- Role-based authentication
- SQLite for local dev, PostgreSQL for production

## Local setup
1. Install dependencies:
   `npm install`
2. Create the local database and migrations:
   `npx prisma migrate dev --name init`
3. Seed demo data:
   `npm run seed`
4. Run the app:
   `npm run dev`

## Seed accounts
Admin:
- Email: `admin@tpclogistics.com`
- Password: `Admin@12345` (change in `.env`)

Client:
- Email: `clienta@tpclogistics.com`
- Password: `Client@12345` (change in `.env`)

## Key routes
- `/` Marketing site
- `/track` Public tracking lookup
- `/login` Login for admin + clients
- `/portal` Client portal (auth required)
- `/admin` Admin dashboard (auth required)

## Admin features
In `/admin` you can:
- Create client accounts
- Create shipments
- Post tracking updates

## Client portal features
In `/portal` clients can:
- View all their shipments
- Jump to live tracking results

## API routes (server)
Auth:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Admin:
- `GET/POST /api/admin/clients`
- `GET/POST /api/admin/shipments`
- `POST /api/admin/shipments/:shipmentId/events`

Client:
- `GET /api/client/shipments`

Tracking:
- `GET /api/track?trackingId=...`

## Switching to PostgreSQL (production)
1. Update `prisma/schema.prisma` datasource to `provider = "postgresql"`.
2. Set `DATABASE_URL` to your Postgres connection string.
3. Run:
   `npx prisma migrate deploy`

## Troubleshooting
- If admin data won’t load, confirm you are logged in as an admin
  and that the database was migrated + seeded.
- If tracking fails, check the tracking ID format (`TPC-XXXXX`).
