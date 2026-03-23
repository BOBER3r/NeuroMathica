"use client";

import { useParams, useRouter } from "next/navigation";
import { lazy, Suspense, useState, useEffect } from "react";

const Loading = () => (
  <div className="flex min-h-dvh items-center justify-center bg-nm-bg-primary">
    <div className="h-12 w-12 animate-spin rounded-full border-3 border-nm-accent-indigo border-t-transparent" />
  </div>
);

// Batch 1 — original 6 lessons
const PlaceValueLesson = lazy(() => import("@/components/lessons/PlaceValueLesson").then((m) => ({ default: m.PlaceValueLesson })));
const IntegersLesson = lazy(() => import("@/components/lessons/IntegersLesson").then((m) => ({ default: m.IntegersLesson })));
const IntegerAddSubLesson = lazy(() => import("@/components/lessons/IntegerAddSubLesson").then((m) => ({ default: m.IntegerAddSubLesson })));
const FractionsLesson = lazy(() => import("@/components/lessons/FractionsLesson").then((m) => ({ default: m.FractionsLesson })));
const FactorsLesson = lazy(() => import("@/components/lessons/FactorsLesson").then((m) => ({ default: m.FactorsLesson })));
const AnglesLesson = lazy(() => import("@/components/lessons/AnglesLesson").then((m) => ({ default: m.AnglesLesson })));

// Batch 2 — 6 new lessons
const DecimalsLesson = lazy(() => import("@/components/lessons/DecimalsLesson").then((m) => ({ default: m.DecimalsLesson })));
const FractionOpsLesson = lazy(() => import("@/components/lessons/FractionOpsLesson").then((m) => ({ default: m.FractionOpsLesson })));
const IntegerMultDivLesson = lazy(() => import("@/components/lessons/IntegerMultDivLesson").then((m) => ({ default: m.IntegerMultDivLesson })));
const PrimeNumbersLesson = lazy(() => import("@/components/lessons/PrimeNumbersLesson").then((m) => ({ default: m.PrimeNumbersLesson })));
const VariablesLesson = lazy(() => import("@/components/lessons/VariablesLesson").then((m) => ({ default: m.VariablesLesson })));
const MeanMedianModeLesson = lazy(() => import("@/components/lessons/MeanMedianModeLesson").then((m) => ({ default: m.MeanMedianModeLesson })));

// Batch 3 — wave 3 lessons
const RatiosLesson = lazy(() => import("@/components/lessons/RatiosLesson").then((m) => ({ default: m.RatiosLesson })));
const ProportionsLesson = lazy(() => import("@/components/lessons/ProportionsLesson").then((m) => ({ default: m.ProportionsLesson })));
const PercentsLesson = lazy(() => import("@/components/lessons/PercentsLesson").then((m) => ({ default: m.PercentsLesson })));
const GcfLcmLesson = lazy(() => import("@/components/lessons/GcfLcmLesson").then((m) => ({ default: m.GcfLcmLesson })));
const ExponentsLesson = lazy(() => import("@/components/lessons/ExponentsLesson").then((m) => ({ default: m.ExponentsLesson })));
const OneStepEquationsLesson = lazy(() => import("@/components/lessons/OneStepEquationsLesson").then((m) => ({ default: m.OneStepEquationsLesson })));

// Batch 4 — wave 4 lessons
const PercentAppsLesson = lazy(() => import("@/components/lessons/PercentAppsLesson").then((m) => ({ default: m.PercentAppsLesson })));
const RationalNumbersLesson = lazy(() => import("@/components/lessons/RationalNumbersLesson").then((m) => ({ default: m.RationalNumbersLesson })));
const OrderOfOpsLesson = lazy(() => import("@/components/lessons/OrderOfOpsLesson").then((m) => ({ default: m.OrderOfOpsLesson })));
const TwoStepEquationsLesson = lazy(() => import("@/components/lessons/TwoStepEquationsLesson").then((m) => ({ default: m.TwoStepEquationsLesson })));
const CoordinatePlaneLesson = lazy(() => import("@/components/lessons/CoordinatePlaneLesson").then((m) => ({ default: m.CoordinatePlaneLesson })));
const AngleRelationshipsLesson = lazy(() => import("@/components/lessons/AngleRelationshipsLesson").then((m) => ({ default: m.AngleRelationshipsLesson })));

