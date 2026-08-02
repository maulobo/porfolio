import { NavLink } from "react-router";
import { cn } from "../lib/cn";

const tabBase =
  "shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--crm-accent)]";

const activeStyle = { borderColor: "var(--crm-accent)", color: "var(--crm-accent)" };
const idleStyle = { borderColor: "transparent" };

function TabsBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="crm-scroll mb-5 overflow-x-auto border-b" style={{ borderColor: "var(--crm-border)" }}>
      <div className="flex min-w-max gap-1">{children}</div>
    </div>
  );
}

/** Tabs controladas por estado (no cambian la URL). */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <TabsBar>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(tabBase, active ? "font-bold" : "font-medium text-[var(--crm-text-dim)] hover:text-[var(--crm-text)]")}
            style={active ? activeStyle : idleStyle}
          >
            {item.label}
          </button>
        );
      })}
    </TabsBar>
  );
}

/** Tabs que navegan a subrutas reales, para que cada vista sea enlazable. */
export function LinkTabs({ items }: { items: { to: string; label: string; end?: boolean }[] }) {
  return (
    <TabsBar>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(tabBase, isActive ? "font-bold" : "font-medium text-[var(--crm-text-dim)] hover:text-[var(--crm-text)]")
          }
          style={({ isActive }) => (isActive ? activeStyle : idleStyle)}
        >
          {item.label}
        </NavLink>
      ))}
    </TabsBar>
  );
}
