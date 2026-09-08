"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAttempts, type Attempt } from "@/app/lib/history";

const problemNames: Record<string, string> = {
  "parking-lot": "Parking Lot",
  "vending-machine": "Vending Machine",
  elevator: "Elevator System",
  library: "Library Management",
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    setAttempts(getAttempts());
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-white"
            >
              ← Back to Problems
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
              Attempt History
            </h1>

            <p className="mt-2 text-zinc-500">
              Review your previous LLD practice attempts.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
          >
            Practice Again
          </Link>
        </div>

        {attempts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-800 p-8 text-center">
            <h2 className="font-semibold">
              No attempts yet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Complete a practice problem and submit your solution
              to see it here.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {problemNames[attempt.problemId] ??
                        attempt.problemId}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Submitted{" "}
                      {new Date(
                        attempt.submittedAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-3xl font-bold">
                        {attempt.score}
                      </span>

                      <span className="text-sm text-zinc-600">
                        {" "}
                        / 100
                      </span>
                    </div>

                    <Link
                      href={`/practice/${attempt.problemId}`}
                      className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
                    >
                      Try Again
                    </Link>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  <MiniScore
                    label="Classes"
                    score={attempt.evaluation.breakdown.classes}
                  />

                  <MiniScore
                    label="Responsibilities"
                    score={
                      attempt.evaluation.breakdown
                        .responsibilities
                    }
                  />

                  <MiniScore
                    label="Relationships"
                    score={
                      attempt.evaluation.breakdown
                        .relationships
                    }
                  />

                  <MiniScore
                    label="Requirements"
                    score={
                      attempt.evaluation.breakdown
                        .requirements
                    }
                  />

                  <MiniScore
                    label="Extensibility"
                    score={
                      attempt.evaluation.breakdown
                        .extensibility
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function MiniScore({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="rounded-lg bg-zinc-900 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold">{score}</p>
    </div>
  );
}