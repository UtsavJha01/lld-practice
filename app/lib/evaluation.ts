export type ClassItem = {
  name: string;
  responsibility: string;
};

export type Relationship = {
  from: string;
  type: string;
  to: string;
};

export type EvaluationInput = {
  problemId: string;
  classes: ClassItem[];
  relationships: Relationship[];
  explanation: string;
  notes: string;
};

export type FeedbackItem = {
  type: "positive" | "warning" | "suggestion";
  title: string;
  message: string;
};

export type EvaluationResult = {
  score: number;
  breakdown: {
    classes: number;
    responsibilities: number;
    relationships: number;
    requirements: number;
    extensibility: number;
  };
  feedback: FeedbackItem[];
};

const problemRules: Record<
  string,
  {
    expectedClasses: string[];
    keywords: string[];
    extensibilityKeywords: string[];
  }
> = {
  "parking-lot": {
    expectedClasses: [
      "parkinglot",
      "parkingfloor",
      "parkingspot",
      "vehicle",
    ],
    keywords: [
      "payment",
      "fee",
      "pricing",
      "allocation",
      "available",
      "release",
    ],
    extensibilityKeywords: [
      "strategy",
      "interface",
      "abstract",
      "extension",
      "new vehicle",
      "new spot",
    ],
  },

  "vending-machine": {
    expectedClasses: [
      "vendingmachine",
      "product",
      "inventory",
      "payment",
    ],
    keywords: [
      "stock",
      "change",
      "price",
      "payment",
      "selection",
    ],
    extensibilityKeywords: [
      "strategy",
      "interface",
      "state",
      "payment method",
      "extension",
    ],
  },

  "elevator-system": {
    expectedClasses: [
      "elevator",
      "elevatorsystem",
      "request",
      "floor",
    ],
    keywords: [
      "request",
      "floor",
      "direction",
      "movement",
      "dispatch",
      "selection",
    ],
    extensibilityKeywords: [
      "strategy",
      "interface",
      "algorithm",
      "selection strategy",
      "extension",
    ],
  },

  "library-management": {
    expectedClasses: [
      "library",
      "book",
      "member",
      "borrow",
      "reservation",
    ],
    keywords: [
      "borrow",
      "return",
      "reserve",
      "availability",
      "copy",
    ],
    extensibilityKeywords: [
      "interface",
      "strategy",
      "extension",
      "notification",
      "policy",
    ],
  },
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function textContains(text: string, keyword: string) {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

export function evaluateSubmission(
  input: EvaluationInput
): EvaluationResult {
  const rules = problemRules[input.problemId];

  if (!rules) {
    return {
      score: 0,
      breakdown: {
        classes: 0,
        responsibilities: 0,
        relationships: 0,
        requirements: 0,
        extensibility: 0,
      },
      feedback: [
        {
          type: "warning",
          title: "Unknown problem",
          message: "No evaluation rules are configured for this problem yet.",
        },
      ],
    };
  }

  const feedback: FeedbackItem[] = [];

  /*
   * 1. CLASS DESIGN — 25 points
   */
  const submittedClassNames = input.classes.map((item) =>
    normalize(item.name)
  );

  const matchedClasses = rules.expectedClasses.filter((expected) =>
    submittedClassNames.some(
      (submitted) =>
        submitted.includes(expected) || expected.includes(submitted)
    )
  );

  const classScore = Math.round(
    (matchedClasses.length / rules.expectedClasses.length) * 25
  );

  if (classScore >= 20) {
    feedback.push({
      type: "positive",
      title: "Good core modeling",
      message: `You identified ${matchedClasses.length} of the main domain concepts expected for this problem.`,
    });
  } else {
    const missing = rules.expectedClasses.filter(
      (expected) =>
        !submittedClassNames.some(
          (submitted) =>
            submitted.includes(expected) || expected.includes(submitted)
        )
    );

    feedback.push({
      type: "warning",
      title: "Some core classes are missing",
      message: `Consider modeling: ${missing.join(", ")}.`,
    });
  }

  /*
   * 2. RESPONSIBILITIES — 20 points
   */
  const classesWithResponsibilities = input.classes.filter(
    (item) =>
      item.responsibility.trim().length >= 10 &&
      item.responsibility.toLowerCase() !== "not specified"
  );

  const responsibilityScore =
    input.classes.length === 0
      ? 0
      : Math.min(
          20,
          Math.round(
            (classesWithResponsibilities.length / input.classes.length) * 20
          )
        );

  if (responsibilityScore >= 16) {
    feedback.push({
      type: "positive",
      title: "Responsibilities are clear",
      message:
        "Most of your classes have explicit responsibilities, which helps avoid anemic or overloaded domain models.",
    });
  } else {
    feedback.push({
      type: "warning",
      title: "Clarify class responsibilities",
      message:
        "Give each important class a focused responsibility. Avoid vague descriptions such as 'handles everything'.",
    });
  }

  /*
   * 3. RELATIONSHIPS — 20 points
   */
  let relationshipScore = 0;

  if (input.relationships.length >= 1) relationshipScore += 8;
  if (input.relationships.length >= 2) relationshipScore += 6;
  if (input.relationships.length >= 3) relationshipScore += 6;

  relationshipScore = Math.min(20, relationshipScore);

  if (relationshipScore >= 14) {
    feedback.push({
      type: "positive",
      title: "Class relationships are modeled",
      message:
        "Your design contains multiple explicit relationships between domain objects.",
    });
  } else {
    feedback.push({
      type: "warning",
      title: "Add more relationships",
      message:
        "An LLD is not only a list of classes. Show how the objects collaborate with each other.",
    });
  }

  /*
   * 4. REQUIREMENT COVERAGE — 20 points
   */
  const combinedText = [
    ...input.classes.map((item) => item.name),
    ...input.classes.map((item) => item.responsibility),
    ...input.relationships.map(
      (item) => `${item.from} ${item.type} ${item.to}`
    ),
    input.explanation,
    input.notes,
  ].join(" ");

  const matchedKeywords = rules.keywords.filter((keyword) =>
    textContains(combinedText, keyword)
  );

  const requirementScore = Math.min(
    20,
    Math.round(
      (matchedKeywords.length / rules.keywords.length) * 20
    )
  );

  if (requirementScore >= 14) {
    feedback.push({
      type: "positive",
      title: "Good requirement coverage",
      message:
        "Your design addresses several of the important behaviours described in the problem.",
    });
  } else {
    const missing = rules.keywords.filter(
      (keyword) => !textContains(combinedText, keyword)
    );

    feedback.push({
      type: "warning",
      title: "Some requirements need attention",
      message: `Your submission does not clearly mention: ${missing.join(", ")}.`,
    });
  }

  /*
   * 5. EXTENSIBILITY — 15 points
   */
  const extensibilityMatches = rules.extensibilityKeywords.filter((keyword) =>
    textContains(combinedText, keyword)
  );

  let extensibilityScore = Math.min(
    15,
    extensibilityMatches.length * 5
  );

  if (input.explanation.trim().length >= 100) {
    extensibilityScore = Math.min(15, extensibilityScore + 5);
  }

  if (extensibilityScore >= 10) {
    feedback.push({
      type: "positive",
      title: "Good attention to extensibility",
      message:
        "Your explanation shows consideration for future changes and extension points.",
    });
  } else {
    feedback.push({
      type: "suggestion",
      title: "Think about future changes",
      message:
        "Explain how your design would handle a new vehicle type, pricing rule, payment method, or other likely requirement changes.",
    });
  }

  /*
   * Final score
   */
  const score =
    classScore +
    responsibilityScore +
    relationshipScore +
    requirementScore +
    extensibilityScore;

  /*
   * Basic submission warning
   */
  if (input.classes.length === 0) {
    feedback.unshift({
      type: "warning",
      title: "No classes submitted",
      message:
        "Start by identifying the main domain objects involved in the problem.",
    });
  }

  if (input.explanation.trim().length === 0) {
    feedback.push({
      type: "suggestion",
      title: "Add design reasoning",
      message:
        "Explain why you chose these abstractions and relationships. This makes the evaluation more meaningful.",
    });
  }

  return {
    score,
    breakdown: {
      classes: classScore,
      responsibilities: responsibilityScore,
      relationships: relationshipScore,
      requirements: requirementScore,
      extensibility: extensibilityScore,
    },
    feedback,
  };
}