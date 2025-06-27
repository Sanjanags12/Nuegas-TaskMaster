
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const isAuthPage = request.nextUrl.pathname === "/login";
  const isProtectedPage = ["/overview", "/dashboard"].some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Not authenticated and trying to access a protected route
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated and trying to access login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/dashboard", "/login"], 
};
