import Utbetalinger from "@src/components/utbetalinger/Utbetalinger";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const logFeilmeldingForside = vi.fn();
vi.mock("@src/utils/client/analytics", () => ({
  logFeilmeldingForside: (...args: unknown[]) => logFeilmeldingForside(...args),
}));

const useSWR = vi.fn();
vi.mock("swr", () => ({
  default: (...args: unknown[]) => useSWR(...args),
}));

afterEach(() => {
  logFeilmeldingForside.mockReset();
  useSWR.mockReset();
});

describe("Utbetalinger", () => {
  it("should log the front page error when fetching payments fails", () => {
    useSWR.mockReturnValue({ data: undefined, isLoading: false, error: {} });

    render(<Utbetalinger />);

    const options = useSWR.mock.calls[0][2];
    expect(logFeilmeldingForside).not.toHaveBeenCalled();

    options.onError();

    expect(logFeilmeldingForside).toHaveBeenCalledTimes(1);
  });
});
