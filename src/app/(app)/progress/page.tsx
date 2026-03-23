"use client";

import { useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { Card } from "@/components/ui/Card";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { StreakIndicator } from "@/components/gamification/StreakIndicator";
import {
  KnowledgeNebula,
  type TopicNode,
  type PrerequisiteEdge,
} from "@/components/gamification/KnowledgeNebula";

/**
 * Progress page (T087).
 * Displays the KnowledgeNebula constellation as the hero element with
 * LevelBadge + StreakIndicator in the header and weekly stats below.
 */
export default function ProgressPage() {
  const levelQuery = trpc.gamification.getLevelInfo.useQuery();
  const streakQuery = trpc.gamification.getStreak.useQuery();
  const overviewQuery = trpc.progress.getOverview.useQuery();
  const conceptStatesQuery = trpc.progress.getConceptStates.useQuery();
  const graphQuery = trpc.curriculum.getGraph.useQuery();

  // Build topic nodes for the nebula from graph + concept states
  const { topics, edges } = useMemo(() => {
    if (!graphQuery.data) return { topics: [] as TopicNode[], edges: [] as PrerequisiteEdge[] };

    const stateMap = new Map(
      (conceptStatesQuery.data ?? []).map((s) => [s.conceptId, s]),
    );

    const statusNumToLabel = (statusNum: number): TopicNode["status"] => {
      switch (statusNum) {
        case 0:
          return "in_progress";
        case 1:
          return "in_progress";
        case 2:
          return "mastered";
        default:
          return "locked";
      }
    };

    // Arrange topics spatially: distribute per domain in clusters
    const domainOffsets: Record<string, { cx: number; cy: number }> = {};
    const domainCount = graphQuery.data.domains.length;
    graphQuery.data.domains.forEach((domain, i) => {
      const angle = (Math.PI * 2 * i) / Math.max(domainCount, 1) - Math.PI / 2;
      domainOffsets[domain.id] = {
        cx: 400 + Math.cos(angle) * 200,
        cy: 300 + Math.sin(angle) * 180,
      };
    });

    // Group nodes by domain for spread
    const domainNodes: Record<string, typeof graphQuery.data.nodes> = {};
    for (const node of graphQuery.data.nodes) {
      if (!domainNodes[node.domainId]) domainNodes[node.domainId] = [];
      domainNodes[node.domainId]!.push(node);
    }

    const topicNodes: TopicNode[] = [];
    const edgeList: PrerequisiteEdge[] = [];

    for (const [domainId, nodes] of Object.entries(domainNodes)) {
      const center = domainOffsets[domainId] ?? { cx: 400, cy: 300 };
      const count = nodes.length;

      nodes.forEach((node, idx) => {
        // Spiral placement within the domain cluster
        const angle = (Math.PI * 2 * idx) / Math.max(count, 1);
        const radius = 30 + (idx % 4) * 25;
        const x = center.cx + Math.cos(angle) * radius;
        const y = center.cy + Math.sin(angle) * radius;

        const state = stateMap.get(node.id);
        let status: TopicNode["status"] = "locked";
        if (state) {
          status = statusNumToLabel(state.status);
          if (state.nextReview && new Date(state.nextReview) <= new Date() && state.status === 2) {
            status = "review_due";
          }
        } else if (node.prerequisites.length === 0) {
          status = "available";
        }

        topicNodes.push({
          id: node.id,
          name: node.name,
          domainId: node.domainId,
          status,
          x: Math.round(x),
          y: Math.round(y),
        });

        // Build edges
        for (const prereqId of node.prerequisites) {
          edgeList.push({ from: prereqId, to: node.id });
        }
      });
    }

    return { topics: topicNodes, edges: edgeList };
  }, [graphQuery.data, conceptStatesQuery.data]);

  const isLoading =
    levelQuery.isLoading ||
    streakQuery.isLoading ||
    overviewQuery.isLoading ||
    graphQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nm-accent-indigo border-t-transparent" />
      </div>
    );
  }

  const overview = overviewQuery.data;
  const recentXp = overview?.recentXp ?? [];

  // Weekly stats derived from recent XP events
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const weeklyXpEvents = recentXp.filter(
    (e) => new Date(e.timestamp) >= weekAgo,
  );
  const weeklyXpTotal = weeklyXpEvents.reduce((sum, e) => sum + e.amount, 0);
  const weeklySessionCount = weeklyXpEvents.length;

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      {/* Header — Level + Streak */}
      <div className="flex items-start justify-between gap-3">
        {levelQuery.data && (
          <LevelBadge
            level={levelQuery.data.level}
            tierName={levelQuery.data.tierName}
            progressPercent={levelQuery.data.progressPercent}
          />
        )}
        {streakQuery.data && (
          <StreakIndicator
            currentStreak={streakQuery.data.currentStreak}
            shieldsAvailable={streakQuery.data.shieldsAvailable}
            streakMode={streakQuery.data.streakMode}
            todayCompleted={streakQuery.data.todayCompleted}
          />
        )}
      </div>

      {/* Knowledge Nebula hero */}
      <section aria-label="Knowledge Nebula">
        <h2 className="mb-2 text-lg font-semibold text-nm-text-primary">
          Knowledge Nebula
        </h2>
        <KnowledgeNebula
          topics={topics}
          edges={edges}
          domains={graphQuery.data?.domains}
        />
      </section>

      {/* Weekly stats */}
      <section aria-label="Weekly statistics">
        <h2 className="mb-2 text-lg font-semibold text-nm-text-primary">
          This Week
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <Card padding="sm">
            <p className="text-xs text-nm-text-muted">XP earned</p>
            <p className="text-xl font-bold text-nm-accent-indigo tabular-nums">
              {weeklyXpTotal}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-xs text-nm-text-muted">Sessions</p>
            <p className="text-xl font-bold text-nm-text-primary tabular-nums">
              {weeklySessionCount}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-xs text-nm-text-muted">Mastered</p>
            <p className="text-xl font-bold text-nm-accent-emerald tabular-nums">
              {overview?.curriculum.mastered ?? 0}
              <span className="text-sm text-nm-text-muted font-normal">
                /72
              </span>
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
