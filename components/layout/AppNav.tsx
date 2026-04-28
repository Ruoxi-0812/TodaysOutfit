"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { HangerIcon } from "@/components/ui/HangerIcon";

const NAV_LINKS = [
  { label: "Wardrobe", href: "/wardrobe" },
  { label: "Community", href: "/community" },
  { label: "Explore", href: "/explore" },
  { label: "Calendar", href: "/calendar" },
];

interface AppNavProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MenuIcon({ icon }: { icon: "profile" | "settings" | "add" | "logout" }) {
  if (icon === "profile") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
  if (icon === "settings") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
  if (icon === "add") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function AppNav({ userName, userEmail, userImage }: AppNavProps) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-cream border-b border-black h-[88px] flex items-center px-6">
      {/* Logo */}
      <Link href="/wardrobe" className="shrink-0 flex items-center gap-2 text-warm-dark">
        <HangerIcon className="w-8 h-8" />
      </Link>

      {/* Nav links */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex items-center gap-10 font-montserrat">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className={`text-sm font-semibold tracking-[0.1em] uppercase transition-colors pb-1 ${
                    active ? "text-warm-dark" : "text-warm-mid/60 hover:text-warm-dark"
                  }`}
                >
                  {label}
                </Link>
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-warm-dark" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right: search + avatar */}
      <div className="shrink-0 flex items-center gap-5 text-warm-dark">
        <button className="hover:text-warm-brown transition-colors" aria-label="Search">
          <SearchIcon />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="w-12 h-12 rounded-full bg-warm-gray flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-warm-brown transition-all"
            aria-label="Profile"
          >
            {userImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userImage} alt={userName ?? ""} className="w-full h-full object-cover" />
            ) : (
              <span className="text-warm-dark">
                {userName ? (
                  <span className="text-sm font-semibold font-montserrat">{initials}</span>
                ) : (
                  <ProfileIcon />
                )}
              </span>
            )}
          </button>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-[60px] w-[267px] bg-warm-dark rounded-xl overflow-hidden shadow-xl z-50">
              {/* Avatar + name + email */}
              <div className="flex flex-col items-center pt-8 pb-5 border-b border-white/10">
                <div className="w-[70px] h-[70px] rounded-full bg-warm-gray flex items-center justify-center overflow-hidden mb-2">
                  {userImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={userImage} alt={userName ?? ""} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-warm-dark"><ProfileIcon /></span>
                  )}
                </div>
                <p className="text-white text-xs font-montserrat font-semibold">{userName ?? "User"}</p>
                <p className="text-white/60 text-[11px] font-montserrat mt-0.5">{userEmail ?? ""}</p>
              </div>

              {/* Menu items */}
              <div className="py-3">
                {[
                  { label: "My profile", icon: "profile" as const, href: "/profile" },
                  { label: "Settings", icon: "settings" as const, href: "/settings" },
                  { label: "Add account", icon: "add" as const, href: "#" },
                ].map(({ label, icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-7 py-3 text-white hover:bg-white/10 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <MenuIcon icon={icon} />
                    <span className="text-xs font-montserrat font-semibold">{label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-3 px-7 py-3 text-white hover:bg-white/10 transition-colors w-full"
                >
                  <MenuIcon icon="logout" />
                  <span className="text-xs font-montserrat font-semibold">Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
