# Events Platform

Community events hub where staff publish happenings and residents can reserve a place and drop the event straight into Google Calendar.

---

## MVP Checklist
- **Create events (staff)** – `/admin` route gated by an admin password. Authenticated users get a full create form posting to `POST /api/events`.
- **Signup to events (public)** – Event detail pages expose a signup panel that validates input (client + Zod) and posts to `POST /api/events/:id/signup`.
- **Add to calendar** – Successful signup renders a Google Calendar deep link pre-filled with title, description, location, and start/end time.
- **Non-functional** – Built with TypeScript/Next.js, responsive layouts, deterministic seed data, integration tests, and clear error states.

---

## Tech Stack
- Next.js 15 (App Router) + React 19
- TypeScript everywhere
- Prisma ORM on PostgreSQL
- Zod for schema validation shared between server and client
- Tailwind + shadcn/ui primitives
- Jest integration tests for services and API routes

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm
- PostgreSQL running locally (defaults assume `postgres` user with no password)

### 1. Install dependencies
```bash
git clone <YOUR_FORK_URL>
cd events-platform
npm install
```

### 2. Environment variables
Create the following files in the project root (adjust the URLs/passwords for your setup):

```dotenv
# .env
DATABASE_URL="postgresql://postgres@localhost:5432/events_platform_db?schema=public"
ADMIN_PASSWORD="dev-admin-secret"

# .env.test
DATABASE_URL="postgresql://postgres@localhost:5432/events_platform_test_db?schema=public"

# .env.prod (not committed; used locally when preparing Supabase)
# Supabase → Project → Settings → Database → Connect → ORMs → "Connection pooling"
# Host looks like aws-1-region.pooler.supabase.com:6543 and the user is postgres.<project-ref>
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-1-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
ADMIN_PASSWORD="production-secret"
NODE_ENV=production
SEED_SIZE=1
```

For production, mirror `DATABASE_URL` and `ADMIN_PASSWORD` in your hosting provider before deploying. The `.env.prod` file is only for running Prisma commands locally against Supabase—never commit it. Using the pooled connection string keeps serverless environments from spinning up a brand-new Postgres connection on every request.

### 3. Bootstrap the database
```bash
# Reset, migrate, and seed dev data
npm run db:dev:refresh

# Optional: prepare the test database
npm run db:test:refresh
```

The seed script loads a full schedule of events plus example signups so the UI has useful data immediately.

### 4. Run the app
```bash
npm run dev
```
Visit `http://localhost:3000` for the public site. Click the user icon to reach `/admin`—enter the password from `.env` to unlock the create form.

### 5. Run tests (Postgres must be available)
```bash
npm run test
```
The Jest suite uses `.env.test`, so ensure the referenced database is migrated/seeds applied (`npm run db:test:refresh`).

---

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start Next.js with Turbopack. |
| `npm run build` / `npm run start` | Production build & serve. |
| `npm run lint` | Run ESLint. |
| `npm run prisma:gen` | Regenerate Prisma client types. |
| `npm run db:dev:refresh` | Reset, migrate, and seed the dev DB. |
| `npm run db:test:refresh` | Reset, migrate, and seed the test DB. |
| `npm run db:prod:deploy` | Apply Prisma migrations to the Supabase/production DB using `.env.prod`. |
| `npm run db:prod:seed` | Run the seed script against Supabase (requires `SEED_SIZE=1` in `.env.prod`). |
| `npm run db:prod:prepare` | Convenience command: deploy migrations then seed Supabase in one go. |
| `npm run test` / `npm run test:watch` | Jest integration tests. |

---

## API Overview

- `GET /api/events` – List all upcoming events sorted by `dateTime` with derived timing/availability fields.
- `GET /api/events/:id` – Fetch a single event (used by detail pages).
- `POST /api/events` – Admin-only create endpoint (called by the `/admin` form). Validated with `createEventSchema`.
- `POST /api/events/:id/signup` – Public signup endpoint. Validates request body with `signupSchema`, prevents duplicate email registrations per event, and returns the created signup record.

All route handlers share consistent error responses through typed errors and Prisma error translation.

---

## Admin Workflow
1. Visit `/admin`.
2. Enter the password defined in `ADMIN_PASSWORD`. An HTTP-only cookie stores auth for 24 hours.
3. Fill out the create form (title, description, schedule, pricing, optional image URL, etc.).
4. Submit to persist the event; the form resets on success and refreshes the page.

---

## Hosting Notes
- Deploy on platforms like Vercel. Define `DATABASE_URL` and `ADMIN_PASSWORD` in the project’s environment variables before building.
- Point `DATABASE_URL` at a managed Postgres instance (e.g., Supabase). Then run `npm run db:prod:prepare` locally (with `.env.prod` configured) to push migrations + seed data into Supabase before redeploying.
- Image upload currently accepts URLs; integrate object storage later if direct uploads are required.

---

## Project Structure (high level)
```
src/
  app/
    api/              # Route handlers (events + signups)
    admin/            # Admin login + create form
    events/[id]/      # Event detail page and signup flow
    page.tsx          # Public landing page
  components/         # Shared UI primitives
  server/             # Prisma services, schemas, errors
prisma/               # Prisma schema + seed data
__tests__/            # Jest API/service integration tests
```
