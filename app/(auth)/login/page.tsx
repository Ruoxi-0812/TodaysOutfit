"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { HangerIcon } from "@/components/ui/HangerIcon";

const FIELD_CLS =
  "w-full h-[51px] bg-white border border-[#2f2f2f] rounded-lg px-3 text-sm font-montserrat placeholder:text-[#b3b3b3] placeholder:italic focus:outline-none focus:ring-2 focus:ring-[#85726e] transition-colors";

const LABEL_CLS =
  "block text-xs font-montserrat font-semibold tracking-wide text-[#85726e] mb-1.5";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Invalid email or password");
      setLoading(false);
    } else {
      router.push("/wardrobe");
    }
  }

  return (
    <div className="min-h-screen bg-warm-gray font-display">
      {/* Logo top-left */}
      <div className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2 text-warm-dark">
          <HangerIcon className="w-7 h-7" />
          <span className="text-xs font-light tracking-[0.25em] uppercase">
            Today&apos;s Outfit
          </span>
        </Link>
      </div>

      {/* Centered form */}
      <div className="flex flex-col items-center px-4 pt-10 pb-20">
        <h1 className="text-warm-dark text-5xl font-bold font-lora text-center mb-4">
          Welcome back
        </h1>
        <p className="text-[#85726e] text-lg font-montserrat font-semibold text-center mb-10 max-w-lg">
          Sign in to your digital wardrobe.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-85 space-y-5">
          {registered && (
            <p className="text-sm text-green-700 bg-green-50 rounded px-3 py-2 font-montserrat">
              Account created! You can sign in now.
            </p>
          )}

          <div>
            <label htmlFor="email" className={LABEL_CLS}>
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Type your email address"
              required
              className={FIELD_CLS}
            />
          </div>

          <div>
            <label htmlFor="password" className={LABEL_CLS}>
              password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type your password"
              required
              className={FIELD_CLS}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded px-3 py-2 font-montserrat">
              {error}
            </p>
          )}

          <p className="text-sm font-montserrat text-center">
            <span className="text-[#85726e]">Don&apos;t have an account? </span>
            <Link
              href="/register"
              className="font-bold text-black underline underline-offset-2 hover:text-[#85726e] transition-colors"
            >
              Create one
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#85726e] text-white text-sm font-montserrat font-bold rounded-lg hover:bg-[#6e5f5b] disabled:opacity-60 transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
