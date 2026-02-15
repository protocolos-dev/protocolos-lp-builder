# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page builder MVP that allows users to create and manage landing pages using a visual drag-and-drop editor powered by Puck. Each landing page can be served on its own subdomain and includes pre-built customizable components. The project is primarily in Portuguese (Brazilian).

**Tech Stack:**
- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Puck (visual page builder)
- Supabase (PostgreSQL database)
- Framer Motion (animations)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm run lint
```

**Access Points:**
- Home: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Landing Page Editor: http://localhost:3000/admin/editor/[slug]
- Public Landing Page: http://localhost:3000/[slug]

## Database Setup

This project uses Supabase (PostgreSQL) and was recently migrated from Prisma/SQLite. Database migrations are manual SQL files in the `migrations/` folder.

**Apply Migrations:**

1. Via Supabase SQL Editor (Recommended):
   - Navigate to Supabase project SQL Editor
   - Copy migration file contents
   - Paste and run in editor

2. Via Supabase CLI:
   ```bash
   npx supabase login
   npx supabase db push
   ```

**Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
```

## Architecture

### App Structure

The project uses Next.js App Router with route groups for organization:

- `app/(landing)/[...slug]/` - Public landing page renderer (uses catch-all routes)
- `app/(admin)/admin/` - Admin panel for listing/managing landing pages
- `app/(admin)/admin/editor/[slug]/` - Puck visual editor interface
- `app/api/landing-pages/` - RESTful API for CRUD operations

### Subdomain Routing

The `middleware.ts` file handles subdomain-to-slug mapping. When a request comes in on a subdomain (e.g., `produto.exemplo.com`), the middleware rewrites the URL to `/produto`, which is then handled by the catch-all route.

**Local Subdomain Testing:**
Edit `/etc/hosts`:
```
127.0.0.1 produto.localhost
127.0.0.1 servico.localhost
```
Then access: `http://produto.localhost:3000`

### Puck Configuration

The core of the application is `lib/puck-config.ts`, which defines 6 landing page components:

1. **Hero** - Header section with title, subtitle, CTA, background image
2. **Features** - Grid of features with icons, configurable columns (2-4)
3. **Pricing** - Pricing tiers with features, CTA buttons, highlight option
4. **CTA** - Call-to-action section with variants (primary, secondary, gradient)
5. **Testimonials** - Customer testimonials with quotes, authors, roles
6. **Footer** - Multi-column footer with social links

Each component in puck-config.ts defines:
- `fields` - Editable properties in the Puck editor
- `defaultProps` - Default values when component is added
- `render` - The React component to render

### Data Model

**Landing Pages Table** (`landing_pages`):
- `id` (UUID) - Primary key
- `slug` (TEXT, unique) - URL-friendly identifier, used as subdomain
- `title` (TEXT) - Page title for SEO and display
- `data` (JSONB) - Puck editor data stored as JSON
- `checkout_url` (TEXT, nullable) - Optional external checkout/payment URL
- `created_at` (TIMESTAMPTZ) - Auto-set on creation
- `updated_at` (TIMESTAMPTZ) - Auto-updated via trigger

**Naming Convention:**
- Database columns use `snake_case` (e.g., `checkout_url`, `created_at`)
- API/Frontend use `camelCase` (e.g., `checkoutUrl`, `createdAt`)
- Transformation happens in `lib/supabase.ts` via `transformLandingPage()`

### API Routes

**GET /api/landing-pages**
- Lists all landing pages, ordered by `updated_at` DESC
- Returns array of transformed landing page objects

**POST /api/landing-pages**
- Creates new landing page
- Required: `slug`, `title`, `data`
- Optional: `checkoutUrl`
- Returns 409 if slug already exists (unique constraint)

**GET /api/landing-pages/[slug]**
- Fetches single landing page by slug
- Returns 404 if not found

**PUT /api/landing-pages/[slug]**
- Updates existing landing page
- Can update: `title`, `data`, `checkoutUrl`
- Returns 404 if not found

**DELETE /api/landing-pages/[slug]**
- Deletes landing page by slug
- Returns 404 if not found

### Supabase Integration

The project uses `@supabase/ssr` for server-side Supabase client creation. Key files:

- `utils/supabase/server.ts` - Server component client factory
- `utils/supabase/client.ts` - Client component client factory
- `utils/supabase/middleware.ts` - Middleware client factory
- `lib/supabase.ts` - Helper functions and type-safe wrappers
- `types/supabase.ts` - Auto-generated database types

**Getting Supabase Client:**
```typescript
import { getSupabaseClient } from '@/lib/supabase';

const supabase = await getSupabaseClient();
const { data, error } = await supabase.from('landing_pages').select('*');
```

**Type-Safe Helpers:**
```typescript
import { LandingPage, transformLandingPage } from '@/lib/supabase';

const dbRow: LandingPage = /* ... */;
const apiResponse = transformLandingPage(dbRow); // snake_case → camelCase
```

## Important Notes

1. **Puck Data Storage**: Landing page layouts are stored as JSONB in the `data` column. This includes the component tree, props, and layout structure.

2. **No Authentication Yet**: The admin panel currently has no authentication. This is marked as a post-MVP feature.

3. **No Test Suite**: There are currently no automated tests in the project.

4. **Row Level Security**: RLS is enabled on the `landing_pages` table but currently has a permissive policy allowing all operations. This should be tightened when authentication is added.

5. **Migration from Prisma**: The project was recently migrated from Prisma/SQLite to Supabase. Old Prisma files have been deleted.

6. **Portuguese Context**: Many comments, README sections, and default content are in Brazilian Portuguese. Maintain this language preference when adding new features unless explicitly requested otherwise.

## Adding New Puck Components

To add a new landing page component:

1. Create the React component in `components/landing/`
2. Define component props interface
3. Add component configuration to `lib/puck-config.ts`:
   - Define `fields` for editable properties
   - Set `defaultProps` with sensible defaults
   - Reference the component in `render`
4. The component will automatically appear in the Puck editor sidebar

## Common Patterns

**Fetching Landing Page Data:**
```typescript
const supabase = await getSupabaseClient();
const { data: landingPage, error } = await supabase
  .from('landing_pages')
  .select('*')
  .eq('slug', slug)
  .single();

if (error) throw error;
return transformLandingPage(landingPage);
```

**Updating Landing Page:**
```typescript
const { data, error } = await supabase
  .from('landing_pages')
  .update({ title, data, checkout_url: checkoutUrl })
  .eq('slug', slug)
  .select()
  .single();
```

## Troubleshooting

**Puck editor not loading:**
- Ensure `@measured/puck/puck.css` is imported in the editor page
- Check browser console for component rendering errors

**Supabase connection issues:**
- Verify environment variables are set correctly
- Check Supabase project is active and accessible
- Ensure RLS policies allow the operation

**Subdomain routing not working:**
- Check middleware.ts is properly configured
- Verify DNS/hosts file for subdomain setup
- Check NEXT_PUBLIC_DOMAIN environment variable
