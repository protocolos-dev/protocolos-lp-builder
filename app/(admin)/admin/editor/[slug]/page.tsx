"use client";

import { Puck } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Data } from "@measured/puck";
import "@measured/puck/puck.css";
import PublishDialog from "@/components/admin/PublishDialog";

interface LandingPage {
  id: string;
  slug: string;
  title: string;
  data: Data;
  checkoutUrl?: string | null;
}

type DialogMode = "new" | "success" | "error";

export default function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [isNew, setIsNew] = useState(false);
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Publish dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("new");
  const [dialogErrorMsg, setDialogErrorMsg] = useState<string | undefined>();
  const [pendingData, setPendingData] = useState<Data | null>(null);

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
      setIsNew(p.slug === "new");
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    if (isNew) {
      setLoading(false);
      return;
    }

    fetch(`/api/landing-pages/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Landing page not found");
        return res.json();
      })
      .then((data) => {
        setLandingPage(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading landing page:", error);
        router.push("/admin");
      });
  }, [slug, isNew, router]);

  // Triggered by Puck's Publish button
  const handleSave = async (data: Data) => {
    if (isNew) {
      // New pages: open publish form dialog
      setPendingData(data);
      setDialogMode("new");
      setDialogOpen(true);
      return;
    }

    // Existing pages: save immediately and show success/error dialog
    setSaving(true);
    try {
      const response = await fetch(`/api/landing-pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) throw new Error("Failed to update landing page");

      setDialogMode("success");
      setDialogOpen(true);
    } catch (error) {
      setDialogErrorMsg(
        error instanceof Error ? error.message : "Unknown error"
      );
      setDialogMode("error");
      setDialogOpen(true);
    } finally {
      setSaving(false);
    }
  };

  // Triggered by the publish form dialog (new pages only)
  const handlePublishSubmit = async (form: {
    title: string;
    slug: string;
    checkoutUrl: string;
  }) => {
    if (!pendingData) return;
    setSaving(true);

    try {
      const response = await fetch("/api/landing-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          title: form.title,
          data: pendingData,
          checkoutUrl: form.checkoutUrl || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create landing page");
      }

      const created: LandingPage = await response.json();
      setLandingPage(created);
      setSlug(created.slug);
      setIsNew(false);
      setDialogMode("success");
    } catch (error) {
      setDialogErrorMsg(
        error instanceof Error ? error.message : "Unknown error"
      );
      setDialogMode("error");
    } finally {
      setSaving(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // After successfully publishing a new page, redirect to admin
    if (dialogMode === "success" && isNew) {
      router.push("/admin");
    }
  };

  if (loading) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={landingPage?.data || { content: [], root: {} }}
        onPublish={handleSave}
      />

      {saving && !dialogOpen && (
        <div className="fixed top-4 right-4 z-50 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md shadow-lg">
          Saving...
        </div>
      )}

      <PublishDialog
        open={dialogOpen}
        mode={dialogMode}
        pageSlug={landingPage?.slug ?? (isNew ? undefined : slug)}
        checkoutUrl={landingPage?.checkoutUrl}
        errorMessage={dialogErrorMsg}
        saving={saving}
        onSubmit={handlePublishSubmit}
        onClose={handleDialogClose}
      />
    </div>
  );
}
