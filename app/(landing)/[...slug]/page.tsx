import { getSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PuckRenderer from "@/components/landing/PuckRenderer";
import type { Data } from "@measured/puck";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Use the first URL segment as the slug
  const landingSlug = slug[0];

  // Fetch landing page from the database
  const supabase = await getSupabaseClient();
  const { data: landingPage, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', landingSlug)
    .single();

  if (error || !landingPage) {
    notFound();
  }

  // JSONB auto-parses, no need for JSON.parse
  const data = landingPage.data as Data;

  return (
    <div>
      <PuckRenderer data={data} />
    </div>
  );
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const landingSlug = slug[0];

  const supabase = await getSupabaseClient();
  const { data: landingPage, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', landingSlug)
    .single();

  if (error || !landingPage) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: landingPage.title,
    description: `Landing page: ${landingPage.title}`,
  };
}
