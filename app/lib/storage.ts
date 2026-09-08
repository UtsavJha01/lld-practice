export interface Attempt {
  id: string;
  problemId: string;
  submittedAt: string;
  score: number;
}

const STORAGE_KEY = "lld-attempts";

export function getAttempts(): Attempt[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load attempts:", error);
    return [];
  }
}

export function saveAttempt(attempt: Attempt): void {
  if (typeof window === "undefined") {
    return;
  }

  const attempts = getAttempts();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([attempt, ...attempts])
  );
}