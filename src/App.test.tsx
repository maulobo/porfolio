import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AnimatedRoutes } from "./App";

vi.mock("./components/common/transitionAnimate/TransitionAnimate", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("./pages/Home/Home", () => ({ default: () => <main>Inicio</main> }));
vi.mock("./pages/Studio/Studio", () => ({ default: () => <main>Studio</main> }));
vi.mock("./pages/Works/Work", () => ({ default: () => <main>Proyectos</main> }));

describe("public routes", () => {
  it("renders the software service page at its public route", () => {
    render(
      <MemoryRouter initialEntries={["/servicios/software"]}>
        <AnimatedRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La operación necesita su propio sistema.",
      }),
    ).toBeInTheDocument();
  });

  it.each([
    ["/servicios/web", "Sitios web y landings"],
    ["/servicios/visibilidad", "Visibilidad en buscadores e IA"],
    ["/servicios/audiovisual", "Contenido audiovisual"],
  ])("renders the coming soon screen at %s", (path: string, name: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AnimatedRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Próximamente vas a poder ver esta sección.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /jugar mientras tanto/i })).toBeInTheDocument();
  });
});
