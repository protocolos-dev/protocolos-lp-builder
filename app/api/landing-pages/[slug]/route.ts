import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/landing-pages/[slug] - Buscar landing page por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const landingPage = await prisma.landingPage.findUnique({
      where: { slug },
    });

    if (!landingPage) {
      return NextResponse.json(
        { error: "Landing page not found" },
        { status: 404 }
      );
    }

    // Parse o JSON data antes de retornar
    return NextResponse.json({
      ...landingPage,
      data: JSON.parse(landingPage.data),
    });
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

    const landingPage = await prisma.landingPage.update({
      where: { slug },
      data: {
        ...(title && { title }),
        ...(data && { data: JSON.stringify(data) }),
        ...(checkoutUrl !== undefined && { checkoutUrl }),
      },
    });

    return NextResponse.json(landingPage);
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

    await prisma.landingPage.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Landing page deleted successfully" });
  } catch (error) {
    console.error("Error deleting landing page:", error);
    return NextResponse.json(
      { error: "Failed to delete landing page" },
      { status: 500 }
    );
  }
}
