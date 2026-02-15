import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient, transformLandingPage } from "@/lib/supabase";
import { Data } from "@measured/puck";

// GET /api/landing-pages - Listar todas as landing pages
export async function GET() {
  try {
    const supabase = await getSupabaseClient();
    const { data: landingPages, error } = await supabase
      .from('landing_pages')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(landingPages.map(transformLandingPage));
  } catch (error) {
    console.error("Error fetching landing pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch landing pages" },
      { status: 500 }
    );
  }
}

// POST /api/landing-pages - Criar nova landing page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, data, checkoutUrl } = body;

    // Validação básica
    if (!slug || !title || !data) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, data" },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseClient();

    // Criar landing page
    const { data: landingPage, error } = await supabase
      .from('landing_pages')
      .insert({
        slug,
        title,
        data, // No JSON.stringify needed - JSONB handles it
        checkout_url: checkoutUrl,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'Landing page with this slug already exists' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(transformLandingPage(landingPage), { status: 201 });
  } catch (error) {
    console.error("Error creating landing page:", error);
    return NextResponse.json(
      { error: "Failed to create landing page" },
      { status: 500 }
    );
  }
}
