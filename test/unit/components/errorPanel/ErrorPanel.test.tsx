import ErrorPanel from "@src/components/errorPanel/ErrorPanel";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logNavigere = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logNavigere: (...args: unknown[]) => logNavigere(...args),
}));

vi.mock("@src/utils/client/urls", () => ({
  baseUrl: "https://nav.no/utbetalingsoversikt",
}));

afterEach(() => {
  logNavigere.mockReset();
});

describe("ErrorPanel", () => {
  it("should log a 'navigere' event when the reload link is clicked", () => {
    render(<ErrorPanel isLandingsside={true} />);

    fireEvent.click(
      screen.getByRole("link", { name: "laste inn siden på nytt" }),
    );

    expect(logNavigere).toHaveBeenCalledTimes(1);
    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "laste inn siden på nytt",
      destinasjon: "https://nav.no/utbetalingsoversikt",
      komponentId: "error-panel",
    });
  });

  it("should not render a reload link outside the landing page", () => {
    render(<ErrorPanel isLandingsside={false} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