// Batch 5 — wave 5 lessons
const RationalOpsLesson = lazy(() => import("@/components/lessons/RationalOpsLesson").then((m) => ({ default: m.RationalOpsLesson })));
const MultiStepEquationsLesson = lazy(() => import("@/components/lessons/MultiStepEquationsLesson").then((m) => ({ default: m.MultiStepEquationsLesson })));
const InequalitiesLesson = lazy(() => import("@/components/lessons/InequalitiesLesson").then((m) => ({ default: m.InequalitiesLesson })));
const TrianglesLesson = lazy(() => import("@/components/lessons/TrianglesLesson").then((m) => ({ default: m.TrianglesLesson })));
const QuadrilateralsLesson = lazy(() => import("@/components/lessons/QuadrilateralsLesson").then((m) => ({ default: m.QuadrilateralsLesson })));
const DataDisplaysLesson = lazy(() => import("@/components/lessons/DataDisplaysLesson").then((m) => ({ default: m.DataDisplaysLesson })));

// Batch 6
const TrianglePropsLesson = lazy(() => import("@/components/lessons/TrianglePropsLesson").then((m) => ({ default: m.TrianglePropsLesson })));
const CirclesLesson = lazy(() => import("@/components/lessons/CirclesLesson").then((m) => ({ default: m.CirclesLesson })));
const AreaPerimeterLesson = lazy(() => import("@/components/lessons/AreaPerimeterLesson").then((m) => ({ default: m.AreaPerimeterLesson })));
const NumberPatternsLesson = lazy(() => import("@/components/lessons/NumberPatternsLesson").then((m) => ({ default: m.NumberPatternsLesson })));
const BoxPlotsLesson = lazy(() => import("@/components/lessons/BoxPlotsLesson").then((m) => ({ default: m.BoxPlotsLesson })));
const ProbabilityLesson = lazy(() => import("@/components/lessons/ProbabilityLesson").then((m) => ({ default: m.ProbabilityLesson })));

// Batch 7
const PythagoreanLesson = lazy(() => import("@/components/lessons/PythagoreanLesson").then((m) => ({ default: m.PythagoreanLesson })));
const CircleMeasurementsLesson = lazy(() => import("@/components/lessons/CircleMeasurementsLesson").then((m) => ({ default: m.CircleMeasurementsLesson })));
const CompositeFiguresLesson = lazy(() => import("@/components/lessons/CompositeFiguresLesson").then((m) => ({ default: m.CompositeFiguresLesson })));
const FunctionsLesson = lazy(() => import("@/components/lessons/FunctionsLesson").then((m) => ({ default: m.FunctionsLesson })));
const LinearEquationsLesson = lazy(() => import("@/components/lessons/LinearEquationsLesson").then((m) => ({ default: m.LinearEquationsLesson })));
const CompoundProbabilityLesson = lazy(() => import("@/components/lessons/CompoundProbabilityLesson").then((m) => ({ default: m.CompoundProbabilityLesson })));

// Batch 8
const PythagoreanAppsLesson = lazy(() => import("@/components/lessons/PythagoreanAppsLesson").then((m) => ({ default: m.PythagoreanAppsLesson })));
const FunctionNotationLesson = lazy(() => import("@/components/lessons/FunctionNotationLesson").then((m) => ({ default: m.FunctionNotationLesson })));
const SlopeLesson = lazy(() => import("@/components/lessons/SlopeLesson").then((m) => ({ default: m.SlopeLesson })));
const SlopeInterceptLesson = lazy(() => import("@/components/lessons/SlopeInterceptLesson").then((m) => ({ default: m.SlopeInterceptLesson })));
const SamplingLesson = lazy(() => import("@/components/lessons/SamplingLesson").then((m) => ({ default: m.SamplingLesson })));
const ScatterPlotsLesson = lazy(() => import("@/components/lessons/ScatterPlotsLesson").then((m) => ({ default: m.ScatterPlotsLesson })));

