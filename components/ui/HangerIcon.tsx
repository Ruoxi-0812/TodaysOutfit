export function HangerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M25 2C25 2 33 2 33 9C33 14 27 15 25 16" />
      <path d="M25 16L4 42" />
      <path d="M25 16L46 42" />
      <line x1="1" y1="42" x2="49" y2="42" />
    </svg>
  );
}
