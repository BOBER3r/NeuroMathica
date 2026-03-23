import { BottomTabs } from "@/components/navigation/BottomTabs";
import { OfflineBanner } from "@/components/navigation/OfflineBanner";
import { AppLayoutShell } from "@/components/navigation/AppLayoutShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayoutShell>
      <OfflineBanner />
      <main className="flex-1">{children}</main>
      <BottomTabs />
    </AppLayoutShell>
  );
}
