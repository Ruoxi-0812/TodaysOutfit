import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { HangerIcon } from "@/components/ui/HangerIcon";

// Figma MCP assets — expire after 7 days; replace with permanent CDN URLs
const HERO_BG =
  "https://www.figma.com/api/mcp/asset/8fda980e-93e6-4121-be0b-1a4d763251f5";
const IMG_TOP =
  "https://www.figma.com/api/mcp/asset/6c9b36b7-1745-43ed-b84b-a1586cba6646";
const IMG_COAT =
  "https://www.figma.com/api/mcp/asset/683a0a16-1fb9-4c64-a66e-6ec3521054da";
const IMG_BRACELET =
  "https://www.figma.com/api/mcp/asset/963826f4-4a73-46e1-8f02-0234caccb48e";
const IMG_EARRINGS =
  "https://www.figma.com/api/mcp/asset/86bd37a0-3fd1-49f5-b0d6-1d2530ded473";
const IMG_SMALL_BAG =
  "https://www.figma.com/api/mcp/asset/cd445435-ea41-4041-9a1a-da75def92a3e";
const IMG_JEANS =
  "https://www.figma.com/api/mcp/asset/bd77d0f5-8685-4c20-a17d-d004b19110e9";
const IMG_LARGE_BAG =
  "https://www.figma.com/api/mcp/asset/2083b2c5-7bce-441e-9a44-9538e61f6e99";

const NAV_LINKS = ["Home", "Wardrobe", "Community", "Explore"];

const FEATURES = [
  {
    title: "DIGITAL WARDROBE",
    desc: "Upload, tag, and organize your clothing in one place.",
  },
  {
    title: "COMMUNITY INSPIRATION",
    desc: "Browse and save outfit ideas shared by real fashion lovers.",
  },
  {
    title: "AI OUTFIT SUGGESTIONS",
    desc: "Get AI-generated outfit ideas using your closet, trends, and community looks.",
  },
  {
    title: "DAILY OUTFIT TRACKER",
    desc: "Record what you wore and avoid repetition.",
  },
];

export default async function HomePage() {
  const session = await getSession();
  if (session) redirect("/wardrobe");

  return (
    <div className="min-h-screen bg-white font-display">
      {/* ── Navigation (fixed) ──────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-cream/95 backdrop-blur-sm border-b border-black/10 h-[72px] flex items-center px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 text-warm-dark">
          <HangerIcon className="w-7 h-7" />
          <span className="text-sm font-light tracking-[0.25em] uppercase">
            Today&apos;s Outfit
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((label) => {
              const isHome = label === "Home";
              return (
                <li key={label} className="relative">
                  <Link
                    href={isHome ? "/" : "/login"}
                    className={`text-xs tracking-[0.18em] uppercase transition-colors ${
                      isHome ? "text-warm-dark font-medium" : "text-warm-mid/70 hover:text-warm-dark font-light"
                    }`}
                  >
                    {label}
                  </Link>
                  {isHome && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-warm-dark" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Auth buttons */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs tracking-[0.15em] uppercase text-warm-mid hover:text-warm-dark transition-colors font-light px-1"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 bg-warm-dark text-white text-xs tracking-[0.15em] uppercase font-light hover:bg-warm-brown transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* offset for fixed nav */}
      <div className="pt-[72px]">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative h-[860px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "32% 18%" }}
          />
          {/* gradient: clear on far left → dark on right half */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.48) 46%, rgba(0,0,0,0.52) 100%)",
            }}
          />

          {/* Text content — right column */}
          <div className="absolute right-0 top-0 w-[52%] h-full flex flex-col justify-center px-16 gap-7">
            <p className="text-white/70 text-xs tracking-[0.35em] uppercase font-light">
              Your digital closet
            </p>
            <h1
              className="text-white text-[52px] font-thin leading-[1.1] tracking-[0.18em] uppercase"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
            >
              Today&apos;s
              <br />
              Outfit
            </h1>
            <p className="text-white/85 text-base font-light leading-relaxed max-w-[420px] tracking-wide">
              Connect community inspiration with your personal digital closet —
              plan daily looks and rediscover your favorite pieces.
            </p>
            <div className="flex items-center gap-4 mt-1">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-white text-warm-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-warm-cream transition-colors"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="px-8 py-3.5 border border-white/60 text-white text-xs tracking-[0.2em] uppercase font-light hover:border-white transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* ── About Us ────────────────────────────────────────────── */}
        <section className="relative bg-warm-cream py-28 overflow-hidden">
          {/* Decorative clothing images */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG_TOP} alt="" className="absolute left-6 top-10 w-36 pointer-events-none select-none opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG_COAT} alt="" className="absolute left-0 top-52 w-52 pointer-events-none select-none opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG_SMALL_BAG} alt="" className="absolute left-8 bottom-20 w-28 pointer-events-none select-none opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG_BRACELET} alt="" className="absolute right-0 top-8 w-64 pointer-events-none select-none opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG_JEANS} alt="" className="absolute right-0 top-64 w-52 pointer-events-none select-none opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG_LARGE_BAG}
            alt=""
            className="absolute right-28 bottom-16 w-48 -rotate-12 pointer-events-none select-none opacity-90"
          />

          <div className="relative max-w-3xl mx-auto px-4">
            <p className="text-center text-warm-brown/60 text-xs tracking-[0.35em] uppercase font-light mb-4">
              What we offer
            </p>
            <h2 className="text-center text-warm-brown text-4xl font-thin tracking-[0.25em] uppercase mb-20">
              About Us
            </h2>

            <div className="relative grid grid-cols-2 gap-5">
              {/* Earrings decoration between rows */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_EARRINGS}
                alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 pointer-events-none select-none z-10"
              />

              {FEATURES.map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-warm-gray/70 px-10 py-12 min-h-[320px] flex flex-col justify-center"
                >
                  <h3 className="text-xs tracking-[0.25em] uppercase font-medium text-warm-dark mb-4">
                    {title}
                  </h3>
                  <p className="text-sm font-light text-warm-mid leading-relaxed tracking-wide">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Mission ─────────────────────────────────────────── */}
        <section className="bg-warm-dark py-24 px-8">
          <p className="text-center text-white/40 text-xs tracking-[0.35em] uppercase font-light mb-4">
            Our purpose
          </p>
          <h2 className="text-center text-white text-4xl font-thin tracking-[0.25em] uppercase mb-12">
            Our Mission
          </h2>
          <p className="text-white/80 text-xl font-light leading-relaxed max-w-3xl mx-auto text-center tracking-wide">
            To help you dress with confidence by uniting your digital closet,
            smart suggestions, and real outfit inspiration.
          </p>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="bg-warm-cream px-16 py-14 border-t border-warm-gray">
          <div className="flex items-center gap-2.5 text-warm-dark mb-12">
            <HangerIcon className="w-6 h-6" />
            <span className="text-sm font-light tracking-[0.25em] uppercase">
              Today&apos;s Outfit
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-light tracking-wide text-warm-mid/60">
            <p>© 2025 Today&apos;s Outfit. All rights reserved.</p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Contact"].map(
                (link) => (
                  <a key={link} href="#" className="hover:text-warm-dark transition-colors">
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
