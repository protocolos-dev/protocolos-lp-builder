import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Strip port to get clean hostname (e.g. "slug.localhost:3000" → "slug.localhost")
  const hostWithoutPort = hostname.split(":")[0];
  const subdomain = hostWithoutPort.split(".")[0];

  // Subdomain detection:
  //   Local dev  — slug.localhost   (e.g. produto.localhost:3000)
  //   Production — slug.domain.com  (e.g. produto.example.com)
  const isLocalhostSubdomain =
    hostWithoutPort !== "localhost" && hostWithoutPort.endsWith(".localhost");

  const isProductionSubdomain =
    !!process.env.NEXT_PUBLIC_DOMAIN &&
    hostWithoutPort !== process.env.NEXT_PUBLIC_DOMAIN &&
    hostWithoutPort.endsWith(`.${process.env.NEXT_PUBLIC_DOMAIN}`);

  const isSubdomain =
    (isLocalhostSubdomain || isProductionSubdomain) && subdomain !== "www";

  // Rewrite subdomain requests to the internal slug path
  // e.g. produto.example.com/path → /produto/path
  if (isSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Refresh Supabase session and get current user
  const { supabaseResponse, user } = await updateSession(request);

  // Protect /admin routes
  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from login page
  if (pathname === "/" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
