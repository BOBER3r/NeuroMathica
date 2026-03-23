"use client";

import { usePathname } from "next/navigation";

export function AppLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Remove bottom padding during immersive lesson pages (tabs are hidden)
  const isLessonPage = /^\/learn\/[^/]+\/[^/]+/.test(pathname ?? "");

  return (
    <div
      className={`flex min-h-dvh flex-col bg-nm-bg-primary ${isLessonPage ? "" : "pb-16"}`}
    >
      {children}
    </div>
  );
}
