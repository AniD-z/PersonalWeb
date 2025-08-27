import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminRoute, checkAdminAccess } from "./lib/middleware-helper"

export function middleware(request: NextRequest) {
  // Check if this is an admin route
  if (isAdminRoute(request.nextUrl.pathname)) {
    // Check admin access
    if (!checkAdminAccess(request)) {
      // Redirect to 404 instead of showing unauthorized
      return NextResponse.redirect(new URL("/404", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/secret-admin-panel-xyz123/:path*"],
}
