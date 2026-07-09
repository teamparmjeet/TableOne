import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("PROXY RUNNING:", pathname, token, role);

  if (pathname === "/login") {
    if (token && role === "admin") {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/Dashboard")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/Dashboard/:path*"],
};