import Link from "next/link";
import { getSupabaseClient, transformLandingPage } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings2Icon } from "lucide-react";

export default async function AdminPage() {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  const landingPages = data.map(transformLandingPage);

  return (
    <div className="dark min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Landing Pages</h1>
          <Button asChild>
            <Link href="/admin/editor/new">+ New page</Link>
          </Button>
        </div>

        {/* Empty state */}
        {landingPages.length === 0 ? (
          <Card>
            <CardContent className="py-20 flex flex-col items-center gap-4 text-center">
              <p className="text-muted-foreground text-sm">No landing pages yet.</p>
              <Button variant="outline" asChild>
                <Link href="/admin/editor/new">Create your first page →</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Pages grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {landingPages.map((lp) => (
              <Card key={lp.id} className="flex flex-col">
                <CardContent className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-semibold text-foreground truncate">
                      {lp.title}
                    </h2>
                    <Badge variant="secondary" className="font-mono self-start text-xs">
                      /{lp.slug}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-xs mt-auto">
                    Updated {new Date(lp.updatedAt).toLocaleDateString("en-US")}
                  </p>

                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/admin/editor/${lp.slug}`}>Edit</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a
                        href={`/${lp.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Preview
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="px-2.5">
                      <Link href={`/admin/settings/${lp.slug}`} title="Settings">
                        <Settings2Icon className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
