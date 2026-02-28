/**
 * 💎 Quiz Reducer Tests — Formal Correctness
 *
 * Мы НЕ тестируем UI/React/хуки
 * Мы тестируем: «Если пользователь сделал X → система обязана перейти в Y»
 *
 * Это formal correctness.
 */

import { describe, expect, it } from "vitest";
import type { QuizState } from "./quiz.machine";
import { initialState, quizReducer } from "./quiz.reducer";

describe("quizReducer — Initial State", () => {
  it("starts at dates step with empty priorities", () => {
    expect(initialState.currentStep).toBe("dates");
    expect(initialState.formData.priorities).toEqual([]);
    expect(initialState.isSubmitting).toBe(false);
    expect(initialState.isReturning).toBe(false);
  });
});

describe("quizReducer — Basic Transitions", () => {
  it("moves from dates → travelers after selecting date range", () => {
    const next = quizReducer(initialState, {
      type: "SELECT_DATE_RANGE",
      value: "SOON",
    });

    expect(next.currentStep).toBe("travelers");
    expect(next.formData.dateRange).toBe("SOON");
    expect(next.isReturning).toBe(false);
  });

  it("moves from travelers → region after selecting travelers", () => {
    const travelersState: QuizState = {
      ...initialState,
      currentStep: "travelers",
      formData: {
        ...initialState.formData,
        dateRange: "SOON",
      },
    };

    const next = quizReducer(travelersState, {
      type: "SELECT_TRAVELERS",
      value: "COUPLE",
    });

    expect(next.currentStep).toBe("region");
    expect(next.formData.travelers).toBe("COUPLE");
    expect(next.isReturning).toBe(false);
  });

  it("moves from region → priorities after selecting region", () => {
    const regionState: QuizState = {
      ...initialState,
      currentStep: "region",
      formData: {
        ...initialState.formData,
        dateRange: "SOON",
        travelers: "COUPLE",
      },
    };

    const next = quizReducer(regionState, {
      type: "SELECT_REGION",
      value: "MEDITERRANEAN",
    });

    expect(next.currentStep).toBe("priorities");
    expect(next.formData.region).toBe("MEDITERRANEAN");
    expect(next.isReturning).toBe(false);
  });
});

describe("quizReducer — Happy Path (главный тест продукта)", () => {
  it("completes full happy path from dates → contacts", () => {
    let state = initialState;

    // dates → travelers
    state = quizReducer(state, { type: "SELECT_DATE_RANGE", value: "SOON" });
    expect(state.currentStep).toBe("travelers");
    expect(state.formData.dateRange).toBe("SOON");

    // travelers → region
    state = quizReducer(state, { type: "SELECT_TRAVELERS", value: "COUPLE" });
    expect(state.currentStep).toBe("region");
    expect(state.formData.travelers).toBe("COUPLE");

    // region → priorities
    state = quizReducer(state, { type: "SELECT_REGION", value: "MEDITERRANEAN" });
    expect(state.currentStep).toBe("priorities");
    expect(state.formData.region).toBe("MEDITERRANEAN");

    // priorities (toggle multiple)
    state = quizReducer(state, { type: "TOGGLE_PRIORITY", value: "COMFORT" });
    expect(state.formData.priorities).toContain("COMFORT");

    state = quizReducer(state, { type: "TOGGLE_PRIORITY", value: "RELAX" });
    expect(state.formData.priorities).toContain("COMFORT");
    expect(state.formData.priorities).toContain("RELAX");

    // priorities → contacts
    state = quizReducer(state, { type: "NEXT" });
    expect(state.currentStep).toBe("contacts");

    // Все данные должны быть сохранены
    expect(state.formData.dateRange).toBe("SOON");
    expect(state.formData.travelers).toBe("COUPLE");
    expect(state.formData.region).toBe("MEDITERRANEAN");
    expect(state.formData.priorities).toEqual(["COMFORT", "RELAX"]);
  });
});

