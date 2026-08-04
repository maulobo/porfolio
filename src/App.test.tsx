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
});
