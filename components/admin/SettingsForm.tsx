"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { getLandingPageUrl } from "@/lib/subdomain";

interface SettingsFormProps {
  currentSlug: string;
  initialTitle: string;
  initialSlug: string;
  initialCheckoutUrl: string;
}

type SaveStatus = "idle" | "saving" | "success" | "error";

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function SettingsForm({
  currentSlug,
  initialTitle,
  initialSlug,
  initialCheckoutUrl,
}: SettingsFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [checkoutUrl, setCheckoutUrl] = useState(initialCheckoutUrl);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const hasChanges =
    title !== initialTitle ||
    slug !== initialSlug ||
    checkoutUrl !== initialCheckoutUrl;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    setSaveStatus("saving");
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/landing-pages/${currentSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug,
          checkoutUrl: checkoutUrl.trim() || undefined,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error || "Failed to save settings");
      }

      setSaveStatus("success");

      // If slug changed, navigate to the new settings URL
      if (body.slug !== currentSlug) {
        router.push(`/admin/settings/${body.slug}`);
      } else {
        setTimeout(() => setSaveStatus("idle"), 2500);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setSaveStatus("error");
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/landing-pages/${currentSlug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete page");
      router.push("/admin");
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* General settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
          <CardDescription>Basic information about this landing page.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSaveStatus("idle");
                }}
                placeholder="My Awesome Product"
              />
              <p className="text-xs text-muted-foreground">
                Used as the page&apos;s SEO title.
              </p>
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm select-none">
                  /
                </span>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(formatSlug(e.target.value));
                    setSaveStatus("idle");
                  }}
                  placeholder="my-awesome-product"
                  className="rounded-l-none font-mono"
                />
              </div>
              {slug && (
                <p className="text-xs text-muted-foreground font-mono">
                  {getLandingPageUrl(slug)}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Changing the slug redirects you to the updated settings URL.
              </p>
            </div>

            {/* Checkout URL */}
            <div className="space-y-1.5">
              <Label htmlFor="checkoutUrl">
                Checkout URL{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                id="checkoutUrl"
                type="url"
                value={checkoutUrl}
                onChange={(e) => {
                  setCheckoutUrl(e.target.value);
                  setSaveStatus("idle");
                }}
                placeholder="https://pay.example.com/product"
              />
              <p className="text-xs text-muted-foreground">
                Linked to CTA buttons throughout the page.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-3 border-t pt-4">
            <div className="text-sm">
              {saveStatus === "success" && (
                <span className="text-foreground font-medium">Saved.</span>
              )}
              {saveStatus === "error" && (
                <span className="text-destructive">{errorMessage}</span>
              )}
            </div>
            <Button
              type="submit"
              disabled={saveStatus === "saving" || !hasChanges}
            >
              {saveStatus === "saving" ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Separator />

      {/* Danger zone */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions. Proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Delete this page</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently removes the page and all its content.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete page"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark bg-card text-card-foreground border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete &quot;{title}&quot;?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The page will be permanently
                    deleted and the URL <span className="font-mono">/{slug}</span> will
                    stop working immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