describe("quizReducer — Priorities Toggle", () => {
  const prioritiesState: QuizState = {
    ...initialState,
    currentStep: "priorities",
    formData: {
      ...initialState.formData,
      dateRange: "SOON",
      travelers: "COUPLE",
      region: "MEDITERRANEAN",
    },
  };

  it("adds priority when not present", () => {
    const next = quizReducer(prioritiesState, {
      type: "TOGGLE_PRIORITY",
      value: "COMFORT",
    });

    expect(next.formData.priorities).toContain("COMFORT");
  });

  it("removes priority when already present", () => {
    const stateWithComfort: QuizState = {
      ...prioritiesState,
      formData: {
        ...prioritiesState.formData,
        priorities: ["COMFORT"],
      },
    };

    const next = quizReducer(stateWithComfort, {
      type: "TOGGLE_PRIORITY",
      value: "COMFORT",
    });

    expect(next.formData.priorities).not.toContain("COMFORT");
    expect(next.formData.priorities).toEqual([]);
  });

  it("allows multiple priorities", () => {
    let state = prioritiesState;

    state = quizReducer(state, { type: "TOGGLE_PRIORITY", value: "COMFORT" });
    state = quizReducer(state, { type: "TOGGLE_PRIORITY", value: "RELAX" });
    state = quizReducer(state, { type: "TOGGLE_PRIORITY", value: "EXCURSIONS" });

    expect(state.formData.priorities).toEqual(["COMFORT", "RELAX", "EXCURSIONS"]);
  });
});

describe("quizReducer — Navigation (NEXT/PREV)", () => {
  it("moves forward with NEXT event", () => {
    const prioritiesState: QuizState = {
      ...initialState,
      currentStep: "priorities",
      formData: {
        ...initialState.formData,
        priorities: ["COMFORT"],
      },
    };

    const next = quizReducer(prioritiesState, { type: "NEXT" });

    expect(next.currentStep).toBe("contacts");
    expect(next.isReturning).toBe(false);
  });

  it("moves backward with PREV event", () => {
    const travelersState: QuizState = {
      ...initialState,
      currentStep: "travelers",
      formData: { ...initialState.formData, dateRange: "SOON" },
    };

    const prev = quizReducer(travelersState, { type: "PREV" });

    expect(prev.currentStep).toBe("dates");
    expect(prev.isReturning).toBe(true); // 🔥 important!
  });

  it("does not go PREV if there is no previous step", () => {
    const prev = quizReducer(initialState, { type: "PREV" });

    expect(prev.currentStep).toBe("dates");
  });

  it("does not go NEXT if there is no next step (FSM замкнута)", () => {
    const successState: QuizState = {
      ...initialState,
      currentStep: "success",
      applicationId: "CR-123",
    };

    const next = quizReducer(successState, { type: "NEXT" });

    expect(next.currentStep).toBe("success");
  });
});

describe("quizReducer — Submit Flow", () => {
  const contactsState: QuizState = {
    ...initialState,
    currentStep: "contacts",
    formData: {
      dateRange: "SOON",
      travelers: "COUPLE",
      region: "MEDITERRANEAN",
      priorities: ["COMFORT"],
      name: "Alex",
      phone: "+79990000000",
      email: "alex@test.com",
    },
  };

  it("sets isSubmitting=true on SUBMIT_REQUEST", () => {
    const submitting = quizReducer(contactsState, { type: "SUBMIT_REQUEST" });

    expect(submitting.isSubmitting).toBe(true);
    expect(submitting.submitError).toBeUndefined();
  });

  it("moves to success on SUBMIT_SUCCESS", () => {
    const submittingState: QuizState = {
      ...contactsState,
      isSubmitting: true,
    };

    const success = quizReducer(submittingState, {
      type: "SUBMIT_SUCCESS",
      applicationId: "CR-123",
    });

    expect(success.isSubmitting).toBe(false);
    expect(success.currentStep).toBe("success");
    expect(success.applicationId).toBe("CR-123");
    expect(success.submitError).toBeUndefined();
  });

  it("sets error on SUBMIT_ERROR", () => {
    const submittingState: QuizState = {
      ...contactsState,
      isSubmitting: true,
    };

    const error = quizReducer(submittingState, {
      type: "SUBMIT_ERROR",
      message: "Network error",
    });

    expect(error.isSubmitting).toBe(false);
    expect(error.submitError).toBe("Network error");
    expect(error.currentStep).toBe("contacts"); // stays on contacts
  });
});

