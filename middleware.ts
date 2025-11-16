import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Farcaster-Mini-App", "true");

  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    res.headers.set("Cache-Control", "no-store");
  }

  return res;
}

export const config = {
  matcher: ["/:path*"],
};