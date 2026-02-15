import { createClient as createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export async function getSupabaseClient() {
  return await createServerClient(cookies());
}

// Type-safe helpers
export type LandingPage = Database['public']['Tables']['landing_pages']['Row'];
export type LandingPageInsert = Database['public']['Tables']['landing_pages']['Insert'];
export type LandingPageUpdate = Database['public']['Tables']['landing_pages']['Update'];

// Transform database row to API response (snake_case → camelCase)
export function transformLandingPage(dbRow: LandingPage) {
  return {
    id: dbRow.id,
    slug: dbRow.slug,
    title: dbRow.title,
    data: dbRow.data,
    checkoutUrl: dbRow.checkout_url,
    createdAt: dbRow.created_at,
    updatedAt: dbRow.updated_at,
  };
}
