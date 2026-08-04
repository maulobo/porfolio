import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

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

  it("marks Services active on the software route", () => {
    renderNavbar("/servicios/software");
    expect(screen.getByRole("button", { name: /servicios/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("opens the mobile navigation, expands Services, and restores body scroll", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: /abrir menú/i });

    await user.click(menuButton);
    expect(document.body).toHaveStyle({ overflow: "hidden" });
    await user.click(screen.getByRole("button", { name: /^servicios$/i }));
    expect(screen.getByRole("link", { name: /software a medida/i })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /cerrar menú/i }));
    expect(document.body.style.overflow).toBe("");
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

  it("cycles focus between the first and last mobile navigation controls", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    const mobileNavigation = screen.getByRole("navigation", { name: /navegación móvil/i });
    const firstControl = within(mobileNavigation).getByRole("link", { name: "Inicio" });
    const lastControl = within(mobileNavigation).getByRole("link", { name: "Studio" });

    firstControl.focus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(lastControl).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstControl).toHaveFocus();
  });
});
