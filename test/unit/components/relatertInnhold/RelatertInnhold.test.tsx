import RelatertInnhold from "@src/components/relatertInnhold/RelatertInnhold";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logNavigere = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logNavigere: (...args: unknown[]) => logNavigere(...args),
}));

vi.mock("@src/utils/client/urls", () => ({
  endreKontonummerUrl: "https://nav.no/endre-kontonummer",
  endreSkattekortUrl: "https://nav.no/endre-skattekort",
  frivilligSkattetrekkUrl: "https://nav.no/frivillig-skattetrekk",
  satserUrl: "https://nav.no/satser",
  sosialhjelpUrl: "https://nav.no/sosialhjelp",
  utbetalingsdatoerUrl: "https://nav.no/utbetalingsdatoer",
  årsoppgaverUrl: "https://nav.no/arsoppgaver",
}));

afterEach(() => {
  logNavigere.mockReset();
});

describe("RelatertInnhold", () => {
  it("should log a 'navigere' event with the clicked link's text and href", () => {
    render(<RelatertInnhold />);

    fireEvent.click(screen.getByRole("link", { name: "Satser" }));

    expect(logNavigere).toHaveBeenCalledTimes(1);
    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "Satser",
      destinasjon: "https://nav.no/satser",
      komponentId: "relatert-innhold-link",
    });
  });

  it("should use the href of the link that was clicked", () => {
    render(<RelatertInnhold />);

    fireEvent.click(screen.getByRole("link", { name: "Endre skattekort" }));

    expect(logNavigere).toHaveBeenCalledWith({
      lenketekst: "Endre skattekort",
      destinasjon: "https://nav.no/endre-skattekort",
      komponentId: "relatert-innhold-link",
    });
  });
});
