"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

// Static curriculum data — no database needed
const DOMAINS = [
  { id: "numbers-operations", name: "Numbers & Operations", color: "#60a5fa", icon: "123", concepts: [
    { id: "NO-1.1", name: "Place Value", grade: 6 },
    { id: "NO-1.2", name: "Integers", grade: 6 },
    { id: "NO-1.2a", name: "Integer Addition & Subtraction", grade: 6 },
    { id: "NO-1.2b", name: "Integer Multiplication & Division", grade: 6 },
    { id: "NO-1.3", name: "Decimals", grade: 6 },
    { id: "NO-1.4", name: "Fractions", grade: 6 },
    { id: "NO-1.4a", name: "Fraction Operations", grade: 6 },
    { id: "NO-1.5", name: "Ratios", grade: 6 },
    { id: "NO-1.5a", name: "Proportions", grade: 7 },
    { id: "NO-1.6", name: "Percents", grade: 7 },
    { id: "NO-1.6a", name: "Percent Applications", grade: 7 },
    { id: "NO-1.7", name: "Rational Numbers", grade: 7 },
    { id: "NO-1.7a", name: "Rational Number Operations", grade: 7 },
    { id: "NO-1.8", name: "Irrational Numbers", grade: 8 },
    { id: "NO-1.8a", name: "Square Roots", grade: 8 },
    { id: "NO-1.9", name: "Scientific Notation", grade: 8 },
    { id: "NO-1.9a", name: "Scientific Notation Operations", grade: 8 },
    { id: "NO-1.10", name: "Real Number System", grade: 8 },
  ]},
  { id: "number-theory", name: "Number Theory", color: "#a78bfa", icon: "#", concepts: [
    { id: "NT-2.1", name: "Factors & Multiples", grade: 6 },
    { id: "NT-2.2", name: "Prime Numbers", grade: 6 },
    { id: "NT-2.3", name: "GCF & LCM", grade: 6 },
    { id: "NT-2.4", name: "Exponents", grade: 6 },
    { id: "NT-2.4a", name: "Exponent Rules", grade: 8 },
    { id: "NT-2.5", name: "Order of Operations", grade: 6 },
    { id: "NT-2.6", name: "Number Patterns", grade: 6 },
  ]},
  { id: "algebra", name: "Algebra", color: "#34d399", icon: "x", concepts: [
    { id: "AL-3.1", name: "Variables & Expressions", grade: 6 },
    { id: "AL-3.2", name: "One-Step Equations", grade: 6 },
    { id: "AL-3.3", name: "Two-Step Equations", grade: 7 },
    { id: "AL-3.4", name: "Multi-Step Equations", grade: 7 },
    { id: "AL-3.5", name: "Inequalities", grade: 7 },
    { id: "AL-3.6", name: "Coordinate Plane", grade: 6 },
    { id: "AL-3.7", name: "Functions", grade: 8 },
    { id: "AL-3.7a", name: "Function Notation", grade: 8 },
    { id: "AL-3.8", name: "Linear Equations", grade: 8 },
    { id: "AL-3.8a", name: "Slope", grade: 8 },
    { id: "AL-3.8b", name: "Slope-Intercept Form", grade: 8 },
    { id: "AL-3.9", name: "Systems of Equations", grade: 8 },
    { id: "AL-3.10", name: "Polynomials", grade: 8 },
    { id: "AL-3.10a", name: "Polynomial Operations", grade: 8 },
    { id: "AL-3.11", name: "Factoring", grade: 8 },
    { id: "AL-3.12", name: "Quadratic Equations", grade: 8 },
    { id: "AL-3.13", name: "Sequences", grade: 7 },
    { id: "AL-3.14", name: "Direct & Inverse Variation", grade: 7 },
  ]},
  { id: "geometry", name: "Geometry", color: "#fbbf24", icon: "\u25B3", concepts: [
    { id: "GE-4.1", name: "Angles", grade: 6 },
    { id: "GE-4.1a", name: "Angle Relationships", grade: 7 },
    { id: "GE-4.2", name: "Triangles", grade: 7 },
    { id: "GE-4.2a", name: "Triangle Properties", grade: 7 },
    { id: "GE-4.3", name: "Pythagorean Theorem", grade: 8 },
    { id: "GE-4.3a", name: "Pythagorean Applications", grade: 8 },
    { id: "GE-4.4", name: "Quadrilaterals", grade: 6 },
    { id: "GE-4.5", name: "Circles", grade: 7 },
    { id: "GE-4.5a", name: "Circle Measurements", grade: 7 },
    { id: "GE-4.6", name: "Area & Perimeter", grade: 6 },
    { id: "GE-4.6a", name: "Composite Figures", grade: 7 },
    { id: "GE-4.7", name: "Volume", grade: 8 },
    { id: "GE-4.7a", name: "Surface Area", grade: 8 },
    { id: "GE-4.8", name: "Cross-Sections", grade: 8 },
    { id: "GE-4.9", name: "Transformations", grade: 8 },
    { id: "GE-4.9a", name: "Congruence", grade: 8 },
    { id: "GE-4.9b", name: "Similarity", grade: 8 },
    { id: "GE-4.10", name: "Coordinate Geometry", grade: 8 },
    { id: "GE-4.11", name: "Constructions", grade: 7 },
  ]},
  { id: "statistics-probability", name: "Statistics & Probability", color: "#fb7185", icon: "\u03C3", concepts: [
    { id: "SP-5.1", name: "Mean, Median, Mode", grade: 6 },
    { id: "SP-5.2", name: "Data Displays", grade: 6 },
    { id: "SP-5.3", name: "Box Plots", grade: 6 },
    { id: "SP-5.4", name: "Probability Basics", grade: 7 },
    { id: "SP-5.4a", name: "Compound Probability", grade: 7 },
    { id: "SP-5.5", name: "Sampling", grade: 7 },
    { id: "SP-5.6", name: "Scatter Plots", grade: 8 },
    { id: "SP-5.6a", name: "Line of Best Fit", grade: 8 },
    { id: "SP-5.7", name: "Two-Way Tables", grade: 8 },
    { id: "SP-5.8", name: "Statistical Reasoning", grade: 8 },
  ]},
];

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const selectedDomainData = DOMAINS.find((d) => d.id === selectedDomain);

  return (
    <div className="p-4 pb-20">
      {!selectedDomain ? (
        <>
          <h1 className="mb-1 text-2xl font-bold text-nm-text-primary">Learn</h1>
          <p className="mb-6 text-sm text-nm-text-secondary">72 interactive lessons across 5 domains</p>

          <div className="flex flex-col gap-3">
            {DOMAINS.map((domain) => (
              <button key={domain.id} onClick={() => setSelectedDomain(domain.id)} className="w-full text-left">
                <Card interactive padding="md" className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold"
                    style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                  >
                    {domain.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-nm-text-primary">{domain.name}</h2>
                    <p className="text-sm text-nm-text-muted">{domain.concepts.length} topics</p>
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
          <button onClick={() => setSelectedDomain(null)} className="mb-4 inline-flex items-center gap-1 text-sm text-nm-text-muted hover:text-nm-text-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            All Domains
          </button>

          <div className="mb-1 inline-block rounded-lg px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${selectedDomainData?.color ?? "#818cf8"}20`, color: selectedDomainData?.color ?? "#818cf8" }}>
            {selectedDomainData?.name}
          </div>

          <h1 className="mb-1 mt-2 text-2xl font-bold text-nm-text-primary">Topics</h1>
          <p className="mb-6 text-sm text-nm-text-secondary">{selectedDomainData?.concepts.length} topics</p>

          <div className="flex flex-col gap-2">
            {selectedDomainData?.concepts.map((concept) => (
              <Link key={concept.id} href={`/learn/${concept.id}/lesson`}>
                <Card interactive padding="md" className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: `${selectedDomainData.color}15`, color: selectedDomainData.color }}>
                    {concept.grade}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-nm-text-primary">{concept.name}</h3>
                    <p className="text-xs text-nm-text-muted">Grade {concept.grade} {"\u00B7"} {concept.id}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-nm-text-muted"><path d="m9 18 6-6-6-6" /></svg>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
