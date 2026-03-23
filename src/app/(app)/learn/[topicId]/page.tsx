"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function TopicDetailPage() {
  const params = useParams<{ topicId: string }>();
  const { data: concept, isLoading } = trpc.curriculum.getConcept.useQuery(
    { conceptId: params.topicId },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-4">
        <p className="text-nm-text-secondary">Topic not found</p>
        <Link href="/learn">
          <Button variant="secondary">Back to Learn</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <Link
        href="/learn"
        className="mb-4 inline-flex items-center gap-1 text-sm text-nm-text-muted hover:text-nm-text-secondary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </Link>

      <div
        className="mb-6 inline-block rounded-lg px-3 py-1 text-xs font-medium"
        style={{
          backgroundColor: `${concept.domain.color}20`,
          color: concept.domain.color,
        }}
      >
        {concept.domain.name}
      </div>

      <h1 className="mb-2 text-2xl font-bold text-nm-text-primary">
        {concept.name}
      </h1>
      <p className="mb-6 text-nm-text-secondary">{concept.description}</p>

      {concept.prerequisites.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium text-nm-text-muted">
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {concept.prerequisites.map((p) => (
              <Link key={p.id} href={`/learn/${p.id}`}>
                <span className="inline-block rounded-full bg-nm-bg-surface px-3 py-1 text-xs text-nm-text-secondary hover:text-nm-text-primary">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Card padding="lg" className="mb-4">
        <h3 className="mb-2 font-semibold text-nm-text-primary">Lesson</h3>
        <p className="mb-4 text-sm text-nm-text-secondary">
          7-stage Neural Learning Sequence with interactive visualizations
        </p>
        <Link href={`/learn/${concept.id}/lesson`}>
          <Button variant="primary" size="lg" className="w-full">
            Start Lesson
          </Button>
        </Link>
      </Card>

      {concept.successors.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-nm-text-muted">
            Unlocks
          </h3>
          <div className="flex flex-wrap gap-2">
            {concept.successors.map((s) => (
              <span
                key={s.id}
                className="inline-block rounded-full bg-nm-bg-surface px-3 py-1 text-xs text-nm-text-muted"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
