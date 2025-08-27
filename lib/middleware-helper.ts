import type { NextRequest } from "next/server"

export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/secret-admin-panel-xyz123")
}

export function checkAdminAccess(request: NextRequest): boolean {
  const secretKey = request.nextUrl.searchParams.get("key")
  const adminSecretKey = process.env.ADMIN_SECRET_KEY

  if (!adminSecretKey || secretKey !== adminSecretKey) {
    return false
  }

  return true
}
