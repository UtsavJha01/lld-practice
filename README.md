
# LLD Practice Platform

A focused Low-Level Design practice platform that helps learners practice LLD problems, submit structured designs, receive explainable feedback, and review previous attempts.

The project was built as a two-day engineering assignment with the goal of demonstrating product thinking, domain design, evaluation, extensibility, and practical engineering judgement.

---

## Overview

Low-Level Design problems often have multiple valid solutions, making it difficult for learners to know whether their design is good and what they should improve.

This platform focuses on a simple practice loop:

```text
Choose Problem
      ↓
Design Solution
      ↓
Submit
      ↓
Receive Feedback
      ↓
Review Attempt
      ↓
Try Again
````

The MVP provides a small set of LLD problems and evaluates submissions across multiple design dimensions.

---

## Features

### Problem Practice

The platform currently provides LLD problems including:

* Parking Lot
* Vending Machine
* Elevator System
* Library Management

Each problem provides requirements and context that the learner can use to create their design.

### Structured Design Submission

A learner can provide:

* Classes
* Class responsibilities
* Relationships between classes
* Design explanation
* Additional notes

### Explainable Evaluation

Submissions are evaluated across five categories:

| Category         |  Weight |
| ---------------- | ------: |
| Classes          |      25 |
| Responsibilities |      20 |
| Relationships    |      20 |
| Requirements     |      20 |
| Extensibility    |      15 |
| **Total**        | **100** |

The evaluator provides both a score and feedback explaining areas that are strong or need improvement.

### Attempt History

Submitted attempts are stored so learners can review their previous work and continue practicing.

### Automated Tests

The core evaluation logic is covered by automated tests using Vitest.

Current test coverage includes:

* Strong valid submission
* Unknown problem
* Empty submission
* Responsibility scoring
* Relationship scoring
* Extensibility scoring

Current test result:

```text
Test Files: 1 passed
Tests:      6 passed
```

---

## Tech Stack

* Next.js
* React
* TypeScript
* Vitest
* CSS
* Local persistence for prototype data

The application uses a simple monolithic architecture because the assignment focuses primarily on LLD and domain design rather than large-scale infrastructure.

---

## Project Structure

```text
lld-practice/
│
├── app/
│   ├── history/
│   ├── lib/
│   │   ├── evaluation.ts
│   │   ├── history.ts
│   │   └── storage.ts
│   │
│   ├── practice/
│   │   └── [attempt]/
│   │
│   ├── problems/
│   │   └── [id]/
│   │
│   └── page.tsx
│
├── tests/
│   └── evaluation.test.ts
│
├── DESIGN.md
├── RESEARCH.md
├── AI_USAGE.md
├── README.md
├── package.json
└── ...
```

---

## Evaluation Architecture

The evaluation logic is separated from the UI.

The evaluator receives a structured submission:

```text
EvaluationInput
    │
    ├── problemId
    ├── classes
    ├── relationships
    ├── explanation
    └── notes
            │
            ↓
    Evaluation Rules
            │
            ↓
    EvaluationResult
            │
            ├── score
            ├── breakdown
            └── feedback
```

Problem-specific rules define:

* Expected classes
* Requirement keywords
* Extensibility keywords

This allows different LLD problems to have different evaluation criteria without changing the overall evaluation process.

---

## Why Deterministic Evaluation?

The MVP uses a rule-based evaluator instead of making an LLM responsible for the entire evaluation.

This was chosen because deterministic evaluation is:

* Predictable
* Fast
* Testable
* Explainable
* Independent of external AI services

It is particularly suitable for objective checks such as identifying expected domain concepts and checking basic requirement coverage.

LLM-based evaluation is considered a future extension for more subjective areas such as design trade-offs, coupling, cohesion, and deeper design reasoning.

A future version could use a hybrid approach:

```text
Submission
    │
    ├───────────────┐
    ↓               ↓
Rule-Based       LLM Review
Evaluation       Evaluation
    │               │
    └───────┬───────┘
            ↓
     Combined Feedback
