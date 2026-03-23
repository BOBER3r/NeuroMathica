export default function LessonLoading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-nm-accent-indigo border-t-transparent" />
        <p className="text-sm text-nm-text-muted">Loading lesson...</p>
      </div>
    </div>
  );
}
