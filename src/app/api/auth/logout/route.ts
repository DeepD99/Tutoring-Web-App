import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  response.cookies.set("tp_session", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}
