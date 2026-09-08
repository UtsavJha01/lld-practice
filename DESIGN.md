
# Design Note — LLD Practice Platform

## 1. Overview

The LLD Practice Platform is a focused learning product that allows a learner to practice Low-Level Design problems, submit a structured design, receive explainable feedback, review previous attempts, and try again.

The MVP intentionally focuses on the core practice loop instead of building a complete LMS or introducing unnecessary infrastructure.

The primary flow is:

```text
Choose Problem
      ↓
Read Requirements
      ↓
Create Design
      ↓
Submit
      ↓
Evaluate
      ↓
Receive Feedback
      ↓
Review History
      ↓
Try Again
````

---

## 2. MVP Scope

The MVP supports the following capabilities:

* Browse a small collection of LLD problems.
* Read the requirements and context for each problem.
* Create an attempt for a problem.
* Define classes and their responsibilities.
* Define relationships between classes.
* Explain design decisions.
* Add additional notes.
* Submit the solution.
* Receive a score with a category-wise breakdown.
* Receive explainable feedback.
* Store previous attempts.
* Review previous attempts through the History page.
* Practice the same problem again.

The current problem set includes:

* Parking Lot
* Vending Machine
* Elevator System
* Library Management

The product deliberately does not attempt to provide courses, social features, payments, or large-scale infrastructure.

---

## 3. Learner Journey

The learner journey is designed around repeated practice.

### Step 1 — Choose a Problem

The learner selects an LLD problem from the problem list.

Each problem provides enough context and requirements to start designing without requiring a separate learning course.

### Step 2 — Design the Solution

The learner identifies the important domain concepts and enters:

* Class names
* Class responsibilities
* Relationships
* Design explanation
* Additional notes

This creates a structured representation of the learner's design.

### Step 3 — Submit

The learner submits the attempt.

The system evaluates the submitted design using the configured evaluation rules for that problem.

### Step 4 — Receive Feedback

The learner receives:

* Overall score
* Category-wise score
* Positive feedback
* Warnings
* Suggestions for improvement

### Step 5 — Review

The submitted attempt is stored so the learner can access previous attempts through the History section.

### Step 6 — Try Again

The learner can return to the problem and create another attempt after understanding the feedback.

This creates the intended learning loop:

```text
Practice → Feedback → Review → Improvement → Practice Again
```

---

## 4. Domain Model

The core domain is centered around the concept of an attempt.

The important concepts are:

```text
Problem
   │
   └── Attempt
          │
          ├── ClassItem
          │
          ├── Relationship
          │
          ├── Explanation
          │
          └── Notes
                    │
                    ↓
             EvaluationResult
                    │
                    └── FeedbackItem
```

### Problem

Represents an LLD problem that a learner can practice.

Examples:

* Parking Lot
* Vending Machine
* Elevator System
* Library Management

A problem provides the requirements and evaluation rules used for an attempt.

### Attempt

Represents one learner submission for a specific problem.

An attempt contains the learner's design and the resulting evaluation.

This concept is important because the product is designed around repeated attempts rather than one-time answers.

### ClassItem

Represents a class identified by the learner.

Each class contains:

* Name
* Responsibility

This allows the evaluator to assess both class selection and responsibility clarity.

### Relationship

Represents a relationship between two classes.

It contains:

* Source class
* Relationship type
* Target class

This allows the evaluator to determine whether the learner has modeled collaboration between domain objects.

### EvaluationResult

Represents the result of evaluating an attempt.

It contains:

* Overall score
* Category-wise breakdown
* Feedback items

### FeedbackItem

Represents one piece of feedback.

A feedback item has a type:

* Positive
* Warning
* Suggestion

It also contains a title and a detailed message.

---

## 5. Evaluation Model

The MVP uses a deterministic evaluator.

The evaluator receives an `EvaluationInput` containing:

* Problem ID
* Classes
* Relationships
* Explanation
* Notes

It then selects the rules associated with the problem and calculates the score.

The current score is divided into five categories:

| Category         |  Weight |
| ---------------- | ------: |
| Classes          |      25 |
| Responsibilities |      20 |
| Relationships    |      20 |
| Requirements     |      20 |
| Extensibility    |      15 |
| **Total**        | **100** |

### Classes

The evaluator checks whether important domain concepts expected for the selected problem are present.

For example, the Parking Lot problem expects concepts such as:

* ParkingLot
* ParkingFloor
* ParkingSpot
* Vehicle

### Responsibilities

The evaluator checks whether classes have meaningful responsibility descriptions.

A responsibility must contain enough information to demonstrate that the learner has assigned a focused responsibility to the class.

### Relationships

The evaluator rewards explicit relationships between classes.

The purpose is to encourage learners to think about object collaboration rather than producing only a list of classes.

### Requirements

The evaluator checks whether important problem behaviours appear across:

* Class names
* Responsibilities
* Relationships
* Explanation
* Notes

### Extensibility

The evaluator checks whether the learner has considered future changes using concepts such as:

* Strategy
* Interface
* State
* Algorithm
* Policy
* Extension points

A sufficiently detailed design explanation can also contribute to the extensibility score.

---

## 6. Problem-Specific Evaluation Rules

Instead of hardcoding one global set of rules, the evaluator maintains problem-specific configuration.

Conceptually:

```text
Problem ID
    ↓