// Batch 9 — final 24
const IrrationalNumbersLesson = lazy(() => import("@/components/lessons/IrrationalNumbersLesson").then((m) => ({ default: m.IrrationalNumbersLesson })));
const SquareRootsLesson = lazy(() => import("@/components/lessons/SquareRootsLesson").then((m) => ({ default: m.SquareRootsLesson })));
const ScientificNotationLesson = lazy(() => import("@/components/lessons/ScientificNotationLesson").then((m) => ({ default: m.ScientificNotationLesson })));
const SciNotationOpsLesson = lazy(() => import("@/components/lessons/SciNotationOpsLesson").then((m) => ({ default: m.SciNotationOpsLesson })));
const RealNumberSystemLesson = lazy(() => import("@/components/lessons/RealNumberSystemLesson").then((m) => ({ default: m.RealNumberSystemLesson })));
const ExponentRulesLesson = lazy(() => import("@/components/lessons/ExponentRulesLesson").then((m) => ({ default: m.ExponentRulesLesson })));
const SystemsOfEquationsLesson = lazy(() => import("@/components/lessons/SystemsOfEquationsLesson").then((m) => ({ default: m.SystemsOfEquationsLesson })));
const PolynomialsLesson = lazy(() => import("@/components/lessons/PolynomialsLesson").then((m) => ({ default: m.PolynomialsLesson })));
const PolynomialOpsLesson = lazy(() => import("@/components/lessons/PolynomialOpsLesson").then((m) => ({ default: m.PolynomialOpsLesson })));
const FactoringLesson = lazy(() => import("@/components/lessons/FactoringLesson").then((m) => ({ default: m.FactoringLesson })));
const QuadraticEquationsLesson = lazy(() => import("@/components/lessons/QuadraticEquationsLesson").then((m) => ({ default: m.QuadraticEquationsLesson })));
const SequencesLesson = lazy(() => import("@/components/lessons/SequencesLesson").then((m) => ({ default: m.SequencesLesson })));
const VariationLesson = lazy(() => import("@/components/lessons/VariationLesson").then((m) => ({ default: m.VariationLesson })));
const VolumeLesson = lazy(() => import("@/components/lessons/VolumeLesson").then((m) => ({ default: m.VolumeLesson })));
const SurfaceAreaLesson = lazy(() => import("@/components/lessons/SurfaceAreaLesson").then((m) => ({ default: m.SurfaceAreaLesson })));
const CrossSectionsLesson = lazy(() => import("@/components/lessons/CrossSectionsLesson").then((m) => ({ default: m.CrossSectionsLesson })));
const TransformationsLesson = lazy(() => import("@/components/lessons/TransformationsLesson").then((m) => ({ default: m.TransformationsLesson })));
const CongruenceLesson = lazy(() => import("@/components/lessons/CongruenceLesson").then((m) => ({ default: m.CongruenceLesson })));
const SimilarityLesson = lazy(() => import("@/components/lessons/SimilarityLesson").then((m) => ({ default: m.SimilarityLesson })));
const CoordinateGeometryLesson = lazy(() => import("@/components/lessons/CoordinateGeometryLesson").then((m) => ({ default: m.CoordinateGeometryLesson })));
const ConstructionsLesson = lazy(() => import("@/components/lessons/ConstructionsLesson").then((m) => ({ default: m.ConstructionsLesson })));
const LineOfBestFitLesson = lazy(() => import("@/components/lessons/LineOfBestFitLesson").then((m) => ({ default: m.LineOfBestFitLesson })));
const TwoWayTablesLesson = lazy(() => import("@/components/lessons/TwoWayTablesLesson").then((m) => ({ default: m.TwoWayTablesLesson })));
const StatisticalReasoningLesson = lazy(() => import("@/components/lessons/StatisticalReasoningLesson").then((m) => ({ default: m.StatisticalReasoningLesson })));

