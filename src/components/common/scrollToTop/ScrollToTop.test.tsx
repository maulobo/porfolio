import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  afterEach(() => vi.restoreAllMocks());

  it("scrolls a Home service anchor into view after navigation", async () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as MediaQueryList);
    const target = document.createElement("section");
    target.id = "servicios-web";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={["/#servicios-web"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    target.remove();
  });

  it("uses instant scrolling for a Home anchor when reduced motion is preferred", async () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    const target = document.createElement("section");
    target.id = "servicios-web";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={["/#servicios-web"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
    target.remove();
  });
});
