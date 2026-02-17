"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NewPageForm {
  title: string;
  slug: string;
  checkoutUrl: string;
}

interface PublishDialogProps {
  open: boolean;
  mode: "new" | "success" | "error";
  pageSlug?: string;
  checkoutUrl?: string | null;
  errorMessage?: string;
  saving?: boolean;
  onSubmit: (form: NewPageForm) => void;
  onClose: () => void;
}

// ── Inline icons ──────────────────────────────────────────────────────────────

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconAlertCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconLink = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-muted-foreground"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function PublishDialog({
  open,
  mode,
  pageSlug,
  checkoutUrl,
  errorMessage,
  saving = false,
  onSubmit,
  onClose,
}: PublishDialogProps) {
  const [form, setForm] = useState<NewPageForm>({
    title: "",
    slug: "",
    checkoutUrl: "",
  });
  const [errors, setErrors] = useState<Partial<NewPageForm>>({});
  const [copied, setCopied] = useState<"url" | "checkout" | null>(null);

  // Reset form when opening in "new" mode
  useEffect(() => {
    if (open && mode === "new") {
      setForm({ title: "", slug: "", checkoutUrl: "" });
      setErrors({});
    }
  }, [open, mode]);

  // ── Slug auto-format ──────────────────────────────────────────────────────

  const formatSlug = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleTitleChange = (value: string) => {
    const newSlug =
      form.slug === "" || form.slug === formatSlug(form.title)
        ? formatSlug(value)
        : form.slug;
    setForm((f) => ({ ...f, title: value, slug: newSlug }));
    setErrors((e) => ({ ...e, title: undefined, slug: undefined }));
  };

  const handleSlugChange = (value: string) => {
    setForm((f) => ({ ...f, slug: formatSlug(value) }));
    setErrors((e) => ({ ...e, slug: undefined }));
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const newErrors: Partial<NewPageForm> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  // ── Copy to clipboard ─────────────────────────────────────────────────────

  const copyToClipboard = async (text: string, type: "url" | "checkout") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const pageUrl = pageSlug ? `${window.location.origin}/${pageSlug}` : "";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !(mode === "new" && saving)) onClose();
      }}
    >
      <DialogContent
        className="dark bg-card text-card-foreground border-border sm:max-w-md"
        showCloseButton={mode !== "new"}
        onInteractOutside={(e) => {
          if (mode === "new" && saving) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (mode === "new" && saving) e.preventDefault();
        }}
      >
        {/* ── Mode: new ──────────────────────────────────────────────────── */}
        {mode === "new" && (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-4">
              <DialogTitle>Publish page</DialogTitle>
              <DialogDescription>
                Fill in the details to publish your landing page.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="pub-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pub-title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. My Awesome Product"
                  disabled={saving}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <Label htmlFor="pub-slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    /
                  </span>
                  <Input
                    id="pub-slug"
                    value={form.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="my-awesome-product"
                    disabled={saving}
                    className={`rounded-l-none ${errors.slug ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs text-destructive">{errors.slug}</p>
                )}
                {form.slug && !errors.slug && (
                  <p className="text-xs text-muted-foreground">
                    URL:{" "}
                    {typeof window !== "undefined"
                      ? window.location.origin
                      : ""}
                    /{form.slug}
                  </p>
                )}
              </div>

              {/* Checkout URL */}
              <div className="space-y-1.5">
                <Label htmlFor="pub-checkout">
                  Checkout URL{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="pub-checkout"
                  type="url"
                  value={form.checkoutUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, checkoutUrl: e.target.value }))
                  }
                  placeholder="https://pay.example.com/product"
                  disabled={saving}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* ── Mode: success ───────────────────────────────────────────────── */}
        {mode === "success" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <IconCheck />
                </div>
                <div>
                  <DialogTitle>Published successfully</DialogTitle>
                  <DialogDescription className="mt-0.5">
                    Your landing page is live.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-3">
              {pageUrl && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Page URL
                  </p>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-md border border-border">
                    <IconLink />
                    <span className="flex-1 text-xs text-foreground truncate font-mono">
                      {pageUrl}
                    </span>
                    <button
                      onClick={() => copyToClipboard(pageUrl, "url")}
                      className="text-xs text-muted-foreground hover:text-foreground font-medium whitespace-nowrap transition-colors"
                    >
                      {copied === "url" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              {checkoutUrl && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Checkout URL
                  </p>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-md border border-border">
                    <IconLink />
                    <span className="flex-1 text-xs text-foreground truncate font-mono">
                      {checkoutUrl}
                    </span>
                    <button
                      onClick={() => copyToClipboard(checkoutUrl, "checkout")}
                      className="text-xs text-muted-foreground hover:text-foreground font-medium whitespace-nowrap transition-colors"
                    >
                      {copied === "checkout" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {pageUrl && (
                <Button asChild>
                  <a href={pageUrl} target="_blank" rel="noopener noreferrer">
                    View page →
                  </a>
                </Button>
              )}
            </DialogFooter>
          </>
        )}

        {/* ── Mode: error ─────────────────────────────────────────────────── */}
        {mode === "error" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
                  <IconAlertCircle />
                </div>
                <div>
                  <DialogTitle>Failed to publish</DialogTitle>
                  <DialogDescription className="mt-0.5">
                    {errorMessage || "An unexpected error occurred."}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
