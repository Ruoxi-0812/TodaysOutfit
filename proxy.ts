import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "session";

async function getPayload(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected =
    pathname.startsWith("/wardrobe") ||
    pathname.startsWith("/outfits") ||
    pathname.startsWith("/calendar");

  const session = await getPayload(request);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/wardrobe", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
