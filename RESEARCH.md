# Research Note — LLD Practice Platform

## 1. Problem Understanding

Low-Level Design (LLD) interviews require candidates to convert an open-ended problem into a structured object-oriented design. A typical problem may be as short as "Design a Parking Lot" or "Design an Elevator System", but the candidate is expected to identify classes, responsibilities, relationships, behaviours, and possible extension points.

The difficult part is not only producing a solution. Learners also need to understand whether their solution is good and, more importantly, **why** it could be improved.

Existing preparation resources show that repeated practice is an important part of learning LLD. Many LLD resources use a structured approach involving requirements, objects, relationships, UML, design principles, design patterns, and real-world design problems.

At the same time, mock-interview platforms focus on practicing interviews with another person. This is useful for communication and interview pressure, but it requires another participant and does not provide the same immediate, structured feedback loop for an individual learner.

This creates an opportunity for a lightweight practice product focused specifically on:

> **Design → Submit → Receive explainable feedback → Review → Try again**

---

## 2. Existing Approaches

### 2.1 Structured LLD Learning Platforms

Platforms such as Educative provide structured learning material for object-oriented and low-level design. Their approach combines concepts such as OOP, SOLID principles, design patterns, UML, and real-world design problems.

**Strengths:**

* Structured learning paths
* Large collection of design problems
* Explanations and walkthroughs
* Coverage of object-oriented design concepts
* Practical examples

**Gap for this MVP:**

The experience is primarily learning and course-oriented. A learner who already understands the basics and wants to quickly practice a design problem and receive feedback on their own solution benefits from a more focused workflow.

### 2.2 Peer Mock Interview Platforms

Platforms such as Pramp and similar mock-interview services allow candidates to practice interviews with other engineers.

**Strengths:**

* Real human interaction
* Realistic interview environment
* Practice explaining design decisions
* Useful for communication and interview confidence

**Gap for this MVP:**

The experience depends on another participant being available. It is less convenient for a learner who wants to independently practice several LLD problems and immediately review the quality of their design.

### 2.3 Online Interview Resources and Communities

There are many articles, repositories, videos, and community discussions containing LLD questions and example solutions.

**Strengths:**

* Large variety of problems
* Many real interview experiences
* Multiple possible solutions
* Easy access to examples and discussions

**Gap:**

Feedback is usually scattered across articles, example solutions, discussions, or human reviewers. The learner often has to compare their solution manually and determine what they did wrong.

---

## 3. Key Learner Problem

The main problem is not simply a lack of LLD questions.

A learner needs a **repeatable feedback loop** that helps answer:

1. Did I identify the important domain objects?
2. Did I give each class a clear responsibility?
3. Did I model meaningful relationships?
4. Does my design cover the stated requirements?
5. Can the design handle likely future changes?
6. What should I improve in my next attempt?

This is particularly important because LLD problems can have multiple valid solutions. Therefore, an evaluator should not assume that one specific implementation is the only correct answer.

Instead, feedback should focus on design quality and reasoning.

---

## 4. Product Direction

The MVP is designed as a focused LLD practice environment.

The core learner journey is:

```text
Choose Problem
      ↓
Read Requirements
      ↓
Create Classes & Responsibilities
      ↓
Define Relationships
      ↓
Explain Design Decisions
      ↓
Submit
      ↓
Receive Score + Explainable Feedback
      ↓
Review Attempt History
      ↓
Try Again
```

The prototype includes several representative LLD problems:

* Parking Lot
* Elevator System
* Vending Machine
* Library Management

For each problem, the learner can define classes, assign responsibilities, describe relationships, explain design decisions, and submit the solution.

The system then evaluates the submission and stores the attempt so that the learner can review previous work.

---

## 5. What Makes Feedback Useful?

A useful LLD evaluator should not only return a numerical score.

For example, simply saying:

> Score: 72/100

does not tell the learner what to do next.

Instead, the system should explain the score through categories such as:

* Missing domain classes
* Unclear responsibilities
* Missing relationships
* Requirements not covered
* Weak extensibility
* Positive design decisions

This makes the feedback actionable.

For example:

> **Some core classes are missing:** Consider modeling `Borrow` and `Reservation`.

is more useful than simply reducing the learner's score.

The learner can then make a targeted improvement and try the problem again.

---

## 6. Evaluation Approach

The MVP uses **deterministic evaluation** rather than depending entirely on an LLM.

The current evaluator scores a submission across five dimensions:

### Classes — 25 points

Checks whether important domain classes expected for the problem have been identified.

### Responsibilities — 20 points

Checks whether classes have meaningful and sufficiently detailed responsibilities.

### Relationships — 20 points

Checks whether the learner has modeled relationships and collaboration between domain objects.

### Requirement Coverage — 20 points

