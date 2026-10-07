import PeriodeFilter from "@src/components/filter/periodeFilter/PeriodeFilter";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logFiltervalg = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logFiltervalg: (...args: unknown[]) => logFiltervalg(...args),
}));

afterEach(() => {
  logFiltervalg.mockReset();
});

describe("PeriodeFilter", () => {
  it("should log a 'filtervalg' event with the chosen period", () => {
    render(<PeriodeFilter />);

    fireEvent.click(screen.getByRole("button", { name: "Hittil i år" }));

    expect(logFiltervalg).toHaveBeenCalledTimes(1);
    expect(logFiltervalg).toHaveBeenCalledWith({
      kategori: "periode",
      filternavn: "Hittil i år",
      komponentId: "filter-periode",
    });
  });
});
