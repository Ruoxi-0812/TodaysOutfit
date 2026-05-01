import { SignJWT, jwtVerify } from "jose";

export const COOKIE = "session";
export const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export async function signJWT(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyJWT(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${EXPIRES_IN}${secure}`;
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
