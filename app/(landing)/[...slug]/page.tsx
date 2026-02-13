import { Render } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import { prisma } from "@/lib/db";
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
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug: landingSlug },
  });

  if (!landingPage) {
    notFound();
  }

  // Parse do JSON data
  const data = JSON.parse(landingPage.data);

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

  const landingPage = await prisma.landingPage.findUnique({
    where: { slug: landingSlug },
  });

  if (!landingPage) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: landingPage.title,
    description: `Landing page: ${landingPage.title}`,
  };
}
