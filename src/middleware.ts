import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // Public routes
  const publicPaths = ["/", "/sign-in", "/sign-up", "/verify"];
  const isCorrectPath = publicPaths.some((path) => path === url.pathname);
  // If user is not authenticated and tries to access protected routes
  if (!token && !isCorrectPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (token && isCorrectPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/sign-in", "/sign-up", "/verify/:path*"],
};
