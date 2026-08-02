import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  FileCheck2,
  FileSignature,
  FlaskConical,
  HardHat,
  LayoutDashboard,
  Menu,
  Moon,
  Receipt,
  Recycle,
  Settings,
  ShieldCheck,
  Sun,
  Truck,
  Users,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "./lib/cn";
import { crmPath } from "./lib/routes";
import { CrmThemeContext, type CrmTheme } from "./lib/theme";
import { currentUser, notifications, WORKSPACE } from "./data/mock";
import { Avatar, Chip } from "./ui/primitives";

/** Sidebar agrupado: con trece secciones, una lista plana se vuelve ilegible. */
const NAV_GROUPS = [
  {
    label: null,
    items: [{ label: "Dashboard", to: crmPath(), icon: LayoutDashboard, end: true }],
  },
  {
    label: "Operación",
    items: [
      { label: "Contratos", to: crmPath("contratos"), icon: FileSignature },
      { label: "Órdenes de trabajo", to: crmPath("ordenes"), icon: ClipboardList },
    ],
  },
  {
    label: "Activos",
    items: [
      { label: "Flota y equipos", to: crmPath("flota"), icon: Truck },
      { label: "Mantenimiento", to: crmPath("mantenimiento"), icon: Wrench },
      { label: "Habilitaciones", to: crmPath("habilitaciones"), icon: ShieldCheck },
    ],
  },
  {
    label: "Comercial",
    items: [
      { label: "Clientes", to: crmPath("clientes"), icon: UsersRound },
      { label: "Cotizaciones", to: crmPath("cotizaciones"), icon: FileCheck2 },
      { label: "Certificaciones", to: crmPath("certificaciones"), icon: ClipboardList },
      { label: "Facturación", to: crmPath("facturacion"), icon: Receipt },
    ],
  },
  {
    label: "Cumplimiento",
    items: [
      { label: "HSE / Seguridad", to: crmPath("hse"), icon: HardHat },
      { label: "Residuos", to: crmPath("residuos"), icon: Recycle },
    ],
  },
  {
    label: "Empresa",
    items: [
      { label: "Personal", to: crmPath("personal"), icon: Users },
      { label: "Ajustes", to: crmPath("ajustes"), icon: Settings },
    ],
  },
];

const THEME_KEY = "crm-demo-theme";

function useCrmTheme() {
  const [theme, setTheme] = useState<CrmTheme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

/* ── Notificaciones ─────────────────────────────────────────────────────── */

function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notificaciones (${unread} sin leer)`}
        aria-expanded={open}
        className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-[var(--crm-surface-2)]"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span
            className="absolute right-1 top-1 grid min-w-[16px] place-items-center rounded-full px-1 text-[0.6rem] font-bold"
            style={{ background: "var(--crm-danger)", color: "#fff" }}
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="crm-scroll absolute right-0 z-50 mt-2 max-h-[70vh] w-[min(340px,calc(100vw-2rem))] overflow-y-auto rounded-[var(--crm-radius)] border p-1.5 shadow-2xl"
          style={{ background: "var(--crm-surface)", borderColor: "var(--crm-border)" }}
        >
          <p className="px-2.5 py-2 text-sm font-bold">Notificaciones</p>
          {notifications.map((n) => (
            <Link
              key={n.id}
              to={n.link}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-[var(--crm-radius-sm)] px-2.5 py-2 transition-colors hover:bg-[var(--crm-surface-2)]",
                n.is_read && "opacity-55",
              )}
            >
              <p className={cn("text-[0.82rem]", n.is_read ? "font-medium" : "font-bold")}>{n.title}</p>
              <p className="mt-0.5 text-[0.78rem] text-[var(--crm-text-dim)]">{n.body}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ────────────────────────────────────────────────────────────── */

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-4">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-[10px] text-sm font-black"
          style={{ background: "var(--crm-accent)", color: "var(--crm-accent-text)" }}
        >
          {WORKSPACE.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] font-bold leading-tight">{WORKSPACE.name}</p>
          <p className="truncate text-xs text-[var(--crm-text-dim)]">{WORKSPACE.tagline}</p>
        </div>
      </div>

      <nav className="crm-scroll flex-1 overflow-y-auto px-2.5 py-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label ?? "root"} className={cn(gi > 0 && "mt-4")}>
            {group.label && (
              <p className="px-3 pb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--crm-text-faint)]">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={"end" in item ? item.end : undefined}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2.5 rounded-[var(--crm-radius-sm)] px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "font-bold"
                            : "font-medium text-[var(--crm-text-dim)] hover:bg-[var(--crm-surface-2)] hover:text-[var(--crm-text)]",
                        )
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              background: "color-mix(in srgb, var(--crm-accent) 15%, transparent)",
                              color: "var(--crm-accent)",
                            }
                          : undefined
                      }
                    >
                      <Icon size={17} className="shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t p-3" style={{ borderColor: "var(--crm-border)" }}>
        <div className="flex items-center gap-2.5">
          <Avatar name={currentUser.full_name} size={34} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{currentUser.full_name}</p>
            <p className="truncate text-xs text-[var(--crm-text-dim)]">{currentUser.position}</p>
          </div>
        </div>
        <Link
          to="/"
          className="mt-3 flex items-center gap-2 rounded-[var(--crm-radius-sm)] px-3 py-2 text-sm font-medium text-[var(--crm-text-dim)] transition-colors hover:bg-[var(--crm-surface-2)] hover:text-[var(--crm-text)]"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}

/* ── Shell ──────────────────────────────────────────────────────────────── */

export default function CrmLayout() {
  const { theme, toggle } = useCrmTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Cada cambio de ruta interna vuelve al principio del contenido.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [pathname]);

  // El menú móvil no debe sobrevivir a una navegación.
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <CrmThemeContext.Provider value={theme}>
    <div className="crm min-h-screen" data-crm-theme={theme}>
      <div className="flex min-h-screen">
        {/* Sidebar fijo en escritorio */}
        <aside
          className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r md:block"
          style={{ background: "var(--crm-surface)", borderColor: "var(--crm-border)" }}
        >
          <SidebarContent />
        </aside>

        {/* Drawer en móvil */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <aside
              className="absolute inset-y-0 left-0 w-[248px] border-r"
              style={{ background: "var(--crm-surface)", borderColor: "var(--crm-border)" }}
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className="sticky top-0 z-40 flex items-center gap-2 border-b px-3 py-2.5 backdrop-blur sm:px-5"
            style={{
              borderColor: "var(--crm-border)",
              background: "color-mix(in srgb, var(--crm-bg) 85%, transparent)",
            }}
          >
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Abrir menú"
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-[var(--crm-surface-2)] md:hidden"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>

            <Chip tone="info" className="gap-1.5">
              <FlaskConical size={12} />
              Demo con datos ficticios
            </Chip>

            <div className="flex-1" />

            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-[var(--crm-surface-2)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <NotificationsBell />
          </header>

          <main ref={mainRef} className="flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
    </CrmThemeContext.Provider>
  );
}