Problem Rules
    ├── Expected Classes
    ├── Requirement Keywords
    └── Extensibility Keywords
```

This allows different problems to have different domain expectations.

For example:

```text
Parking Lot
    → ParkingLot
    → ParkingFloor
    → ParkingSpot
    → Vehicle

Vending Machine
    → VendingMachine
    → Product
    → Inventory
    → Payment
```

This approach makes adding another problem relatively straightforward because the evaluation rules can be extended without changing the overall evaluation algorithm.

---

## 7. Why Deterministic Evaluation?

An important product decision was to avoid relying entirely on an LLM for the MVP.

A deterministic evaluator provides several advantages:

### Consistency

The same submission receives the same result when evaluated multiple times.

### Explainability

The system can clearly explain why points were awarded or deducted.

### Speed

Evaluation can happen immediately without waiting for an external AI service.

### Reliability

The core evaluation does not depend on network availability or an external model.

### Testability

The evaluation rules can be covered by automated tests.

This is particularly appropriate for objective checks such as whether important classes or requirements are represented.

---

## 8. Where AI Can Be Added Later

LLMs are more useful for subjective aspects of LLD evaluation.

A future architecture could support:

```text
                 Submission
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
Deterministic Evaluator    LLM Evaluator
          │                     │
          ↓                     ↓
 Objective Score         Design Reasoning
          │                     │
          └──────────┬──────────┘
                     ↓
              Combined Feedback
```

The deterministic evaluator could remain responsible for objective scoring, while the LLM could review:

* Design trade-offs
* Responsibility quality
* Coupling
* Cohesion
* Design patterns
* Alternative approaches
* Potential design smells

This hybrid approach would provide richer feedback without making the entire evaluation dependent on an LLM.

---

## 9. Extensibility

The evaluation logic is separated from the user interface.

The current evaluator is implemented as a dedicated domain-level module rather than being embedded directly inside the page components.

This provides a foundation for supporting additional evaluation approaches later.

A future abstraction could look like:

```text
Evaluator
    │
    ├── RuleBasedEvaluator
    │
    ├── LLMEvaluator
    │
    └── HybridEvaluator
```

Similarly, the submission model can be extended in the future.

The current format is structured text-based design input, but additional formats could be supported:

```text
Submission
    │
    ├── StructuredDesign
    ├── Diagram
    └── Code
```

The important principle is to keep the evaluation and submission concepts separate from the UI implementation.

---

## 10. Data and Persistence

The MVP uses simple local persistence rather than introducing a database or distributed architecture.

This is intentional because the assignment is focused on LLD and product behaviour rather than infrastructure.

The application needs to persist enough information to:

* Create an attempt
* Save the learner's design
* Save the evaluation result
* Retrieve previous attempts
* Display attempt history

For the scope of the prototype, local persistence is sufficient.

A production version could replace this with a database-backed repository without changing the learner-facing workflow.

---

## 11. Handling Evaluation Failures

The MVP keeps evaluation synchronous because the current deterministic evaluator is lightweight and fast.

For a future AI-based evaluator, evaluation could take longer or fail because of external service issues.

A practical production flow would be:

```text
Submitted
    ↓
