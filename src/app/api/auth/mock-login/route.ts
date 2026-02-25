import { NextRequest, NextResponse } from "next/server";

const VALID_ROLES = ["student", "parent", "tutor", "admin"] as const;

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");

  if (!role || !VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = JSON.stringify({
    userId: `${role}-1`,
    role,
  });

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("tp_session", session, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
