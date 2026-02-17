/**
 * Builds the public URL for a landing page subdomain.
 *
 * - Production:  https://<slug>.<NEXT_PUBLIC_DOMAIN>
 * - Local dev:   http://<slug>.localhost:<port>
 *
 * Works in both server and client contexts.
 */
export function getLandingPageUrl(slug: string): string {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  if (domain) {
    return `https://${slug}.${domain}`;
  }

  // Local dev: read port from window if available, fallback to 3000
  if (typeof window !== "undefined") {
    const { port } = window.location;
    return `http://${slug}.localhost${port ? `:${port}` : ""}`;
  }

  return `http://${slug}.localhost:3000`;
}
