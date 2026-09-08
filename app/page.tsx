"use client";


import { useEffect, useState } from "react";
import { getAttempts, type Attempt }  from "./lib/storage";


const problems = [
  {
    id: "parking-lot",
    title: "Parking Lot",
    description:
      "Design a parking lot system that can manage multiple floors, vehicle types, parking spots and payments.",
    difficulty: "Easy",
    time: "30–45 min",
    icon: "🚗",
    tags: ["OOP", "Strategy", "SOLID"],
  },
  {
    id: "vending-machine",
    title: "Vending Machine",
    description:
      "Design a vending machine that manages products, inventory, payments and change.",
    difficulty: "Medium",
    time: "30–45 min",
    icon: "🥤",
    tags: ["State", "OOP", "Interfaces"],
  },
  {
    id: "elevator",
    title: "Elevator System",
    description:
      "Design an elevator system that handles floor requests and efficiently manages multiple elevators.",
    difficulty: "Medium",
    time: "45–60 min",
    icon: "🛗",
    tags: ["State", "Strategy", "Concurrency"],
  },
  {
    id: "library",
    title: "Library Management",
    description:
      "Design a library system for managing books, members, borrowing, returning and reservations.",
    difficulty: "Easy",
    time: "30–45 min",
    icon: "📚",
    tags: ["OOP", "SOLID", "Relationships"],
  },
];

const difficultyStyle: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("problems");

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <nav className="border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-black">
              L
            </div>

            <div>
              <h1 className="font-semibold tracking-tight">LLD Coach</h1>
              <p className="text-xs text-zinc-500">Practice. Design. Improve.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("problems")}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                activeTab === "problems"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Problems
            </button>

            <button
              onClick={() => setActiveTab("attempts")}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                activeTab === "attempts"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Attempts
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            LLD Practice Environment
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Master Low-Level Design
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Practice real-world design problems, submit your solution and get
            explainable feedback on your classes, responsibilities,
            abstractions and design decisions.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {activeTab === "problems" ? (
          <>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-semibold">Choose a problem</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Pick a problem and start designing.
                </p>
              </div>

              <span className="text-sm text-zinc-500">
                {problems.length} problems
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </>
        ) : (
          <Attempts />
        )}
      </section>
    </main>
  );
}

function ProblemCard({
  problem,
}: {
  problem: (typeof problems)[number];
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/60">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-2xl">
          {problem.icon}
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
            difficultyStyle[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      <h4 className="mt-6 text-xl font-semibold">{problem.title}</h4>

      <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-400">
        {problem.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">
        <span className="text-xs text-zinc-500">⏱ {problem.time}</span>

        <button
          onClick={() => {
            window.location.href = `/problems/${problem.id}`;
          }}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Start Practice →
        </button>
      </div>
    </div>
  );
}

function Attempts() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    setAttempts(getAttempts());
  }, []);

  const problemNames: Record<string, string> = {
    "parking-lot": "Parking Lot",
    "vending-machine": "Vending Machine",
    "elevator-system": "Elevator System",
    "library-management": "Library Management",
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">My Attempts</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Track your progress and improve your designs.
        </p>
      </div>

      {attempts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-2xl">
            🎯
          </div>

          <h4 className="mt-5 font-semibold">No attempts yet</h4>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Start your first LLD problem. Your submissions, scores and feedback
            will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-lg font-semibold">
                    {problemNames[attempt.problemId] ?? attempt.problemId}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    Submitted{" "}
                    {new Date(attempt.submittedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    {attempt.score}
                  </span>

                  <span className="text-sm text-zinc-600">/ 100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}