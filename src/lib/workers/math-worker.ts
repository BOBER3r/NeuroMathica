// Web Worker for heavy math computations (CP-V)
// Offloads expression evaluation, curve sampling, and animation precomputation from main thread

import { evaluateExpression } from "@/lib/math/algebra";

interface WorkerMessage {
  id: string;
  type: "sampleFunction" | "evaluateExpression" | "computeCurve";
  payload: Record<string, unknown>;
}

interface SampleFunctionPayload {
  fn: string;
  domain: [number, number];
  samples: number;
}

interface EvaluatePayload {
  expression: string;
  variables: Record<string, number>;
}

function sampleFunction(payload: SampleFunctionPayload): [number, number][] {
  const { fn, domain, samples } = payload;
  const [xMin, xMax] = domain;
  const step = (xMax - xMin) / (samples - 1);
  const points: [number, number][] = [];

  for (let i = 0; i < samples; i++) {
    const x = xMin + i * step;
    try {
      const y = evaluateExpression(fn, { x });
      if (Number.isFinite(y)) {
        points.push([x, y]);
      }
    } catch {
      // Skip points where evaluation fails
    }
  }

  return points;
}

self.addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;

  try {
    let result: unknown;

    switch (type) {
      case "sampleFunction":
        result = sampleFunction(payload as unknown as SampleFunctionPayload);
        break;
      case "evaluateExpression": {
        const evalPayload = payload as unknown as EvaluatePayload;
        result = evaluateExpression(evalPayload.expression, evalPayload.variables);
        break;
      }
      default:
        throw new Error(`Unknown worker message type: ${type}`);
    }

    self.postMessage({ id, result, error: null });
  } catch (err) {
    self.postMessage({
      id,
      result: null,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});
