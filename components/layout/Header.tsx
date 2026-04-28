interface HeaderProps {
  userName?: string | null;
  userImage?: string | null;
}

export function Header({ userName, userImage }: HeaderProps) {
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="h-16 flex items-center justify-end px-6 bg-white border-b border-blush-100 lg:hidden">
      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-sm text-gray-600">Hi, {userName.split(" ")[0]}!</span>
        )}
        <div className="w-8 h-8 rounded-full bg-blush-200 flex items-center justify-center text-blush-600 text-xs font-semibold">
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt={userName ?? ""} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
      </div>
    </header>
  );
}
