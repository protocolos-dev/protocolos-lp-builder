# Database Migrations

This folder contains SQL migration files for the Supabase PostgreSQL database.

## How to Apply Migrations

### Option 1: Supabase SQL Editor (Recommended)
1. Go to your Supabase project SQL Editor: https://supabase.com/dashboard/project/cyhygflxkpjuvxpmaxkb/sql/new
2. Copy the contents of the migration file
3. Paste into the SQL Editor
4. Click "Run" or press Ctrl+Enter

### Option 2: Supabase CLI
```bash
# Login to Supabase
npx supabase login

# Run migration
npx supabase db push
```

### Option 3: psql (Direct Connection)
```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]/postgres" -f migrations/001_create_landing_pages_table.sql
```

## Migration Files

- `001_create_landing_pages_table.sql` - Initial table creation with indexes, triggers, and RLS policies

## Migration Naming Convention

Migrations are numbered sequentially:
- `001_description.sql`
- `002_description.sql`
- etc.

Always apply migrations in order.
