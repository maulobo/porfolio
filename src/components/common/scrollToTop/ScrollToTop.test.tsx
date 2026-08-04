import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimatePresence, usePresence } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { Link, MemoryRouter, Route, Routes, useLocation } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "./ScrollToTop";

function DelayedExit({ children }: { children: ReactNode }) {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) return;

    const timeoutId = window.setTimeout(() => safeToRemove?.(), 50);
    return () => window.clearTimeout(timeoutId);
  }, [isPresent, safeToRemove]);

  return <>{children}</>;
}

function TransitioningRoutes({ onTargetScroll }: { onTargetScroll: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/servicios/software"
          element={
            <DelayedExit>
              <main>
                <p>Ruta Software</p>
                <Link to="/#servicios-web">Ir a sitios web</Link>
              </main>
            </DelayedExit>
          }
        />
        <Route
          path="/"
          element={
            <main>
              <section
                id="servicios-web"
                ref={(target) => {
                  if (target) target.scrollIntoView = onTargetScroll;
                }}
              >
                Sitios web
              </section>
            </main>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

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

  it("waits for the Home anchor while the previous route finishes exiting", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as MediaQueryList);

    const { getByRole } = render(
      <MemoryRouter initialEntries={["/servicios/software"]}>
        <ScrollToTop />
        <TransitioningRoutes onTargetScroll={scrollIntoView} />
      </MemoryRouter>,
    );

    await user.click(getByRole("link", { name: "Ir a sitios web" }));

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });
});
