import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchWithTimeout } from "../fetchWithTimeout";

const TIMEOUT_MS = 8000;
const HEAD_INIT: RequestInit = { method: "HEAD" };
const okResponse = { ok: true } as unknown as Response;

describe("fetchWithTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("with AbortController available", () => {
    it("aborts and resolves null when the request outlasts the timeout", async () => {
      let requestSignal: AbortSignal | undefined;
      vi.stubGlobal(
        "fetch",
        vi.fn((_input, init: RequestInit) => {
          requestSignal = init.signal ?? undefined;
          return new Promise<Response>((_, reject) => {
            init.signal?.addEventListener("abort", () =>
              reject(new DOMException("Aborted", "AbortError"))
            );
          });
        })
      );

      const pending = fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS);
      await vi.advanceTimersByTimeAsync(TIMEOUT_MS);

      await expect(pending).resolves.toBeNull();
      expect(requestSignal?.aborted).toBe(true);
    });

    it("resolves the Response on success and clears the pending timer", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse));
      const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

      await expect(
        fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS)
      ).resolves.toBe(okResponse);
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it("resolves null on a network rejection", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new TypeError("network failure"))
      );

      await expect(
        fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS)
      ).resolves.toBeNull();
    });

    it("resolves null and clears the timer when fetch throws synchronously", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() => {
          throw new TypeError("sync throw");
        })
      );
      const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

      await expect(
        fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS)
      ).resolves.toBeNull();
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe("without AbortController", () => {
    beforeEach(() => {
      vi.stubGlobal("AbortController", undefined);
    });

    it("races a never-settling request to null within the timeout", async () => {
      const fetchMock = vi
        .fn()
        .mockReturnValue(new Promise<Response>(() => undefined));
      vi.stubGlobal("fetch", fetchMock);

      const pending = fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS);
      await vi.advanceTimersByTimeAsync(TIMEOUT_MS);

      await expect(pending).resolves.toBeNull();
      expect(fetchMock).toHaveBeenCalledWith("/head", HEAD_INIT);
    });

    it("resolves the Response when the untimed request succeeds", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse));

      await expect(
        fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS)
      ).resolves.toBe(okResponse);
    });
  });

  it("resolves null when fetch is undefined", async () => {
    vi.stubGlobal("fetch", undefined);

    await expect(
      fetchWithTimeout("/head", HEAD_INIT, TIMEOUT_MS)
    ).resolves.toBeNull();
  });
});
