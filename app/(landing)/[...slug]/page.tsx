import { Render } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import { getSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Pegar o primeiro segmento da URL como slug
  const landingSlug = slug[0];

  // Buscar landing page no banco
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
  const data = landingPage.data as any;

  return (
    <div>
      <Render config={puckConfig} data={data} />
    </div>
  );
}

// Gerar metadata dinâmico
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
