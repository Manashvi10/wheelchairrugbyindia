import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  const token = req.cookies.get("wrfi_token")?.value;

  let valid = false;
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      valid = true;
    } catch {
      valid = false;
    }
  }

  // Already authenticated → skip login page, go to dashboard
  if (isLoginPage && valid) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Unauthenticated → block all admin routes except login
  if (isAdminRoute && !isLoginPage && !valid) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
