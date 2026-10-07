import NoUtbetalinger from "@src/components/utbetalinger/noUtbetalinger/NoUtbetalinger";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logNavigere = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logNavigere: (...args: unknown[]) => logNavigere(...args),
}));

vi.mock("@src/utils/client/urls", () => ({
  omUtbetalinger: "https://nav.no/om-utbetalinger",
}));

afterEach(() => {
  logNavigere.mockReset();
});

describe("NoUtbetalinger", () => {
  it("should explain that there are no payments in the period", () => {
    render(<NoUtbetalinger />);

    expect(
      screen.getByRole("heading", {
        name: "Du har ingen utbetalinger for denne perioden",
      }),
    ).toBeInTheDocument();
  });

  it("should link to more information about payments", () => {
    render(<NoUtbetalinger />);

    expect(
      screen.getByRole("link", { name: "mer om utbetalinger" }),
    ).toHaveAttribute("href", "https://nav.no/om-utbetalinger");
  });

  it("should log an analytics event when the info link is clicked", () => {
    render(<NoUtbetalinger />);

    fireEvent.click(screen.getByRole("link", { name: "mer om utbetalinger" }));

    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "mer om utbetalinger",
      destinasjon: "https://nav.no/om-utbetalinger",
      komponentId: "mer-om-utbetalig-link",
    });
  });
});
