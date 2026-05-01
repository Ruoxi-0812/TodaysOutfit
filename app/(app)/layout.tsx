import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppNav } from "@/components/layout/AppNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-warm-gray">
      <AppNav
        userName={session.user?.name}
        userEmail={session.user?.email}
        userImage={session.user?.image}
      />
      <main className="pt-22">{children}</main>
    </div>
  );
}
