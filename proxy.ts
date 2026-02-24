import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // attach userId to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", session.session.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/:path*"], // match nested routes
};