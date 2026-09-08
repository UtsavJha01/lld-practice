import type { EvaluationResult } from "./evaluation";

export type Attempt = {
  id: string;
  problemId: string;
  score: number;
  submittedAt: string;
  evaluation: EvaluationResult;
};

const STORAGE_KEY = "lld-practice-attempts";

export function getAttempts(): Attempt[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as Attempt[];
  } catch {
    return [];
  }
}

export function saveAttempt(
  problemId: string,
  evaluation: EvaluationResult
): Attempt {
  const attempts = getAttempts();

  const attempt: Attempt = {
    id: `${problemId}-${Date.now()}`,
    problemId,
    score: evaluation.score,
    submittedAt: new Date().toISOString(),
    evaluation,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([attempt, ...attempts])
  );

  return attempt;
}