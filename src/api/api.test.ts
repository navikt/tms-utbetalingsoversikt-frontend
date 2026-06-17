import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetcher } from "./api";

describe("fetcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should GET the path with credentials and return the parsed json", async () => {
    const payload = { hello: "world" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => payload,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetcher({ path: "/api/utbetalinger/alle" });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith("/api/utbetalinger/alle", {
      method: "GET",
      credentials: "include",
    });
  });

  it("should merge caller options over the defaults", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher({
      path: "/x",
      options: { headers: { Authorization: "Bearer t" } },
    });

    expect(fetchMock).toHaveBeenCalledWith("/x", {
      method: "GET",
      credentials: "include",
      headers: { Authorization: "Bearer t" },
    });
  });

  it("should throw when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetcher({ path: "/x" })).rejects.toThrow(
      "Fetch request failed",
    );
  });
});
