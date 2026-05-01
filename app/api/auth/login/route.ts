import { prisma } from "@/lib/prisma";
import { signJWT, sessionCookie } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  });

  return Response.json({ ok: true }, {
    headers: { "Set-Cookie": sessionCookie(token) },
  });
}