Checks whether important behaviours and requirements from the problem are represented in the submission.

### Extensibility — 15 points

Checks whether the learner has considered future changes and extension points such as strategies, interfaces, policies, or algorithms.

The final score is calculated from these five categories.

This approach makes the evaluation:

* Fast
* Predictable
* Easy to explain
* Easy to test
* Independent of external AI services

---

## 7. Deterministic Evaluation vs. LLM Evaluation

Not every part of LLD evaluation should be handled by the same mechanism.

### Deterministic evaluation is useful for:

* Required domain concepts
* Basic requirement coverage
* Presence of relationships
* Presence of class responsibilities
* Basic extensibility indicators

These checks are predictable, inexpensive, and easy to explain to the learner.

### LLM evaluation can be useful for:

* Reviewing whether responsibilities are well-factored
* Detecting overloaded classes
* Reviewing design trade-offs
* Suggesting alternative abstractions
* Evaluating complex design reasoning
* Providing more natural-language feedback

A future version could combine both approaches:

```text
Learner Submission
       ↓
Deterministic Evaluation
       ↓
Objective Score
       ↓
LLM Design Review
       ↓
Qualitative Suggestions
       ↓
Final Feedback
```

The deterministic evaluator would provide the objective baseline, while the LLM would provide deeper qualitative reasoning.

---

## 8. Handling Multiple Valid Solutions

One important characteristic of LLD is that there is rarely a single perfect design.

For example, two developers may model a Parking Lot differently while both producing reasonable solutions.

Therefore, the MVP does not attempt to compare a submission against one exact class diagram.

Instead, it evaluates broad design concepts:

* Important domain objects
* Clear responsibilities
* Meaningful relationships
* Requirement coverage
* Extensibility

This allows different implementations to receive good scores as long as they demonstrate sound design thinking.

---

## 9. Product Scope

The MVP intentionally focuses on the learner practice loop rather than attempting to become a complete Learning Management System.

### Included

* Multiple LLD problems
* Problem requirements
* Class and responsibility modeling
* Relationship modeling
* Design explanation
* Submission
* Deterministic evaluation
* Explainable feedback
* Attempt history
* Ability to practice problems repeatedly

### Out of Scope

* Full courses and lessons
* Social networking
* Community discussions
* Payments
* Complex authentication
* Distributed infrastructure
* Multi-region deployment
* Large-scale analytics
* Advanced AI orchestration

The goal is to demonstrate a useful end-to-end learning experience within the limited scope of the assignment.

---

## 10. Design Goals

The prototype follows a simple architecture because the primary challenge is LLD/domain design rather than large-scale infrastructure.

The important design goals are:

* Keep the learner workflow simple.
* Separate evaluation logic from UI components.
* Make feedback explainable.
* Keep problem-specific evaluation rules configurable.
* Store previous attempts.
* Allow different evaluation approaches in the future.
* Allow additional submission formats later.
* Keep the system simple enough to understand and maintain.

A monolithic application is sufficient for the current scale and avoids introducing unnecessary infrastructure complexity.

---

## 11. Future Improvements

The most useful future improvements would be:

### 1. Diagram-Based Submissions

Allow learners to visually create class diagrams and relationships instead of entering everything through forms.

### 2. LLM-Assisted Review

Add an optional AI reviewer that can analyze design reasoning and provide deeper qualitative feedback.

### 3. Multiple Evaluation Strategies

Introduce an evaluator interface so different evaluation implementations can be plugged into the system.

For example:

```text
Evaluator
   ├── RuleBasedEvaluator
   ├── LLMEvaluator
   └── HybridEvaluator
```

### 4. Attempt Comparison

Allow learners to compare two attempts and see what improved or remained weak.

### 5. Difficulty Levels

Problems could be categorized as beginner, intermediate, and advanced.

### 6. Targeted Practice

The system could identify recurring weaknesses such as:

```text
Weakness:
Relationship modeling

Recommended action:
Practice problems involving aggregation,
composition, and dependency relationships.
```

### 7. Timed Interview Mode

A future version could provide a time limit and simulate the pressure of an actual LLD interview.

---

## 12. Research Conclusion

The research indicates that the opportunity is not simply to create another collection of LLD questions.

The stronger product opportunity is a focused practice environment where learners can:

1. Attempt a design problem.
2. Submit their own design.
3. Understand how the design was evaluated.
4. Identify specific weaknesses.
5. Review previous attempts.
6. Improve and try again.

Therefore, the MVP focuses on a simple but repeatable learning loop:

> **Choose → Design → Submit → Understand → Improve → Repeat**

The product intentionally prioritizes this feedback loop over a large number of features. This keeps the prototype aligned with the assignment's goal of demonstrating product thinking, LLD, explainable evaluation, extensibility, and practical engineering judgement.
