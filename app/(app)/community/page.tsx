// Community page — static inspiration feed matching Figma community-1 design.
// Real data integration (posts, likes, comments) can be added in a future iteration.

const SORT_OPTIONS = ["Occasion", "Weather", "Style", "Influencer"] as const;
const FILTER_OPTIONS = ["Popular", "Recent"] as const;

const POSTS = [
  {
    id: 1,
    user: "Jessica",
    initial: "J",
    color: "#a92574",
    likes: 48,
    comments: 9,
    shares: 34,
    caption: "My OOTD! 💗",
    imageUrl: null,
  },
  {
    id: 2,
    user: "Linda",
    initial: "L",
    color: "#711889",
    likes: 55,
    comments: 10,
    shares: 2,
    caption: "☕️ enjoy ~",
    imageUrl: null,
  },
  {
    id: 3,
    user: "Doris",
    initial: "D",
    color: "#2f769d",
    likes: 32,
    comments: 4,
    shares: 6,
    caption: "Casual City Mood :)",
    imageUrl: null,
  },
  {
    id: 4,
    user: "Stella",
    initial: "S",
    color: "#89181a",
    likes: 101,
    comments: 99,
    shares: 20,
    caption: "Bold Espresso Tones 🎀",
    imageUrl: null,
  },
  {
    id: 5,
    user: "Lisa",
    initial: "L",
    color: "#356512",
    likes: 68,
    comments: 10,
    shares: 23,
    caption: "Autumn coming 🍂",
    imageUrl: null,
  },
  {
    id: 6,
    user: "Cecilia",
    initial: "C",
    color: "#8a5227",
    likes: 12,
    comments: 3,
    shares: 4,
    caption: "Cold day 🤎",
    imageUrl: null,
  },
] as const;

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-warm-dark">
      <div className="flex">
        {/* Left sidebar */}
        <aside className="w-56 shrink-0 px-8 pt-12 pb-8">
          <p className="font-montserrat font-semibold text-xl text-white mb-4">Sort by</p>
          <ul className="mb-10">
            {SORT_OPTIONS.map((opt) => (
              <li key={opt}>
                <button className="w-full flex items-center justify-between py-2.5 border-b border-white/20 text-white font-montserrat font-semibold text-lg hover:text-warm-gray/80 transition-colors text-left">
                  {opt}
                  <span className="text-white/60 text-sm">›</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="font-montserrat font-semibold text-xl text-white mb-4">Filter by</p>
          <div className="flex flex-col gap-3">
            {FILTER_OPTIONS.map((opt, i) => (
              <button
                key={opt}
                className={`px-6 py-1.5 rounded-[21px] font-montserrat font-semibold text-lg transition-colors ${
                  i === 0
                    ? "bg-white text-warm-dark"
                    : "border border-white text-white hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </aside>

        {/* Post grid */}
        <main className="flex-1 px-8 py-10">
          <div className="grid grid-cols-2 gap-6 max-w-4xl">
            {POSTS.map((post) => (
              <article key={post.id} className="bg-white rounded-[17px] overflow-hidden">
                {/* User header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: post.color }}
                  >
                    <span className="text-white font-bold text-lg leading-none">{post.initial}</span>
                  </div>
                  <span className="font-montserrat font-bold text-sm text-[#2d2936]">{post.user}</span>
                </div>

                {/* Photo area */}
                <div className="w-full aspect-[4/5] bg-warm-gray flex items-center justify-center">
                  <span className="text-warm-dark/30 text-sm font-montserrat">No photo yet</span>
                </div>

                {/* Footer: stats + caption */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-5 mb-2 text-[#333]">
                    <div className="flex items-center gap-1.5">
                      <HeartIcon />
                      <span className="font-montserrat font-semibold text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ChatIcon />
                      <span className="font-montserrat font-semibold text-sm">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShareIcon />
                      <span className="font-montserrat font-semibold text-sm">{post.shares}</span>
                    </div>
                  </div>
                  <p className="font-montserrat font-bold text-sm text-[#1b1b1b]">{post.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
