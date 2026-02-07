import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Data } from "@measured/puck";

// GET /api/landing-pages - Listar todas as landing pages
export async function GET() {
  try {
    const landingPages = await prisma.landingPage.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(landingPages);
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

    // Verificar se o slug já existe
    const existing = await prisma.landingPage.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Landing page with this slug already exists" },
        { status: 409 }
      );
    }

    // Criar landing page
    const landingPage = await prisma.landingPage.create({
      data: {
        slug,
        title,
        data: JSON.stringify(data),
        checkoutUrl,
      },
    });

    return NextResponse.json(landingPage, { status: 201 });
  } catch (error) {
    console.error("Error creating landing page:", error);
    return NextResponse.json(
      { error: "Failed to create landing page" },
      { status: 500 }
    );
  }
}
