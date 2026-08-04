import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("labels all screenshots as a software example and opens the demo separately", () => {
    renderPage();

    const hero = screen
      .getByRole("heading", { level: 1, name: "La operación necesita su propio sistema." })
      .closest("section");

    expect(hero).not.toBeNull();
    const heroScreens = (hero as HTMLElement).querySelectorAll("img");
    expect(heroScreens).toHaveLength(2);
    expect(heroScreens[0]).toHaveAttribute("src", "/software/1.png");
    expect(heroScreens[0]).toHaveAttribute("width", "2996");
    expect(heroScreens[0]).toHaveAttribute("height", "1540");
    expect(heroScreens[0]).toHaveAttribute("fetchpriority", "high");
    expect(heroScreens[1]).toHaveAttribute("src", "/software/2.png");
    expect(heroScreens[1]).toHaveAttribute("width", "2998");
    expect(heroScreens[1]).toHaveAttribute("height", "1548");
    expect(heroScreens[1]).toHaveAttribute("fetchpriority", "high");
    const contactAction = within(hero as HTMLElement).getByRole("link", {
      name: "Iniciar un proyecto",
    });
    expect(contactAction).toHaveAttribute("href", "https://wa.me/5492995831639");
    expect(contactAction).toHaveAttribute("target", "_blank");
    expect(contactAction).toHaveAttribute("rel", "noopener noreferrer");
    const demoAction = within(hero as HTMLElement).getByRole("link", {
      name: "Ver demostración",
    });
    expect(demoAction).toHaveAttribute("href", "/software/panel-crm");
    expect(demoAction).toHaveAttribute("target", "_blank");
    expect(demoAction).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByRole("img", { name: "Resumen operativo" })).toHaveAttribute(
      "src",
      "/software/1.png",
    );
    expect(screen.getByRole("img", { name: "Seguimiento comercial" })).toHaveAttribute(
      "src",
      "/software/2.png",
    );
    expect(screen.getByRole("img", { name: "Gestión de equipos" })).toHaveAttribute(
      "src",
      "/software/3.png",
    );
    expect(screen.getByText("Ejemplo de software")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Abrir demostración" })).toMatchObject({
      target: "_blank",
      rel: expect.stringContaining("noopener"),
    });
  });

  it("opens one FAQ answer and reports its expanded state", async () => {
    const user = userEvent.setup();
    renderPage();
    const question = screen.getByRole("button", {
      name: "¿Cómo se define el alcance?",
    });

    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(question).toHaveAttribute("aria-controls", "software-faq-panel-1");
    expect(question).toHaveAttribute("id", "software-faq-trigger-1");
    const questionPanel = document.getElementById("software-faq-panel-1");
    expect(questionPanel).toHaveAttribute("role", "region");
    expect(questionPanel).toHaveAttribute("aria-labelledby", "software-faq-trigger-1");
    expect(questionPanel).toHaveAttribute("hidden");
    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/primero relevamos objetivos/i)).toBeVisible();
    expect(questionPanel).not.toHaveAttribute("hidden");

    const firstQuestion = screen.getByRole("button", {
      name: "¿Qué tipo de software desarrollan?",
    });
    const firstPanel = document.getElementById("software-faq-panel-0");
    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    expect(firstPanel).not.toHaveAttribute("hidden");
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(questionPanel).toHaveAttribute("hidden");

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(firstPanel).toHaveAttribute("hidden");
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
      { level: "H2", text: "Una interfaz para ver, decidir y actuar." },
      { level: "H2", text: "Decisiones claras en cada etapa." },
      { level: "H3", text: "Diagnóstico" },
      { level: "H3", text: "Definición" },
      { level: "H3", text: "Producción" },
      { level: "H3", text: "Pruebas" },
      { level: "H3", text: "Publicación" },
      { level: "H3", text: "Evolución" },
      { level: "H2", text: "La interfaz es solo una parte del sistema." },
      { level: "H2", text: "Preguntas frecuentes" },
      { level: "H3", text: "¿Qué tipo de software desarrollan?" },
      { level: "H3", text: "¿Cómo se define el alcance?" },
      { level: "H3", text: "¿Pueden integrarse con sistemas existentes?" },
      { level: "H3", text: "¿Qué ocurre después de publicar?" },
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
