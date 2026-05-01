import { cookies } from "next/headers";
import { verifyJWT, COOKIE, type SessionPayload } from "./jwt";

export type Session = { user: SessionPayload } | null;

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyJWT(token);
  if (!payload) return null;
  return { user: payload };
}
