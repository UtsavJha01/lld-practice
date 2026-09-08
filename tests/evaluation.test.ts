import { describe, expect, it } from "vitest";
import { evaluateSubmission } from "../app/lib/evaluation";

describe("evaluateSubmission", () => {
  it("gives a strong score for a well-designed Parking Lot", () => {
    const result = evaluateSubmission({
      problemId: "parking-lot",
      classes: [
        {
          name: "ParkingLot",
          responsibility: "Manages parking floors and available parking spaces.",
        },
        {
          name: "ParkingFloor",
          responsibility: "Manages parking spots and their availability.",
        },
        {
          name: "ParkingSpot",
          responsibility: "Represents a parking space for a vehicle.",
        },
        {
          name: "Vehicle",
          responsibility: "Represents a vehicle entering and leaving the parking lot.",
        },
      ],
      relationships: [
        { from: "ParkingLot", type: "contains", to: "ParkingFloor" },
        { from: "ParkingFloor", type: "contains", to: "ParkingSpot" },
        { from: "ParkingSpot", type: "holds", to: "Vehicle" },
      ],
      explanation:
        "The design separates parking management, floors, spots and vehicles. A strategy interface can support different allocation and pricing rules and allow future vehicle types.",
      notes:
        "The system should track payment, fee, pricing, allocation, available spots and release spots when vehicles leave.",
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.breakdown.classes).toBe(25);
    expect(result.breakdown.responsibilities).toBe(20);
    expect(result.breakdown.relationships).toBe(20);
  });

  it("returns zero for an unknown problem", () => {
    const result = evaluateSubmission({
      problemId: "unknown-problem",
      classes: [],
      relationships: [],
      explanation: "",
      notes: "",
    });

    expect(result.score).toBe(0);
    expect(result.breakdown.classes).toBe(0);
    expect(result.breakdown.responsibilities).toBe(0);
    expect(result.breakdown.relationships).toBe(0);
    expect(result.breakdown.requirements).toBe(0);
    expect(result.breakdown.extensibility).toBe(0);

    expect(result.feedback[0].title).toBe("Unknown problem");
  });

  it("handles an empty submission", () => {
    const result = evaluateSubmission({
      problemId: "vending-machine",
      classes: [],
      relationships: [],
      explanation: "",
      notes: "",
    });

    expect(result.score).toBe(0);
    expect(result.breakdown.classes).toBe(0);
    expect(result.breakdown.responsibilities).toBe(0);
    expect(result.breakdown.relationships).toBe(0);
    expect(result.feedback).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "No classes submitted",
        }),
      ])
    );
  });

  it("rewards clear class responsibilities", () => {
    const result = evaluateSubmission({
      problemId: "vending-machine",
      classes: [
        {
          name: "VendingMachine",
          responsibility:
            "Controls product selection and coordinates the vending process.",
        },
        {
          name: "Product",
          responsibility:
            "Represents a product with its price and availability.",
        },
        {
          name: "Inventory",
          responsibility:
            "Tracks product stock and updates inventory after purchases.",
        },
        {
          name: "Payment",
          responsibility:
            "Handles payment processing and returning change.",
        },
      ],
      relationships: [],
      explanation: "",
      notes: "",
    });

    expect(result.breakdown.classes).toBe(25);
    expect(result.breakdown.responsibilities).toBe(20);
  });

  it("rewards multiple relationships", () => {
    const result = evaluateSubmission({
      problemId: "elevator-system",
      classes: [
        {
          name: "Elevator",
          responsibility: "Controls elevator movement between floors.",
        },
        {
          name: "ElevatorSystem",
          responsibility: "Coordinates elevator requests and dispatch.",
        },
      ],
      relationships: [
        { from: "ElevatorSystem", type: "manages", to: "Elevator" },
        { from: "Elevator", type: "receives", to: "Request" },
        { from: "Elevator", type: "moves between", to: "Floor" },
      ],
      explanation: "",
      notes: "",
    });

    expect(result.breakdown.relationships).toBe(20);
  });

  it("rewards extensibility considerations", () => {
    const result = evaluateSubmission({
      problemId: "vending-machine",
      classes: [
        {
          name: "VendingMachine",
          responsibility: "Coordinates product selection and payment.",
        },
      ],
      relationships: [],
      explanation:
        "The design uses a strategy interface so new payment methods can be added without modifying the core vending machine. This provides a clear extension point for future requirements.",
      notes: "Additional payment methods can be introduced through the strategy.",
    });

    expect(result.breakdown.extensibility).toBe(15);
  });
});