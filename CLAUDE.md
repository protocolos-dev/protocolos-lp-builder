# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page builder MVP where users create and manage landing pages using a visual drag-and-drop editor powered by Puck. Each landing page can be served on its own subdomain. The project is in Brazilian Portuguese.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Puck (page builder) · Supabase (PostgreSQL) · Framer Motion

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Run development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Lint code
```

**Access Points:**
- Admin Panel: `http://localhost:3000/admin`
- Editor: `http://localhost:3000/admin/editor/[slug]` (`slug=new` for new pages)
- Public page: `http://localhost:3000/[slug]`

## Database Setup

Uses Supabase (PostgreSQL). Migrations are manual SQL files in `migrations/`.

**Apply via Supabase SQL Editor** (recommended): copy and run migration file contents.

**Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
```

## Architecture

### App Structure

```
app/
  (admin)/admin/              # Landing page listing dashboard
  (admin)/admin/editor/[slug] # Puck visual editor
  (landing)/[...slug]/        # Public landing page renderer (catch-all)
  api/landing-pages/          # CRUD API routes
components/
  landing/                    # 17 Puck component modules
  admin/                      # Editor-specific UI (PublishDialog, etc.)
lib/
  puck-config.ts              # All Puck component definitions
  supabase.ts                 # Supabase client factory + transformLandingPage()
utils/supabase/
  server.ts / client.ts / middleware.ts  # Context-specific Supabase clients
types/
  supabase.ts                 # Auto-generated DB types
  landing-page.ts             # Frontend TypeScript interfaces
migrations/                   # Manual SQL migration files
```

### Subdomain Routing

`middleware.ts` rewrites subdomain requests to slug paths: `produto.exemplo.com` → `/produto`, handled by the catch-all route. `/admin` and `/api` paths are excluded.

**Local subdomain testing** — add to `/etc/hosts`:
```
127.0.0.1 produto.localhost
```
Then access `http://produto.localhost:3000`.

### Puck Configuration (`lib/puck-config.ts`)

Defines 17 landing page components across two categories:

**Specialized sales-page sections** (opinionated copy defaults targeting health/supplement niche):
`HeroSection`, `ProblemSection`, `EnemySection`, `StorySection`, `MechanismSection`, `ProofSection`, `OfferSection`, `GuaranteeSection`, `FAQSection`, `FinalCTASection`, `StickyCTA`

**Generic reusable components:**
`Hero`, `Features`, `Pricing`, `CTA`, `Testimonials`, `Footer`

Each component entry has `fields` (Puck editor controls), `defaultProps`, and `render` (the React component). React components live in `components/landing/`.

### Data Model

**`landing_pages` table:**
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK, auto-generated |
| `slug` | TEXT | Unique, used as subdomain |
| `title` | TEXT | SEO title |
| `data` | JSONB | Full Puck editor state |
| `checkout_url` | TEXT | Optional payment URL |
| `created_at` / `updated_at` | TIMESTAMPTZ | `updated_at` managed by DB trigger |

**Naming convention:** DB uses `snake_case`; API/frontend uses `camelCase`. Conversion happens in `lib/supabase.ts` via `transformLandingPage()`.

### API Routes

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/landing-pages` | All pages, ordered by `updated_at` DESC |
| POST | `/api/landing-pages` | Required: `slug`, `title`, `data`. Optional: `checkoutUrl`. Returns 409 on duplicate slug |
| GET | `/api/landing-pages/[slug]` | Single page, 404 if not found |
| PUT | `/api/landing-pages/[slug]` | Partial update: `title`, `data`, `checkoutUrl` |
| DELETE | `/api/landing-pages/[slug]` | Hard delete |

### Supabase Integration

Always use `getSupabaseClient()` from `lib/supabase.ts` — do not instantiate clients directly in route handlers.

```typescript
import { getSupabaseClient, transformLandingPage } from '@/lib/supabase';

const supabase = await getSupabaseClient();
const { data, error } = await supabase.from('landing_pages').select('*').eq('slug', slug).single();
return transformLandingPage(data);
```

Use `utils/supabase/client.ts` only in `"use client"` components.

## Adding New Puck Components

1. Create React component in `components/landing/`
2. Add entry to `lib/puck-config.ts` with `fields`, `defaultProps`, and `render`

The component appears automatically in the Puck editor sidebar.

## Language

All UI text, code comments, error messages, labels, placeholders, and variable names must be written in **English**. This applies to all files in the project — including components, API routes, and utilities. The only exception is default content inside Puck component `defaultProps` (e.g. sales copy), which may remain in Portuguese if it targets a Brazilian audience.

## Important Notes

- **No authentication**: Admin panel is fully open. Post-MVP feature.
- **RLS**: Enabled on `landing_pages` but currently permissive (all operations allowed).
- **No tests**: No automated test suite.
- **Tailwind v4**: No `tailwind.config.ts` — configuration uses the new CSS-first approach via `app/globals.css` with `@import "tailwindcss"` and `@theme`.
- **`sonner`** is installed but not yet wired up. The editor currently uses a custom inline toast.
- **Publish flow**: `components/admin/PublishDialog.tsx` handles the publish modal — new pages show a form (title, slug, checkout URL), existing pages show a success screen with copyable URLs.
