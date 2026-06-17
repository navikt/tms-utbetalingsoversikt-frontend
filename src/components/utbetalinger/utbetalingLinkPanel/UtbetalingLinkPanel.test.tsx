import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import UtbetalingLinkPanel from "./UtbetalingLinkPanel";

const logEvent = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logEvent: (...args: unknown[]) => logEvent(...args),
}));

const baseProps = {
  id: "ut-123",
  beløp: 1234,
  dato: "2024-06-17",
  ytelse: "Dagpenger",
};

afterEach(() => {
  logEvent.mockReset();
});

describe("UtbetalingLinkPanel", () => {
  it("should link to the payment detail page", () => {
    render(<UtbetalingLinkPanel {...baseProps} nesteUtbetaling={false} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/utbetalingsoversikt/utbetaling/ut-123",
    );
  });

  it("should render the ytelse, readable date and formatted amount", () => {
    render(<UtbetalingLinkPanel {...baseProps} nesteUtbetaling={false} />);

    expect(screen.getByText("Dagpenger")).toBeInTheDocument();
    expect(screen.getByText("17. juni")).toBeInTheDocument();
    expect(screen.getByText(/1\s234 kr/)).toBeInTheDocument();
  });

  it("should log a 'kommende' analytics event for an upcoming payment", () => {
    render(<UtbetalingLinkPanel {...baseProps} nesteUtbetaling={true} />);

    fireEvent.click(screen.getByRole("link"));

    expect(logEvent).toHaveBeenCalledWith("utbetaling-link-panel", "kommende");
  });

  it("should log a 'tidligere' analytics event for a past payment", () => {
    render(<UtbetalingLinkPanel {...baseProps} nesteUtbetaling={false} />);

    fireEvent.click(screen.getByRole("link"));

    expect(logEvent).toHaveBeenCalledWith("utbetaling-link-panel", "tidligere");
  });
});