describe("quizReducer — Restore & Reset", () => {
  it("restores draft state correctly", () => {
    const restoredState: QuizState = {
      ...initialState,
      currentStep: "region",
      formData: {
        dateRange: "ONE_TO_THREE",
        travelers: "FAMILY",
        priorities: [],
      },
    };

    const next = quizReducer(initialState, {
      type: "RESTORE_DRAFT",
      state: restoredState,
    });

    expect(next.currentStep).toBe("region");
    expect(next.formData.dateRange).toBe("ONE_TO_THREE");
    expect(next.formData.travelers).toBe("FAMILY");
    expect(next.isReturning).toBe(false);
  });

  it("resets to initial state on START_FRESH", () => {
    const dirtyState: QuizState = {
      ...initialState,
      currentStep: "priorities",
      formData: {
        dateRange: "SOON",
        travelers: "COUPLE",
        region: "MEDITERRANEAN",
        priorities: ["COMFORT"],
      },
    };

    const fresh = quizReducer(dirtyState, { type: "START_FRESH" });

    expect(fresh).toEqual(initialState);
  });
});

describe("quizReducer — Business Invariants (самый сеньорский тест)", () => {
  it("🔥 CRITICAL: cannot reach success without SUBMIT_SUCCESS event", () => {
    let state = initialState;

    // Проходим все шаги через NEXT
    state = quizReducer(state, { type: "SELECT_DATE_RANGE", value: "SOON" });
    state = quizReducer(state, { type: "SELECT_TRAVELERS", value: "COUPLE" });
    state = quizReducer(state, { type: "SELECT_REGION", value: "MEDITERRANEAN" });
    state = quizReducer(state, { type: "NEXT" }); // priorities → contacts

    // Попытка пройти дальше через NEXT (должно остаться на contacts)
    state = quizReducer(state, { type: "NEXT" });

    expect(state.currentStep).toBe("contacts"); // НЕ success!
    expect(state.currentStep).not.toBe("success");
  });

  it("🔥 CRITICAL: success state always has applicationId", () => {
    const contactsState: QuizState = {
      ...initialState,
      currentStep: "contacts",
      formData: {
        dateRange: "SOON",
        travelers: "COUPLE",
        region: "MEDITERRANEAN",
        priorities: ["COMFORT"],
        name: "Alex",
        phone: "+79990000000",
        email: "alex@test.com",
      },
      isSubmitting: true,
    };

    const success = quizReducer(contactsState, {
      type: "SUBMIT_SUCCESS",
      applicationId: "CR-456",
    });

    expect(success.currentStep).toBe("success");
    expect(success.applicationId).toBeDefined();
    expect(success.applicationId).toBe("CR-456");
  });

  it("preserves form data through all transitions", () => {
    let state = initialState;

    state = quizReducer(state, { type: "SELECT_DATE_RANGE", value: "SOON" });
    const dateRange = state.formData.dateRange;

    state = quizReducer(state, { type: "SELECT_TRAVELERS", value: "COUPLE" });
    expect(state.formData.dateRange).toBe(dateRange); // preserved

    state = quizReducer(state, { type: "SELECT_REGION", value: "MEDITERRANEAN" });
    expect(state.formData.dateRange).toBe(dateRange); // still there
    expect(state.formData.travelers).toBe("COUPLE"); // still there

    // Все данные должны сохраняться
    expect(state.formData.dateRange).toBeDefined();
    expect(state.formData.travelers).toBeDefined();
    expect(state.formData.region).toBeDefined();
  });
});

describe("quizReducer — Contacts Update", () => {
  const contactsState: QuizState = {
    ...initialState,
    currentStep: "contacts",
    formData: {
      dateRange: "SOON",
      travelers: "COUPLE",
      region: "MEDITERRANEAN",
      priorities: ["COMFORT"],
    },
  };

  it("updates name field", () => {
    const next = quizReducer(contactsState, {
      type: "UPDATE_CONTACTS",
      name: "John Doe",
    });

    expect(next.formData.name).toBe("John Doe");
  });

  it("updates phone field", () => {
    const next = quizReducer(contactsState, {
      type: "UPDATE_CONTACTS",
      phone: "+79991234567",
    });

    expect(next.formData.phone).toBe("+79991234567");
  });

  it("updates email field", () => {
    const next = quizReducer(contactsState, {
      type: "UPDATE_CONTACTS",
      email: "john@example.com",
    });

    expect(next.formData.email).toBe("john@example.com");
  });

  it("updates multiple fields at once", () => {
    const next = quizReducer(contactsState, {
      type: "UPDATE_CONTACTS",
      name: "Jane Doe",
      phone: "+79997654321",
      email: "jane@example.com",
    });

    expect(next.formData.name).toBe("Jane Doe");
    expect(next.formData.phone).toBe("+79997654321");
    expect(next.formData.email).toBe("jane@example.com");
  });
});
