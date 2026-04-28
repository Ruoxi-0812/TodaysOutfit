import Link from "next/link";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-warm-gray flex flex-col items-center justify-center px-8 py-24">
      <h1 className="font-lora font-bold text-[48px] text-warm-dark text-center tracking-wide mb-6">
        EXPLORE AI
      </h1>
      <p className="font-montserrat font-semibold text-xl text-warm-dark/70 text-center max-w-2xl mb-16">
        Get AI-powered outfit ideas based on your wardrobe, preferences, and today&apos;s weather.
      </p>
      <Link
        href="/explore/suggest"
        className="flex items-center justify-center px-8 py-4 bg-warm-dark text-white font-montserrat font-semibold text-xl rounded-[21px] hover:bg-warm-brown transition-colors"
      >
        get started
      </Link>
    </div>
  );
}
