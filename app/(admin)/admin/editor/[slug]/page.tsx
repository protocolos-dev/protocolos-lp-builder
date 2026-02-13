"use client";

import { Puck } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Data } from "@measured/puck";
import "@measured/puck/puck.css";

interface LandingPage {
  id: string;
  slug: string;
  title: string;
  data: Data;
  checkoutUrl?: string | null;
}

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

    // Buscar landing page existente
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
        alert("Error loading landing page");
        router.push("/admin");
      });
  }, [slug, isNew, router]);

  const handleSave = async (data: Data) => {
    setSaving(true);

    try {
      if (isNew) {
        // Create new landing page
        const title = prompt("Landing page title:");
        const newSlug = prompt("Slug (subdomain):");
        const checkoutUrl = prompt("Checkout URL (optional):");

        if (!title || !newSlug) {
          alert("Title and slug are required");
          setSaving(false);
          return;
        }

        const response = await fetch("/api/landing-pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: newSlug,
            title,
            data,
            checkoutUrl: checkoutUrl || undefined,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create landing page");
        }

        alert("Landing page created successfully!");
        router.push("/admin");
      } else {
        // Update existing landing page
        const response = await fetch(`/api/landing-pages/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });

        if (!response.ok) {
          throw new Error("Failed to update landing page");
        }

        alert("Landing page updated successfully!");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert(`Error while saving: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
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
      {saving && (
        <div className="fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg">
          Saving...
        </div>
      )}
    </div>
  );
}
