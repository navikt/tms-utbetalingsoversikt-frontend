import YtelserFilter from "@src/components/filter/ytelseFilter/YtelserFilter";
import { setYtelseFilter } from "@src/store/filter";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logFiltervalg = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logFiltervalg: (...args: unknown[]) => logFiltervalg(...args),
}));

afterEach(() => {
  logFiltervalg.mockReset();
  setYtelseFilter({});
});

describe("YtelserFilter", () => {
  it("should log a 'filtervalg' event with the chosen ytelse", () => {
    setYtelseFilter({ Dagpenger: false, Sykepenger: false });
    render(<YtelserFilter />);

    fireEvent.click(screen.getByRole("button", { name: "Dagpenger" }));

    expect(logFiltervalg).toHaveBeenCalledTimes(1);
    expect(logFiltervalg).toHaveBeenCalledWith({
      kategori: "ytelse",
      filternavn: "Dagpenger",
      komponentId: "filter-ytelse",
    });
  });
});
