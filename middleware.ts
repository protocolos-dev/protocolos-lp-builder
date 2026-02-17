import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Handle subdomain routing first (non-localhost, non-main domain)
  const subdomain = hostname.split(".")[0];
  const isSubdomain =
    !hostname.includes("localhost") &&
    hostname !== process.env.NEXT_PUBLIC_DOMAIN &&
    subdomain !== "www" &&
    subdomain !== hostname;

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
