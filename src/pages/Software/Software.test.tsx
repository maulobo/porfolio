import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Software from "./Software";

vi.mock("../../components/common/transitionAnimate/TransitionAnimate", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("../../components/common/footerCustom/FooterCustom", () => ({
  FooterType: { FOOTERWORK: "FOOTERWORK" },
  default: () => <footer>SmartCloud Studio</footer>,
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/servicios/software"]}>
      <Software />
    </MemoryRouter>,
  );

describe("Software page", () => {
  it("presents the approved positioning and complete service structure", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La operación necesita su propio sistema.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cuando las herramientas existentes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /un sistema definido alrededor del problema/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /decisiones claras en cada etapa/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /la interfaz es solo una parte/i })).toBeInTheDocument();
    expect(screen.getByText("Paneles de gestión")).toBeInTheDocument();
    expect(screen.getByText("Publicación")).toBeInTheDocument();
  });

  it("sets descriptive page metadata", () => {
    renderPage();
    expect(document.title).toBe("Software a medida | SmartCloud Studio");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("plataformas, paneles, automatizaciones e integraciones"),
    );
  });

  it("restores pre-existing page metadata when it unmounts", () => {
    document.title = "Original title";
    const description = document.createElement("meta");
    description.name = "description";
    description.content = "Original description";
    document.head.appendChild(description);

    const { unmount } = renderPage();

    unmount();

    expect(document.title).toBe("Original title");
    expect(description).toHaveAttribute("content", "Original description");
    description.remove();
  });

  it("removes a temporary description when it unmounts", () => {
    expect(document.querySelector('meta[name="description"]')).toBeNull();

    const { unmount } = renderPage();

    unmount();

    expect(document.querySelector('meta[name="description"]')).toBeNull();
  });
});
