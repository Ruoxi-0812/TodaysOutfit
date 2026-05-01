"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/wardrobe", label: "Wardrobe", icon: "👗" },
  { href: "/outfits", label: "Outfits", icon: "✨" },
  { href: "/calendar", label: "Calendar", icon: "📅" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-blush-100 flex flex-col z-10">
      <div className="px-6 py-6 border-b border-blush-100">
        <span className="text-xl font-bold text-blush-500">✿ Today's Outfit</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-blush-100 text-blush-600"
                  : "text-gray-600 hover:bg-blush-50 hover:text-blush-500"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-blush-100">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
          }}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition-colors"
        >
          <span>🚪</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
