import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient, transformLandingPage } from "@/lib/supabase";

// GET /api/landing-pages/[slug] - Buscar landing page por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await getSupabaseClient();

    const { data: landingPage, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { error: "Landing page not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    // JSONB auto-parses, no need for JSON.parse
    return NextResponse.json(transformLandingPage(landingPage));
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return NextResponse.json(
      { error: "Failed to fetch landing page" },
      { status: 500 }
    );
  }
}

// PUT /api/landing-pages/[slug] - Atualizar landing page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, data, checkoutUrl } = body;

    const supabase = await getSupabaseClient();

    const updateData: any = {};
    if (title) updateData.title = title;
    if (data) updateData.data = data; // No JSON.stringify
    if (checkoutUrl !== undefined) updateData.checkout_url = checkoutUrl;

    const { data: landingPage, error } = await supabase
      .from('landing_pages')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { error: "Landing page not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(transformLandingPage(landingPage));
  } catch (error) {
    console.error("Error updating landing page:", error);
    return NextResponse.json(
      { error: "Failed to update landing page" },
      { status: 500 }
    );
  }
}

// DELETE /api/landing-pages/[slug] - Deletar landing page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await getSupabaseClient();

    const { error } = await supabase
      .from('landing_pages')
      .delete()
      .eq('slug', slug);

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return NextResponse.json(
          { error: "Landing page not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ message: "Landing page deleted successfully" });
  } catch (error) {
    console.error("Error deleting landing page:", error);
    return NextResponse.json(
      { error: "Failed to delete landing page" },
      { status: 500 }
    );
  }
}
