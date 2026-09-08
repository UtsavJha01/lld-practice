````md
# AI Usage

I used AI as a development assistant during this assignment for brainstorming, debugging, implementation guidance, testing, and documentation. I did not rely on AI to independently design or build the entire application.

The main product and engineering decisions were made based on the assignment requirements and my own understanding of the problem.

## 1. MVP Scope and Product Direction

### How AI was used

I discussed the assignment requirements with AI to understand what should be included in a realistic two-day MVP and what could be kept outside the scope.

AI helped me break the assignment into the core learner journey:

```text
Choose Problem
    ↓
Design
    ↓
Submit
    ↓
Feedback
    ↓
Review
    ↓
Try Again
````

### My decision

I used this as a starting point and decided to keep the product intentionally focused.

The MVP focuses on:

* A small set of LLD problems
* Structured design input
* Submission
* Explainable evaluation
* Attempt history

I deliberately avoided unnecessary features such as courses, social features, complex authentication, microservices, and large-scale infrastructure because they were outside the main objective of the assignment.

---

## 2. Evaluation Approach

### Problem

A major design question was how to evaluate an LLD submission when multiple valid solutions can exist.

### How AI helped

I used AI to discuss the trade-offs between:

* Completely rule-based evaluation
* LLM-based evaluation
* A hybrid approach

### My decision

For the MVP, I chose deterministic evaluation.

The evaluator scores:

* Classes — 25 points
* Responsibilities — 20 points
* Relationships — 20 points
* Requirements — 20 points
* Extensibility — 15 points

I chose this approach because it is predictable, explainable, fast, and easy to test.

I kept LLM-based qualitative evaluation as a possible future enhancement instead of making the MVP dependent on an external AI service.

---

## 3. Debugging and Implementation Assistance

### How AI was used

During implementation, I used AI when I encountered specific development problems involving routing, state handling, UI behaviour, and data flow.

Instead of asking AI to rebuild the application, I shared the relevant implementation or problem and used the suggestions to understand possible causes and test potential fixes.

For example, while working on the attempt history and dashboard, the history route was working correctly while the dashboard attempt section was not displaying the same data.

AI helped me reason about the difference between the two data flows and investigate the issue.

### My decision

I tested the suggested changes myself and kept changes that were compatible with the existing application structure.

The remaining dashboard history display issue was treated as a known limitation rather than introducing a large architectural change immediately before submission.

---

## 4. Automated Testing

### How AI was used

After completing the main implementation, I used AI to identify important behaviours that should have automated tests.

The focus was on testing the core evaluation logic rather than attempting to test every UI interaction.

The test cases cover:

* A strong valid submission
* Unknown problem handling
* Empty submission handling
* Class responsibility scoring
* Relationship scoring
* Extensibility scoring

### My decision

I implemented these tests using Vitest and verified them locally.

The final test run was:

```text
Test Files: 1 passed
Tests:      6 passed
```

This provided automated coverage for important evaluation behaviour and edge cases while keeping the test suite appropriate for the size of the MVP.

---

## 5. Documentation Review

### How AI was used

AI was used to help organize the required documentation and check whether the implementation addressed the assignment's requested deliverables.

It helped structure:

* Research Note
* Design Note
* AI Usage documentation
* README improvements

### My decision

I reviewed the documentation and kept the sections that correspond to the actual implementation.

I avoided presenting future ideas or planned improvements as features that were already implemented.

---

## What I Learned From Using AI

Using AI was most useful when it acted as a second pair of eyes rather than making decisions for me.

The most useful areas were:

* Breaking a large assignment into smaller tasks
* Discussing design trade-offs
* Debugging specific implementation issues
* Identifying useful test cases
* Reviewing documentation

The final implementation decisions were based on the assignment requirements, the behaviour of the application, and my own testing.

## Summary

AI was used selectively throughout the project:

```text
My Understanding
      ↓
My Design Decision
      ↓
AI Discussion / Assistance
      ↓
Implementation
      ↓
My Testing
      ↓
Final Decision
```

The goal was to use AI to improve development speed and reasoning while maintaining ownership of the product, architecture, implementation, and final engineering decisions.

```
```
