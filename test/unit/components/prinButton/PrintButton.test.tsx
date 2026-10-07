import PrintButton from "@src/components/prinButton/PrintButton";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const logKnappKlikket = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logKnappKlikket: (...args: unknown[]) => logKnappKlikket(...args),
}));

beforeEach(() => {
  window.print = vi.fn();
});

afterEach(() => {
  logKnappKlikket.mockReset();
});

describe("PrintButton", () => {
  it("should print and log a 'knapp klikket' event with the button text", () => {
    render(<PrintButton />);

    fireEvent.click(screen.getByRole("button", { name: "Skriv ut" }));

    expect(window.print).toHaveBeenCalledTimes(1);
    expect(logKnappKlikket).toHaveBeenCalledTimes(1);
    expect(logKnappKlikket).toHaveBeenCalledWith({
      tekst: "Skriv ut",
      komponentId: "skriv-ut-utbetaling",
    });
  });
});
