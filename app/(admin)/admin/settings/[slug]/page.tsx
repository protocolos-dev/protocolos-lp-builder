import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient, transformLandingPage } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SettingsForm from "@/components/admin/SettingsForm";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  const page = transformLandingPage(data);

  return (
    <div className="dark min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-4 text-muted-foreground">
            <Link href="/admin">
              <ArrowLeftIcon className="w-4 h-4" />
              Landing Pages
            </Link>
          </Button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl font-semibold text-foreground">{page.title}</h1>
              <Badge variant="secondary" className="font-mono self-start text-xs">
                /{page.slug}
              </Badge>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/editor/${page.slug}`}>
                <PencilIcon className="w-4 h-4" />
                Edit content
              </Link>
            </Button>
          </div>
        </div>

        {/* Settings form */}
        <SettingsForm
          currentSlug={page.slug}
          initialTitle={page.title}
          initialSlug={page.slug}
          initialCheckoutUrl={page.checkoutUrl ?? ""}
        />
      </div>
    </div>
  );
}
