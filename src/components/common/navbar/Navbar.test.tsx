import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

const defaultMatchMedia = window.matchMedia;

afterEach(() => {
  Reflect.deleteProperty(window, "lenis");
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: defaultMatchMedia,
  });
});

const renderNavbar = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar services menu", () => {
  it("opens Services, exposes four destinations, closes outside, and closes with Escape", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const trigger = screen.getByRole("button", { name: /servicios/i });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /software a medida/i })).toHaveAttribute(
      "href",
      "/servicios/software",
    );
    expect(screen.getAllByRole("link")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textContent: expect.stringMatching(/sitios web/i) }),
        expect.objectContaining({ textContent: expect.stringMatching(/visibilidad/i) }),
        expect.objectContaining({ textContent: expect.stringMatching(/video y motion/i) }),
      ]),
    );

    await user.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("opens Services with ArrowDown and focuses the first destination", async () => {
    renderNavbar();
    const trigger = screen.getByRole("button", { name: /servicios \(menú\)/i });

    trigger.focus();
    expect(fireEvent.keyDown(trigger, { key: "ArrowDown" })).toBe(false);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(() =>
      expect(screen.getByRole("link", { name: /sitios web y landings/i })).toHaveFocus(),
    );
  });

  it("marks Services active on the software route", () => {
    renderNavbar("/servicios/software");
    expect(screen.getByRole("button", { name: /servicios/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("opens the mobile navigation, expands Services, and restores body scroll", async () => {
    const user = userEvent.setup();
    const lenis = {
      isStopped: false,
      stop: vi.fn(),
      start: vi.fn(),
    };
    Object.defineProperty(window, "lenis", {
      configurable: true,
      value: lenis,
    });
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: /abrir menú/i });

    await user.click(menuButton);
    expect(document.body).toHaveStyle({ overflow: "hidden" });
    expect(lenis.stop).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: /^servicios$/i }));
    expect(screen.getByRole("link", { name: /software a medida/i })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /cerrar menú/i }));
    expect(document.body.style.overflow).toBe("");
    expect(lenis.start).toHaveBeenCalledOnce();
  });

  it("closes the mobile navigation and restores scrolling when md becomes active", async () => {
    const user = userEvent.setup();
    const desktopQuery = Object.assign(new EventTarget(), {
      matches: false,
      media: "(min-width: 768px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }) as MediaQueryList & { matches: boolean };
    const lenis = {
      isStopped: false,
      stop: vi.fn(),
      start: vi.fn(),
    };
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn((query: string) =>
        query === "(min-width: 768px)" ? desktopQuery : defaultMatchMedia(query),
      ),
    });
    Object.defineProperty(window, "lenis", {
      configurable: true,
      value: lenis,
    });
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    act(() => {
      desktopQuery.matches = true;
      desktopQuery.dispatchEvent(new Event("change"));
    });

    await waitFor(() =>
      expect(screen.queryByRole("navigation", { name: /navegación móvil/i })).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(document.body.style.overflow).toBe("");
    expect(lenis.start).toHaveBeenCalledOnce();
  });

  it("closes the mobile navigation with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: /abrir menú/i });

    await user.click(menuButton);
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile Services accordion before closing the panel with Escape", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    const servicesButton = screen.getByRole("button", { name: /^servicios$/i });
    await user.click(servicesButton);
    expect(servicesButton).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: /cerrar menú/i })).toBeInTheDocument();
    expect(servicesButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: /software a medida/i })).not.toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveFocus();
    expect(screen.queryByRole("navigation", { name: /navegación móvil/i })).not.toBeInTheDocument();
  });

  it("keeps the visible close trigger in the mobile focus loop", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const openButton = screen.getByRole("button", { name: /abrir menú/i });
    await user.click(openButton);
    const closeButton = screen.getByRole("button", { name: /cerrar menú/i });
    const mobileNavigation = screen.getByRole("navigation", { name: /navegación móvil/i });
    const firstControl = within(mobileNavigation).getByRole("link", { name: "Inicio" });
    const lastControl = within(mobileNavigation).getByRole("link", { name: "Studio" });

    firstControl.focus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(lastControl).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(closeButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstControl).toHaveFocus();
  });
});
