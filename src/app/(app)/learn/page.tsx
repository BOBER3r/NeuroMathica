"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const DOMAIN_ICONS: Record<string, string> = {
  "numbers-operations": "123",
  "number-theory": "#",
  "algebra": "x",
  "geometry": "\u25B3",
  "statistics-probability": "\u03C3",
};

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const { data: domains, isLoading } = trpc.curriculum.getDomains.useQuery();
  const { data: graph } = trpc.curriculum.getGraph.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
      </div>
    );
  }

  // Get concepts for the selected domain
  const domainConcepts = selectedDomain && graph
    ? graph.nodes.filter((n) => n.domainId === selectedDomain)
    : [];

  const selectedDomainData = domains?.find((d) => d.id === selectedDomain);

  return (
    <div className="p-4 pb-20">
      {!selectedDomain ? (
        <>
          <h1 className="mb-1 text-2xl font-bold text-nm-text-primary">Learn</h1>
          <p className="mb-6 text-sm text-nm-text-secondary">
            Choose a math domain to explore
          </p>

          <div className="flex flex-col gap-3">
            {domains?.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className="w-full text-left"
              >
                <Card interactive padding="md" className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold"
                    style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                  >
                    {DOMAIN_ICONS[domain.id] ?? "\u00B7"}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-nm-text-primary">
                      {domain.name}
                    </h2>
                    <p className="text-sm text-nm-text-muted">
                      {domain.conceptCount} topics
                    </p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-nm-text-muted">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Card>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedDomain(null)}
            className="mb-4 inline-flex items-center gap-1 text-sm text-nm-text-muted hover:text-nm-text-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Domains
          </button>

          <div
            className="mb-1 inline-block rounded-lg px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${selectedDomainData?.color ?? "#818cf8"}20`,
              color: selectedDomainData?.color ?? "#818cf8",
            }}
          >
            {selectedDomainData?.name}
          </div>

          <h1 className="mb-1 mt-2 text-2xl font-bold text-nm-text-primary">
            Topics
          </h1>
          <p className="mb-6 text-sm text-nm-text-secondary">
            {domainConcepts.length} topics in this domain
          </p>

          <div className="flex flex-col gap-2">
            {domainConcepts.map((concept) => (
              <Link key={concept.id} href={`/learn/${concept.id}`}>
                <Card interactive padding="md" className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: `${selectedDomainData?.color ?? "#818cf8"}15`,
                      color: selectedDomainData?.color ?? "#818cf8",
                    }}
                  >
                    {concept.gradeLevel}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-nm-text-primary">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-nm-text-muted">
                      Grade {concept.gradeLevel} &middot; {concept.id}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-nm-text-muted">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Card>
              </Link>
            ))}
          </div>

          {domainConcepts.length === 0 && (
            <Card padding="lg" className="text-center">
              <p className="text-sm text-nm-text-muted">No topics found for this domain</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
