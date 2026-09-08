"use client";

import { useParams, useRouter } from "next/navigation";

const problems = {
  "parking-lot": {
    title: "Parking Lot",
    icon: "🚗",
    difficulty: "Easy",
    time: "30–45 min",
    description:
      "Design a parking lot system that can manage multiple floors, different vehicle types, parking spots and payments.",
    requirements: [
      "The parking lot can have multiple floors.",
      "Each floor can contain different types of parking spots.",
      "The system should support different vehicle types.",
      "A suitable parking spot should be assigned when a vehicle enters.",
      "The parking spot should be released when the vehicle exits.",
      "The system should calculate parking fees.",
      "The system should provide information about available spots.",
    ],
    designGoals: [
      "Identify the core classes and their responsibilities.",
      "Define relationships between classes.",
      "Use interfaces where they provide meaningful abstraction.",
      "Consider how the system could support new vehicle or pricing types.",
      "Explain important design decisions and trade-offs.",
    ],
  },

  "vending-machine": {
    title: "Vending Machine",
    icon: "🥤",
    difficulty: "Medium",
    time: "30–45 min",
    description:
      "Design a vending machine that manages products, inventory, payments and change.",
    requirements: [
      "The machine should contain multiple products.",
      "Each product has a price and available quantity.",
      "A user should be able to select a product.",
      "The machine should accept payment.",
      "The machine should return change when necessary.",
      "The machine should handle insufficient payment.",
      "The machine should handle products that are out of stock.",
    ],
    designGoals: [
      "Model the vending machine states.",
      "Separate inventory and payment responsibilities.",
      "Consider how different payment methods could be supported.",
      "Identify suitable interfaces and abstractions.",
      "Explain important design decisions.",
    ],
  },

  elevator: {
    title: "Elevator System",
    icon: "🛗",
    difficulty: "Medium",
    time: "45–60 min",
    description:
      "Design an elevator system that handles floor requests and efficiently manages multiple elevators.",
    requirements: [
      "The building can have multiple floors.",
      "The system can contain multiple elevators.",
      "Users can request an elevator from a floor.",
      "Users can select a destination floor.",
      "The system should decide which elevator handles a request.",
      "The elevator should move between floors.",
      "The system should track elevator state.",
    ],
    designGoals: [
      "Model elevator states and behaviour.",
      "Separate request handling from elevator movement.",
      "Design an extensible elevator selection strategy.",
      "Consider multiple elevators.",
      "Explain important trade-offs.",
    ],
  },

  library: {
    title: "Library Management",
    icon: "📚",
    difficulty: "Easy",
    time: "30–45 min",
    description:
      "Design a library system for managing books, members, borrowing, returning and reservations.",
    requirements: [
      "The library contains multiple books.",
      "Books can have multiple copies.",
      "Members can borrow available books.",
      "Members should be able to return books.",
      "The system should track borrowed books.",
      "Members should be able to reserve unavailable books.",
      "The system should maintain book availability.",
    ],
    designGoals: [
      "Identify core entities and their responsibilities.",
      "Model relationships between books, copies and members.",
      "Consider borrowing and reservation behaviour.",
      "Design for future extensions.",
      "Explain important design decisions.",
    ],
  },
};

export default function ProblemPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as keyof typeof problems;
  const problem = problems[id];

  if (!problem) {
    return (
      <main className="min-h-screen bg-[#09090b] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Problem not found</h1>

          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black"
          >
            ← Back to Problems
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            ← Back to Problems
          </button>

          <div className="text-sm font-medium">LLD Coach</div>
        </div>
      </nav>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-3xl">
              {problem.icon}
            </div>

            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold">{problem.title}</h1>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400">
                  {problem.difficulty}
                </span>
              </div>

              <p className="text-sm text-zinc-500">
                Recommended time: {problem.time}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-7">
          <h2 className="text-lg font-semibold">Problem</h2>

          <p className="mt-4 leading-7 text-zinc-400">
            {problem.description}
          </p>
        </section>

        {/* Requirements */}
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-7">
          <h2 className="text-lg font-semibold">Requirements</h2>

          <ul className="mt-5 space-y-3">
            {problem.requirements.map((requirement, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-zinc-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                {requirement}
              </li>
            ))}
          </ul>
        </section>

        {/* Design goals */}
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-7">
          <h2 className="text-lg font-semibold">What you should design</h2>

          <ul className="mt-5 space-y-3">
            {problem.designGoals.map((goal, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-zinc-400"
              >
                <span className="text-zinc-600">{index + 1}.</span>
                {goal}
              </li>
            ))}
          </ul>
        </section>

        {/* Start */}
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div>
            <h3 className="font-semibold">Ready to design?</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Your attempt will be saved so you can review it later.
            </p>
          </div>

          <button
            onClick={() => router.push(`/practice/${problem.title.toLowerCase().replaceAll(" ", "-")}`)}
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Start Attempt →
          </button>
        </div>
      </div>
    </main>
  );
}