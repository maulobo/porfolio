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

const WHATSAPP = "https://wa.me/5492995831639";
const DEMO = "/software/panel-crm";

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
    const { container } = renderPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Software a medida para procesos reales.",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector(".software-eyebrow")?.textContent).toBe("Software a medida");
  });

  it("presents three complete product screens as one hero and two stories", () => {
    renderPage();

    const hero = screen
      .getByRole("heading", { level: 1, name: "Software a medida para procesos reales." })
      .closest("section");

    expect(hero).not.toBeNull();
    const heroScreens = within(hero as HTMLElement).getAllByRole("img");
    expect(heroScreens).toHaveLength(1);
    expect(heroScreens[0]).toHaveAttribute("src", "/software/1.png");
    expect(heroScreens[0]).toHaveAttribute("width", "2996");
    expect(heroScreens[0]).toHaveAttribute("height", "1540");
    expect(heroScreens[0]).toHaveAttribute("fetchpriority", "high");

    const contactAction = within(hero as HTMLElement).getByRole("link", {
      name: "Evaluar un proyecto",
    });
    expect(contactAction).toHaveAttribute("href", WHATSAPP);
    expect(contactAction).toHaveAttribute("target", "_blank");
    expect(contactAction).toHaveAttribute("rel", "noopener noreferrer");

    const demoAction = within(hero as HTMLElement).getByRole("link", { name: "Ver demostración" });
    expect(demoAction).toHaveAttribute("href", DEMO);
    expect(demoAction).toHaveAttribute("target", "_blank");
    expect(demoAction).toHaveAttribute("rel", "noopener noreferrer");

    const productScreens = screen.getAllByRole("img").filter((image) =>
      image.getAttribute("src")?.startsWith("/software/"),
    );
    expect(productScreens.map((image) => image.getAttribute("src"))).toEqual([
      "/software/1.png",
      "/software/2.png",
      "/software/3.png",
    ]);
    expect(productScreens.every((image) => image.getAttribute("alt")?.trim())).toBe(true);
  });

  it("captions every product screen", () => {
    const { container } = renderPage();

    expect(
      Array.from(container.querySelectorAll(".software-figure__caption")).map(
        (caption) => caption.textContent,
      ),
    ).toEqual([
      "Panel operativo con indicadores, actividad reciente y accesos de gestión",
      "Vista de seguimiento comercial con oportunidades, responsables y estados.",
      "Vista de gestión operativa con equipos, disponibilidad y estados de trabajo.",
    ]);
  });

  it("connects each secondary screen to a concrete product capability", () => {
    renderPage();

    const commercialStory = screen
      .getByRole("heading", { name: "Seguimiento comercial en un mismo lugar." })
      .closest("article");
    const operationsStory = screen
      .getByRole("heading", { name: "Información operativa disponible para cada equipo." })
      .closest("article");

    expect(commercialStory).not.toBeNull();
    expect(within(commercialStory as HTMLElement).getByRole("img")).toHaveAttribute(
      "src",
      "/software/2.png",
    );
    expect(operationsStory).not.toBeNull();
    expect(within(operationsStory as HTMLElement).getByRole("img")).toHaveAttribute(
      "src",
      "/software/3.png",
    );

    const demoLinks = screen.getAllByRole("link", { name: /demostración/i });
    expect(demoLinks).toHaveLength(2);
    expect(demoLinks.every((link) => link.getAttribute("href") === DEMO)).toBe(true);
  });

  it("opens one FAQ answer and reports its expanded state", async () => {
    const user = userEvent.setup();
    renderPage();
    const question = screen.getByRole("button", { name: "¿Cómo se define el alcance?" });

    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(question).toHaveAttribute("aria-controls", "software-faq-panel-1");
    expect(question).toHaveAttribute("id", "software-faq-trigger-1");
    const questionPanel = document.getElementById("software-faq-panel-1");
    expect(questionPanel).toHaveAttribute("role", "region");
    expect(questionPanel).toHaveAttribute("aria-labelledby", "software-faq-trigger-1");
    expect(questionPanel).toHaveAttribute("hidden");
    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/comenzamos con una etapa de diagnóstico/i)).toBeVisible();
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
      "Desarrollamos plataformas, paneles de gestión e integraciones que responden a la operación de cada organización, con experiencia de usuario, lógica de negocio, datos e infraestructura en una misma solución.",
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
      { level: "H1", text: "Software a medida para procesos reales." },
      { level: "H2", text: "Cuando las herramientas existentes dejan de acompañar la operación." },
      { level: "H3", text: "Información dispersa" },
      { level: "H3", text: "Tareas repetitivas" },
      { level: "H3", text: "Falta de trazabilidad" },
      { level: "H3", text: "Procesos específicos" },
      { level: "H2", text: "Una solución definida según el contexto." },
      { level: "H3", text: "Paneles de gestión" },
      { level: "H3", text: "Plataformas internas" },
      { level: "H3", text: "Dashboards" },
      { level: "H3", text: "Integraciones" },
      { level: "H3", text: "Automatizaciones" },
      { level: "H3", text: "Aplicaciones web" },
      { level: "H2", text: "Una interfaz para comprender y gestionar la operación." },
      { level: "H3", text: "Seguimiento comercial en un mismo lugar." },
      { level: "H3", text: "Información operativa disponible para cada equipo." },
      { level: "H2", text: "Un proceso claro para decisiones complejas." },
      { level: "H3", text: "Diagnóstico" },
      { level: "H3", text: "Definición" },
      { level: "H3", text: "Producción" },
      { level: "H3", text: "Pruebas" },
      { level: "H3", text: "Puesta en marcha" },
      { level: "H3", text: "Evolución" },
      { level: "H2", text: "La interfaz es una parte del sistema." },
      { level: "H3", text: "UX/UI" },
      { level: "H3", text: "Backend" },
      { level: "H3", text: "Datos" },
      { level: "H3", text: "Integraciones" },
      { level: "H3", text: "Infraestructura" },
      { level: "H3", text: "Continuidad" },
      { level: "H2", text: "Preguntas frecuentes" },
      { level: "H3", text: "¿Qué tipo de software desarrollan?" },
      { level: "H3", text: "¿Cómo se define el alcance?" },
      { level: "H3", text: "¿Pueden integrarse con sistemas existentes?" },
      { level: "H3", text: "¿Es necesario reemplazar todas las herramientas actuales?" },
      { level: "H3", text: "¿Qué ocurre después de la publicación?" },
      { level: "H3", text: "¿Pueden trabajar sobre un software ya desarrollado?" },
      { level: "H2", text: "Conversemos sobre el sistema que necesitás construir." },
      { level: "H2", text: "Hablemos de tu proyecto." },
    ]);
  });

  it("renders the six approved process stages as an ordered list", () => {
    renderPage();
    const processSection = screen
      .getByRole("heading", { name: "Un proceso claro para decisiones complejas." })
      .closest("section");

    expect(processSection).not.toBeNull();
    const processList = within(processSection as HTMLElement).getByRole("list");

    expect(processList.tagName).toBe("OL");
    expect(
      within(processList)
        .getAllByRole("listitem")
        .map((item) => item.querySelector("h3")?.textContent),
    ).toEqual([
      "Diagnóstico",
      "Definición",
      "Producción",
      "Pruebas",
      "Puesta en marcha",
      "Evolución",
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
        "No es necesario llegar con todas las funcionalidades definidas. Empezamos por comprender el contexto, ordenar prioridades y establecer un punto de partida viable.",
      ),
    ).toBeInTheDocument();

    const cta = closing.getByRole("link", { name: "Contanos tu proyecto" });
    expect(cta).toHaveAttribute("href", WHATSAPP);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("exposes the direct contact channels", () => {
    renderPage();
    const contactSection = screen
      .getByRole("heading", { name: "Hablemos de tu proyecto." })
      .closest("section");

    expect(contactSection).not.toBeNull();
    const contact = within(contactSection as HTMLElement);

    expect(contact.getByRole("link", { name: "Escribinos" })).toHaveAttribute("href", WHATSAPP);
    expect(contact.getByRole("link", { name: "+54 9 2995 83-1639" })).toHaveAttribute(
      "href",
      WHATSAPP,
    );

    const email = contact.getByRole("link", { name: "contacto@smartcloudstudio.com" });
    expect(email).toHaveAttribute("href", "mailto:contacto@smartcloudstudio.com");
    // Un mailto no abre pestaña: no debe llevar target ni rel.
    expect(email).not.toHaveAttribute("target");
    expect(email).not.toHaveAttribute("rel");
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
