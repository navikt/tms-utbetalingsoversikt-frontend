import ShowFilterButton from "@src/components/filter/showFilterButton/ShowFilterButton";
import { showFilterAtom } from "@src/store/filter";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logKnappKlikket = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logKnappKlikket: (...args: unknown[]) => logKnappKlikket(...args),
}));

afterEach(() => {
  logKnappKlikket.mockReset();
  showFilterAtom.set(false);
});

describe("ShowFilterButton", () => {
  it("should log the visible text 'Vis filter' when the filter is hidden", () => {
    render(<ShowFilterButton />);

    fireEvent.click(screen.getByRole("button", { name: "Vis filter" }));

    expect(logKnappKlikket).toHaveBeenCalledTimes(1);
    expect(logKnappKlikket).toHaveBeenCalledWith({
      tekst: "Vis filter",
      komponentId: "filter-button",
    });
  });

  it("should log the visible text 'Skjul filter' when the filter is shown", () => {
    showFilterAtom.set(true);
    render(<ShowFilterButton />);

    fireEvent.click(screen.getByRole("button", { name: "Skjul filter" }));

    expect(logKnappKlikket).toHaveBeenCalledWith({
      tekst: "Skjul filter",
      komponentId: "filter-button",
    });
  });
});
