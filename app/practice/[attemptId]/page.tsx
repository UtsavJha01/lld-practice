"use client";

import { useState } from "react";
import {
  evaluateSubmission,
  type EvaluationResult,
} from "@/app/lib/evaluation";
import { saveAttempt } from "@/app/lib/history";
import { useParams, useRouter } from "next/navigation";

type ClassItem = {
  name: string;
  responsibility: string;
};

type Relationship = {
  from: string;
  type: string;
  to: string;
};
function ScoreItem({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <p className="text-xs text-zinc-500">{label}</p>

      <p className="mt-2 text-lg font-semibold">
        {score}
        <span className="text-xs text-zinc-600"> / {max}</span>
      </p>
    </div>
  );
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = String(params.attemptId);

const problemData = {
  "parking-lot": {
  title: "Parking Lot",
  emoji: "🚗",
  description:
    "Design a parking lot system that can manage multiple floors, vehicle types, parking spots and payments.",
    requirements: [
      "Multiple parking floors",
      "Different vehicle types",
      "Different parking spot types",
      "Assign suitable parking spots",
      "Release spots when vehicles exit",
      "Calculate parking fees",
      "Show available spots",
    ],
  },
  "vending-machine": {
  title: "Vending Machine",
  emoji: "🥤",
  description:
    "Design a vending machine that manages products, inventory, payments and change.",
    requirements: [
      "Multiple products",
      "Each product has a price and available quantity",
      "Users can select a product",
      "Machine accepts payment",
      "Machine returns change when necessary",
      "Handle insufficient payment",
      "Handle out-of-stock products",
    ],
  },
  "elevator-system": {
    title: "Elevator System",
    emoji: "🛗",
    description:
      "Design an elevator system that handles floor requests and efficiently manages multiple elevators.",
        requirements: [
          "Multiple floors",
          "Multiple elevators",
          "Handle floor requests",
          "Assign suitable elevator",
          "Efficiently manage requests",
        ],
  },
  "library-management": {
    title: "Library Management",
    emoji: "📚",
    description:
      "Design a library system for managing books, members, borrowing, returning and reservations.",
      requirements: [
        "Manage books",
        "Manage members",
        "Borrow books",
        "Return books",
        "Handle reservations",
      ],
  },
} as const;

const currentProblem =
  problemData[problemId as keyof typeof problemData] ??
  problemData["parking-lot"];

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [explanation, setExplanation] = useState("");
  const [notes, setNotes] = useState("");

  const [className, setClassName] = useState("");
  const [responsibility, setResponsibility] = useState("");

  const [fromClass, setFromClass] = useState("");
  const [relationshipType, setRelationshipType] = useState("uses");
  const [toClass, setToClass] = useState("");

  const [submitted, setSubmitted] = useState(false);
    const [evaluation, setEvaluation] =
    useState<EvaluationResult | null>(null);

  function addClass() {
    if (!className.trim()) return;

    setClasses([
      ...classes,
      {
        name: className.trim(),
        responsibility: responsibility.trim() || "Not specified",
      },
    ]);

    setClassName("");
    setResponsibility("");
  }

  function removeClass(index: number) {
    setClasses(classes.filter((_, i) => i !== index));
  }

  function addRelationship() {
    if (!fromClass || !toClass || fromClass === toClass) return;

    setRelationships([
      ...relationships,
      {
        from: fromClass,
        type: relationshipType,
        to: toClass,
      },
    ]);

    setFromClass("");
    setToClass("");
  }

  function removeRelationship(index: number) {
    setRelationships(relationships.filter((_, i) => i !== index));
  }

function submitSolution() {
  const problemId = String(params.attemptId);

  const result = evaluateSubmission({
    problemId,
    classes,
    relationships,
    explanation,
    notes,
  });

  saveAttempt(problemId, result);

  setEvaluation(result);
  setSubmitted(true);
}

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <button
              onClick={() => router.push("/")}
              className="text-xs text-zinc-500 hover:text-white"
            >
              ← Problems
            </button>

            <h1 className="mt-1 text-lg font-semibold">
              {currentProblem.title} — Practice
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
              Attempt: {String(params.attemptId)}
            </span>

            <button
              onClick={submitSolution}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Submit Solution
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[320px_1fr]">
        {/* Problem panel */}
        <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-950 p-6 lg:sticky lg:top-24">
          <div className="text-3xl">{currentProblem.emoji}</div>

          <h2 className="mt-4 text-xl font-semibold">{currentProblem.title}</h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {currentProblem.description}
          </p>

          <div className="mt-6 border-t border-zinc-800 pt-5">
            <h3 className="text-sm font-medium">Requirements</h3>

            <ul className="mt-4 space-y-3 text-xs leading-5 text-zinc-500">
  {currentProblem.requirements.map((requirement) => (
    <li key={requirement}>• {requirement}</li>
  ))}
</ul>
          </div>
        </aside>

        {/* Workspace */}
        <section className="space-y-6">
          {/* Classes */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">1. Classes</h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Define the important classes in your design.
                </p>
              </div>

              <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-500">
                {classes.length} classes
              </span>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Class name e.g. ParkingLot"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />

              <input
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                placeholder="Responsibility"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            <button
              onClick={addClass}
              className="mt-3 rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
            >
              + Add Class
            </button>

            {classes.length > 0 && (
              <div className="mt-6 space-y-3">
                {classes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.responsibility}
                      </p>
                    </div>

                    <button
                      onClick={() => removeClass(index)}
                      className="text-xs text-zinc-600 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Relationships */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold">2. Relationships</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Describe how your classes interact.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <select
                value={fromClass}
                onChange={(e) => setFromClass(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option value="">From class</option>

                {classes.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option value="uses">uses</option>
                <option value="contains">contains</option>
                <option value="inherits">inherits</option>
                <option value="implements">implements</option>
                <option value="depends on">depends on</option>
                <option value="composes">composes</option>
              </select>

              <select
                value={toClass}
                onChange={(e) => setToClass(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option value="">To class</option>

                {classes.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={addRelationship}
              className="mt-3 rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
            >
              + Add Relationship
            </button>

            {relationships.length > 0 && (
              <div className="mt-6 space-y-2">
                {relationships.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3 text-sm"
                  >
                    <span>
                      <strong>{item.from}</strong>{" "}
                      <span className="text-zinc-500">{item.type}</span>{" "}
                      <strong>{item.to}</strong>
                    </span>

                    <button
                      onClick={() => removeRelationship(index)}
                      className="text-xs text-zinc-600 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold">3. Design Decisions</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Explain why you designed the system this way.
            </p>

            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={7}
              placeholder="Explain your main design decisions, patterns used, responsibilities, and how your design can be extended..."
              className="mt-6 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>

          {/* Additional notes */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold">4. Additional Notes</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Optional notes about assumptions or trade-offs.
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Example: I chose Strategy Pattern for parking spot allocation..."
              className="mt-6 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div>
              <h3 className="font-medium">Ready to submit?</h3>

              <p className="mt-1 text-xs text-zinc-500">
                Your design will be evaluated against the problem requirements.
              </p>
            </div>

            <button
              onClick={submitSolution}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Submit Solution →
            </button>
          </div>

          {/* Evaluation */}
{submitted && evaluation && (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-zinc-500">Evaluation complete</p>

        <h2 className="mt-1 text-3xl font-bold">
          {evaluation.score}
          <span className="text-lg text-zinc-600"> / 100</span>
        </h2>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
        <p className="text-xs text-zinc-500">Overall assessment</p>

        <p className="mt-1 text-sm font-medium">
          {evaluation.score >= 80
            ? "Strong design"
            : evaluation.score >= 60
              ? "Good foundation"
              : "Needs improvement"}
        </p>
      </div>
    </div>

    {/* Score breakdown */}
    <div className="mt-8 grid gap-3 sm:grid-cols-5">
      <ScoreItem
        label="Classes"
        score={evaluation.breakdown.classes}
        max={25}
      />

      <ScoreItem
        label="Responsibilities"
        score={evaluation.breakdown.responsibilities}
        max={20}
      />

      <ScoreItem
        label="Relationships"
        score={evaluation.breakdown.relationships}
        max={20}
      />

      <ScoreItem
        label="Requirements"
        score={evaluation.breakdown.requirements}
        max={20}
      />

      <ScoreItem
        label="Extensibility"
        score={evaluation.breakdown.extensibility}
        max={15}
      />
    </div>

    {/* Feedback */}
    <div className="mt-8">
      <h3 className="font-semibold">Feedback</h3>

      <div className="mt-4 space-y-3">
        {evaluation.feedback.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex gap-3">
              <span className="mt-0.5 text-sm">
                {item.type === "positive"
                  ? "✓"
                  : item.type === "warning"
                    ? "⚠"
                    : "💡"}
              </span>

              <div>
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  {item.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        </section>
      </div>
    </main>
  );
}