```

---

## Domain Concepts

The main domain concepts are:

### Problem

Represents an LLD problem that can be practiced.

### Attempt

Represents one learner submission for a problem.

### ClassItem

Represents a class identified by the learner along with its responsibility.

### Relationship

Represents a relationship between two classes.

### EvaluationResult

Represents the result of evaluating an attempt.

### FeedbackItem

Represents an individual positive feedback item, warning, or suggestion.

The central relationship is:

```text
Problem
   │
   └── Attempt
          │
          ├── ClassItem
          ├── Relationship
          ├── Explanation
          └── Notes
                    │
                    ↓
             EvaluationResult
                    │
                    └── FeedbackItem
```

---

## Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

---

## Running Tests

Run the automated test suite with:

```bash
npm test
```

Vitest will run the tests in the `tests/` directory.

The current test suite contains six tests covering important evaluation behaviour and edge cases.

---

## Design Decisions

### Simple Monolith

The application uses a simple monolithic architecture.

This was intentional because the assignment is primarily an LLD/domain-design exercise. Introducing microservices, Kubernetes, message queues, or other distributed infrastructure would add complexity without improving the core learner experience.

### Structured Submission

The submission uses structured classes, responsibilities, relationships, explanation, and notes instead of only a free-form text field.

This makes evaluation more consistent while still allowing the learner to explain their design.

### Problem-Specific Rules

Different LLD problems have different important domain concepts and requirements.

The evaluator therefore uses problem-specific rules instead of applying one generic set of requirements to every problem.

### Extensible Evaluation

The current evaluation is deterministic, but the design leaves room for additional evaluation approaches such as an LLM evaluator or hybrid evaluator.

---

## Testing

The project includes automated tests for the core evaluation behaviour.

The test suite currently verifies:

```text
✓ Strong valid Parking Lot submission
✓ Unknown problem handling
✓ Empty submission handling
✓ Class responsibility scoring
✓ Relationship scoring
✓ Extensibility scoring
```

Result:

```text
Test Files: 1 passed
Tests:      6 passed
```

---

## Known Limitations

This is intentionally a focused MVP and not a production-ready LMS.

Current limitations include:

* Evaluation is primarily rule-based.
* The evaluator cannot fully understand complex design reasoning.
* The problem set is intentionally small.
* Persistence is designed for prototype usage.
* There is no advanced diagram editor.
* There is no LLM-based qualitative review.
* The dashboard attempt display has a known UI issue, while the dedicated History page correctly displays submitted attempts.

These limitations were accepted to keep the project focused on the core assignment requirements within the two-day timeframe.

---

## Future Improvements

Potential improvements include:

1. Diagram-based class design.
2. LLM-assisted qualitative evaluation.
3. Hybrid deterministic + LLM evaluation.
4. Comparison between multiple attempts.
5. Difficulty levels for problems.
6. Targeted practice based on recurring weaknesses.
7. Timed interview mode.
8. Additional submission formats such as code or UML diagrams.
9. Persistent database-backed storage for multi-user usage.

---

## Documentation

Additional project documentation:

* `RESEARCH.md` — Research, learner problem, existing approaches, gaps, and product direction.
* `DESIGN.md` — MVP architecture, domain model, evaluation approach, extensibility, and trade-offs.
* `AI_USAGE.md` — How AI was used during development and which decisions were made by the developer.

---

## AI Usage

AI was used as a development assistant for selected tasks such as:

* Discussing MVP scope
* Exploring evaluation approaches
* Debugging implementation issues
* Identifying useful automated test cases
* Reviewing documentation structure

The product, architecture, implementation decisions, and final changes were reviewed and tested during development.

See `AI_USAGE.md` for details.

---

## Scope

The project intentionally focuses on:

> **Choose → Design → Submit → Evaluate → Understand → Review → Try Again**

The objective is to demonstrate a useful LLD practice experience rather than build a complete learning management system or production-scale distributed platform.

````

### One important thing

After pasting, **save `README.md`**.

Then run these two commands one after another:

```powershell
npm test
````

and, after it passes:

```powershell
npm run build
```

