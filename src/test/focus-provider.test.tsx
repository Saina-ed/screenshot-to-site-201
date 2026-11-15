import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FocusProvider, useFocus } from "@/features/focus/store";
import type { FocusStore } from "@/features/focus/context";

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Shared learning state", () => {
  it("keeps consumers connected after the provider rerenders", async () => {
    let state: FocusStore | undefined;
    function Consumer() { state = useFocus(); return null; }
    const view = render(<FocusProvider><Consumer /></FocusProvider>);
    expect(state?.documents).toHaveLength(4);
    act(() => state?.update(s => ({ ...s, tracking: false })));
    view.rerender(<FocusProvider><Consumer /></FocusProvider>);
    expect(state?.tracking).toBe(false);
    expect(state?.documents).toHaveLength(4);
  });
});