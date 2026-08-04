import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Software from "./Software";

const wrapperDoubles = vi.hoisted(() => ({
  transition: vi.fn(({ children }: { children: ReactNode }) => <>{children}</>),
  footer: vi.fn((_props: { typeFooter?: string }) => <footer>SmartCloud Studio</footer>),
}));

vi.mock("../../components/common/transitionAnimate/TransitionAnimate", () => ({
  default: wrapperDoubles.transition,
}));

vi.mock("../../components/common/footerCustom/FooterCustom", () => ({
  FooterType: { FOOTERWORK: "FOOTERWORK" },
  default: wrapperDoubles.footer,
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/servicios/software"]}>
      <Software />
    </MemoryRouter>,
  );

describe("Software page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("presents the approved positioning", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La operación necesita su propio sistema.",
      }),
    ).toBeInTheDocument();
  });

  it("sets descriptive page metadata", () => {
    renderPage();
    expect(document.title).toBe("Software a medida | SmartCloud Studio");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Desarrollamos plataformas, paneles, automatizaciones e integraciones definidas alrededor de procesos reales, con experiencia, lógica y ejecución responsable.",
    );
  });

  it("uses a sequential heading hierarchy for the approved sections", () => {
    renderPage();

    expect(
      screen.getAllByRole("heading").map(({ tagName, textContent }) => ({
        level: tagName,
        text: textContent,
      })),
    ).toEqual([
      { level: "H1", text: "La operación necesita su propio sistema." },
      { level: "H2", text: "Cuando las herramientas existentes ya no acompañan el trabajo." },
      { level: "H2", text: "Un sistema definido alrededor del problema." },
      { level: "H2", text: "Decisiones claras en cada etapa." },
      { level: "H3", text: "Diagnóstico" },
      { level: "H3", text: "Definición" },
      { level: "H3", text: "Producción" },
      { level: "H3", text: "Pruebas" },
      { level: "H3", text: "Publicación" },
      { level: "H3", text: "Evolución" },
      { level: "H2", text: "La interfaz es solo una parte del sistema." },
      { level: "H2", text: "Conversemos sobre el sistema que necesitás construir." },
    ]);
  });

  it("renders the six approved process stages as an ordered list", () => {
    renderPage();
    const processSection = screen
      .getByRole("heading", { name: "Decisiones claras en cada etapa." })
      .closest("section");

    expect(processSection).not.toBeNull();
    const processList = within(processSection as HTMLElement).getByRole("list");

    expect(processList.tagName).toBe("OL");
    expect(
      within(processList)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual([
      "DiagnósticoObjetivos, usuarios, procesos y restricciones.",
      "DefiniciónAlcance, arquitectura, experiencia y plan.",
      "ProducciónDiseño, desarrollo e integraciones.",
      "PruebasFlujos, estados y escenarios de uso.",
      "PublicaciónPuesta en marcha y acompañamiento.",
      "EvoluciónDocumentación y mejoras siguientes.",
    ]);
  });

  it("renders the approved closing content and safe contact action", () => {
    renderPage();
    const closingSection = screen
      .getByRole("heading", { name: "Conversemos sobre el sistema que necesitás construir." })
      .closest("section");

    expect(closingSection).not.toBeNull();
    const closing = within(closingSection as HTMLElement);
    expect(
      closing.getByText(
        "No necesitás llegar con todo definido. Empezamos por entender el contexto, ordenar prioridades y proponer un punto de partida.",
      ),
    ).toBeInTheDocument();
    expect(closing.getByRole("link", { name: "Contanos tu proyecto" })).toHaveAttribute(
      "href",
      "https://wa.me/5492995831639",
    );
    expect(closing.getByRole("link", { name: "Contanos tu proyecto" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(closing.getByRole("link", { name: "Contanos tu proyecto" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("composes the transition and work footer boundaries", () => {
    renderPage();

    expect(
      wrapperDoubles.transition.mock.calls.some(
        ([props]) => (props as { children?: ReactNode }).children !== undefined,
      ),
    ).toBe(true);
    expect(
      wrapperDoubles.footer.mock.calls.some(
        ([props]) => (props as { typeFooter?: string }).typeFooter === "FOOTERWORK",
      ),
    ).toBe(true);
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
