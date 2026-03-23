"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-2 3.46V12h2a4 4 0 0 1 0 8h-1" />
    <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 2 3.46V12h-2a4 4 0 0 0 0 8h1" />
    <path d="M12 12v10" />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const tabs: Tab[] = [
  { href: "/learn", label: "Learn", icon: <BookIcon /> },
  { href: "/practice", label: "Practice", icon: <BrainIcon /> },
  { href: "/progress", label: "Progress", icon: <ChartIcon /> },
  { href: "/profile", label: "Profile", icon: <UserIcon /> },
];

export function BottomTabs() {
  const pathname = usePathname();

  // Hide bottom tabs during immersive lesson experience
  const isLessonPage = /^\/learn\/[^/]+\/[^/]+/.test(pathname ?? "");
  if (isLessonPage) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-nm-bg-surface/30 bg-nm-bg-secondary/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href || pathname?.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex min-h-[var(--nm-touch-target)] flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                isActive
                  ? "text-nm-accent-indigo"
                  : "text-nm-text-muted hover:text-nm-text-secondary"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