Evaluating
    ↓
┌───────────────┐
│               │
↓               ↓
Completed      Failed
│               │
↓               ↓
Feedback       Retry
```

The important point is that the learner should always know the current state of their submission.

There is no need to introduce a complex distributed job system for the current prototype.

---

## 12. Testing

The core evaluation behaviour is covered with automated tests using Vitest.

The current test suite covers:

* A strong valid Parking Lot submission
* Unknown problem handling
* Empty submission handling
* Class responsibility scoring
* Relationship scoring
* Extensibility scoring

The test suite currently contains:

```text
1 test file
6 tests
6 passed
```

These tests cover both normal behaviour and important edge cases.

---

## 13. Key Trade-offs

### Deterministic Evaluation vs. LLM-Only Evaluation

**Chosen:** Deterministic evaluation for the MVP.

**Reason:** More predictable, explainable, testable, and reliable.

**Trade-off:** It cannot fully understand nuanced design reasoning.

---

### Structured Input vs. Free-Form Answer

**Chosen:** Structured classes, responsibilities, relationships, explanation, and notes.

**Reason:** Makes evaluation more consistent and feedback more actionable.

**Trade-off:** Less freedom than submitting an entirely free-form design.

---

### Local Persistence vs. Database

**Chosen:** Simple local persistence for the prototype.

**Reason:** Faster to implement and sufficient for a two-day assignment.

**Trade-off:** Not suitable for multiple users or production-scale persistence.

---

### Monolith vs. Distributed Architecture

**Chosen:** Simple monolithic application.

**Reason:** The assignment is primarily an LLD/domain-design exercise. Distributed infrastructure would add complexity without improving the core learner experience.

**Trade-off:** A production system would eventually require stronger persistence, authentication, and scalability mechanisms.

---

## 14. Limitations

The current MVP has several intentional limitations:

* Evaluation is primarily rule-based.
* The evaluator cannot fully understand complex design reasoning.
* The problem set is small.
* Persistence is designed for prototype usage rather than production-scale multi-user usage.
* There is no advanced diagram editor.
* There is no full LLM-based design review.
* The product does not currently provide a complete learning curriculum.

These limitations are acceptable for the assignment because the goal is to demonstrate the core practice and feedback loop.

---

## 15. Future Architecture

A more complete version could evolve toward:

```text
                    Web Application
                          │
              ┌───────────┴───────────┐
              ↓                       ↓
       Problem Service          Attempt Service
                                      │
                                      ↓
                              Evaluation Service
                                      │
                       ┌──────────────┼──────────────┐
                       ↓              ↓              ↓
                 Rule Evaluator   LLM Evaluator   Hybrid
                       │              │              │
                       └──────────────┼──────────────┘
                                      ↓
                                  Feedback
                                      │
                                      ↓
                                  History
```

However, these components do not need to be separate services in the current MVP.

The current architecture keeps them within a simple application while maintaining logical separation between UI, persistence, and evaluation.

---

## 16. Conclusion

The main design principle of the platform is to make LLD practice iterative and explainable.

The system does not attempt to determine a single "correct" design. Instead, it evaluates important dimensions of design quality and provides feedback that helps the learner improve.

The architecture keeps evaluation logic separate from the UI, uses problem-specific rules, stores attempts for review, and leaves room for future LLM-based evaluation and additional submission formats.

The resulting MVP demonstrates the complete practice loop:

> **Choose → Design → Submit → Evaluate → Understand → Review → Try Again**

```

Save the file with **Ctrl + S**.

After saving, **don't create anything else yet**. The next file will be `AI_USAGE.md`, and that one needs to accurately describe how **you used AI during this assignment**, rather than making up generic AI usage.
```