export default function LessonPage() {
  const params = useParams<{ topicId: string; lessonId: string }>();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleComplete = () => {
    router.push(`/learn/${params.topicId}`);
  };

  if (!mounted) return <Loading />;

  const renderLesson = () => {
    switch (params.topicId) {
      // Batch 1
      case "NO-1.1": return <PlaceValueLesson onComplete={handleComplete} />;
      case "NO-1.2": return <IntegersLesson onComplete={handleComplete} />;
      case "NO-1.2a": return <IntegerAddSubLesson onComplete={handleComplete} />;
      case "NO-1.4": return <FractionsLesson onComplete={handleComplete} />;
      case "NT-2.1": return <FactorsLesson onComplete={handleComplete} />;
      case "GE-4.1": return <AnglesLesson onComplete={handleComplete} />;
      // Batch 2
      case "NO-1.3": return <DecimalsLesson onComplete={handleComplete} />;
      case "NO-1.4a": return <FractionOpsLesson onComplete={handleComplete} />;
      case "NO-1.2b": return <IntegerMultDivLesson onComplete={handleComplete} />;
      case "NT-2.2": return <PrimeNumbersLesson onComplete={handleComplete} />;
      case "AL-3.1": return <VariablesLesson onComplete={handleComplete} />;
      case "SP-5.1": return <MeanMedianModeLesson onComplete={handleComplete} />;
      // Batch 3
      case "NO-1.5": return <RatiosLesson onComplete={handleComplete} />;
      case "NO-1.5a": return <ProportionsLesson onComplete={handleComplete} />;
      case "NO-1.6": return <PercentsLesson onComplete={handleComplete} />;
      case "NT-2.3": return <GcfLcmLesson onComplete={handleComplete} />;
      case "NT-2.4": return <ExponentsLesson onComplete={handleComplete} />;
      case "AL-3.2": return <OneStepEquationsLesson onComplete={handleComplete} />;
      // Batch 4
      case "NO-1.6a": return <PercentAppsLesson onComplete={handleComplete} />;
      case "NO-1.7": return <RationalNumbersLesson onComplete={handleComplete} />;
      case "NT-2.5": return <OrderOfOpsLesson onComplete={handleComplete} />;
      case "AL-3.3": return <TwoStepEquationsLesson onComplete={handleComplete} />;
      case "AL-3.6": return <CoordinatePlaneLesson onComplete={handleComplete} />;
      case "GE-4.1a": return <AngleRelationshipsLesson onComplete={handleComplete} />;
      // Batch 5
      case "NO-1.7a": return <RationalOpsLesson onComplete={handleComplete} />;
      case "AL-3.4": return <MultiStepEquationsLesson onComplete={handleComplete} />;
      case "AL-3.5": return <InequalitiesLesson onComplete={handleComplete} />;
      case "GE-4.2": return <TrianglesLesson onComplete={handleComplete} />;
      case "GE-4.4": return <QuadrilateralsLesson onComplete={handleComplete} />;
      case "SP-5.2": return <DataDisplaysLesson onComplete={handleComplete} />;
      // Batch 6
      case "GE-4.2a": return <TrianglePropsLesson onComplete={handleComplete} />;
      case "GE-4.5": return <CirclesLesson onComplete={handleComplete} />;
      case "GE-4.6": return <AreaPerimeterLesson onComplete={handleComplete} />;
      case "NT-2.6": return <NumberPatternsLesson onComplete={handleComplete} />;
      case "SP-5.3": return <BoxPlotsLesson onComplete={handleComplete} />;
      case "SP-5.4": return <ProbabilityLesson onComplete={handleComplete} />;
      // Batch 7
      case "GE-4.3": return <PythagoreanLesson onComplete={handleComplete} />;
      case "GE-4.5a": return <CircleMeasurementsLesson onComplete={handleComplete} />;
      case "GE-4.6a": return <CompositeFiguresLesson onComplete={handleComplete} />;
      case "AL-3.7": return <FunctionsLesson onComplete={handleComplete} />;
      case "AL-3.8": return <LinearEquationsLesson onComplete={handleComplete} />;
      case "SP-5.4a": return <CompoundProbabilityLesson onComplete={handleComplete} />;
      // Batch 8
      case "GE-4.3a": return <PythagoreanAppsLesson onComplete={handleComplete} />;
      case "AL-3.7a": return <FunctionNotationLesson onComplete={handleComplete} />;
      case "AL-3.8a": return <SlopeLesson onComplete={handleComplete} />;
      case "AL-3.8b": return <SlopeInterceptLesson onComplete={handleComplete} />;
      case "SP-5.5": return <SamplingLesson onComplete={handleComplete} />;
      case "SP-5.6": return <ScatterPlotsLesson onComplete={handleComplete} />;
      // Batch 9 — final 24 lessons
      case "NO-1.8": return <IrrationalNumbersLesson onComplete={handleComplete} />;
      case "NO-1.8a": return <SquareRootsLesson onComplete={handleComplete} />;
      case "NO-1.9": return <ScientificNotationLesson onComplete={handleComplete} />;
      case "NO-1.9a": return <SciNotationOpsLesson onComplete={handleComplete} />;
      case "NO-1.10": return <RealNumberSystemLesson onComplete={handleComplete} />;
      case "NT-2.4a": return <ExponentRulesLesson onComplete={handleComplete} />;
      case "AL-3.9": return <SystemsOfEquationsLesson onComplete={handleComplete} />;
      case "AL-3.10": return <PolynomialsLesson onComplete={handleComplete} />;
      case "AL-3.10a": return <PolynomialOpsLesson onComplete={handleComplete} />;
      case "AL-3.11": return <FactoringLesson onComplete={handleComplete} />;
      case "AL-3.12": return <QuadraticEquationsLesson onComplete={handleComplete} />;
      case "AL-3.13": return <SequencesLesson onComplete={handleComplete} />;
      case "AL-3.14": return <VariationLesson onComplete={handleComplete} />;
      case "GE-4.7": return <VolumeLesson onComplete={handleComplete} />;
      case "GE-4.7a": return <SurfaceAreaLesson onComplete={handleComplete} />;
      case "GE-4.8": return <CrossSectionsLesson onComplete={handleComplete} />;
      case "GE-4.9": return <TransformationsLesson onComplete={handleComplete} />;
      case "GE-4.9a": return <CongruenceLesson onComplete={handleComplete} />;
      case "GE-4.9b": return <SimilarityLesson onComplete={handleComplete} />;
      case "GE-4.10": return <CoordinateGeometryLesson onComplete={handleComplete} />;
      case "GE-4.11": return <ConstructionsLesson onComplete={handleComplete} />;
      case "SP-5.6a": return <LineOfBestFitLesson onComplete={handleComplete} />;
      case "SP-5.7": return <TwoWayTablesLesson onComplete={handleComplete} />;
      case "SP-5.8": return <StatisticalReasoningLesson onComplete={handleComplete} />;
      default:
        return (
          <div className="flex min-h-dvh flex-col items-center justify-center bg-nm-bg-primary p-6">
            <p className="mb-4 text-nm-text-secondary">
              Lesson content for {params.topicId} is coming soon.
            </p>
            <button
              onClick={() => router.back()}
              className="rounded-xl bg-nm-accent-indigo px-6 py-3 text-white"
            >
              Go Back
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-dvh bg-nm-bg-primary">
      <Suspense fallback={<Loading />}>
        {renderLesson()}
      </Suspense>
    </div>
  );
}
