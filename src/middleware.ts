import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // Public routes
  const publicPaths = ["/", "/sign-in", "/sign-up", "/verify"];
  const isAllowedAccessPath = publicPaths.some((path) => {
    if (path === "/verify") {
      return /^\/verify(\/.*)?$/.test(url.pathname);
    }
    return path === url.pathname;
  });

  if (!token && !isAllowedAccessPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAllowedAccessPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/sign-in", "/sign-up", "/verify/:path*"],
};
