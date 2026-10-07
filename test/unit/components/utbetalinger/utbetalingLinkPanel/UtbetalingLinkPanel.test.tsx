import UtbetalingLinkPanel from "@src/components/utbetalinger/utbetalingLinkPanel/UtbetalingLinkPanel";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logNavigere = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logNavigere: (...args: unknown[]) => logNavigere(...args),
}));

const baseProps = {
  id: "ut-123",
  beløp: 1234,
  dato: "2024-06-17",
  ytelse: "Dagpenger",
};

afterEach(() => {
  logNavigere.mockReset();
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

    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "Dagpenger",
      destinasjon: "/utbetalingsoversikt/utbetaling/ut-123",
      komponentId: "utbetaling-link-panel",
      lenkegruppe: "kommende",
    });
  });

  it("should log a 'tidligere' analytics event for a past payment", () => {
    render(<UtbetalingLinkPanel {...baseProps} nesteUtbetaling={false} />);

    fireEvent.click(screen.getByRole("link"));

    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "Dagpenger",
      destinasjon: "/utbetalingsoversikt/utbetaling/ut-123",
      komponentId: "utbetaling-link-panel",
      lenkegruppe: "tidligere",
    });
  });
});
