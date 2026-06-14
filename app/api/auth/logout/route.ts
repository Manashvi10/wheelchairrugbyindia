import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const isHttps =
    req.headers.get("x-forwarded-proto") === "https" ||
    req.nextUrl.protocol === "https:";

  const res = NextResponse.json({ success: true });
  res.cookies.set("wrfi_token", "", {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
