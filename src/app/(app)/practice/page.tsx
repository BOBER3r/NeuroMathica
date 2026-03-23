export default function PracticePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nm-accent-indigo/10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--nm-accent-indigo)" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-2 3.46V12h2a4 4 0 0 1 0 8h-1" /><path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 2 3.46V12h-2a4 4 0 0 0 0 8h1" /><path d="M12 12v10" /></svg>
      </div>
      <h1 className="mb-2 text-xl font-bold text-nm-text-primary">Practice</h1>
      <p className="text-center text-sm text-nm-text-secondary">Adaptive practice sessions coming soon.</p>
    </div>
  );
}
