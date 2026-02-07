import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Extrair o subdomínio
  // Ex: produto.exemplo.com -> produto
  const subdomain = hostname.split(".")[0];

  // Se estiver em localhost ou no domínio principal, não fazer nada
  if (
    hostname.includes("localhost") ||
    hostname === process.env.NEXT_PUBLIC_DOMAIN ||
    subdomain === "www" ||
    subdomain === hostname // Sem subdomínio
  ) {
    return NextResponse.next();
  }

  // Se for uma rota admin, não redirecionar
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Reescrever para a rota da landing page com o slug do subdomínio
  // Ex: produto.exemplo.com -> /produto
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
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
