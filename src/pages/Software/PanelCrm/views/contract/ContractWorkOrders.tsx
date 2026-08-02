import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, Clock3, GripVertical, Truck } from "lucide-react";
import { PRIORITY_LABEL } from "../../data/labels";
import {
  columnsOfContract,
  getEquipment,
  getPerson,
  workOrdersOfContract,
} from "../../data/selectors";
import type { WorkOrder, WorkOrderColumn } from "../../data/types";
import { deadlineColor, fmtDate } from "../../lib/format";
import { Avatar, Chip, ColorDot, EmptyState, StatusChip } from "../../ui/primitives";

/* ── Card ───────────────────────────────────────────────────────────────── */

function WorkOrderCard({ order, dragging = false }: { order: WorkOrder; dragging?: boolean }) {
  const assignee = getPerson(order.assignee_id);
  const eq = getEquipment(order.equipment_id);

  return (
    <article
      className="rounded-[var(--crm-radius-sm)] border p-3 transition-colors"
      style={{
        background: "var(--crm-surface)",
        borderColor: dragging ? "var(--crm-accent)" : "var(--crm-border)",
        boxShadow: dragging ? "0 12px 28px rgba(0,0,0,.35)" : undefined,
      }}
    >
      <div className="flex items-start gap-1.5">
        <GripVertical size={14} className="mt-0.5 shrink-0 text-[var(--crm-text-faint)]" />
        <div className="min-w-0">
          <p className="font-mono text-[0.68rem] font-bold" style={{ color: "var(--crm-accent)" }}>
            {order.code}
          </p>
          <p className="mt-0.5 text-sm font-semibold leading-snug">{order.title}</p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-[22px]">
        <StatusChip value={order.priority} label={PRIORITY_LABEL[order.priority]} />

        {eq && (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--crm-text-dim)]">
            <Truck size={12} />
            <span className="font-mono">{eq.internal_code}</span>
          </span>
        )}

        {order.due_date && (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--crm-text-dim)]">
            <ColorDot color={deadlineColor(order.due_date)} title={`Vence ${fmtDate(order.due_date)}`} />
            <CalendarDays size={12} />
            {fmtDate(order.due_date)}
          </span>
        )}

        {order.estimated_hours != null && (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--crm-text-dim)]">
            <Clock3 size={12} />
            {order.estimated_hours}h
          </span>
        )}

        <span className="flex-1" />
        {assignee && <Avatar name={assignee.full_name} size={24} />}
      </div>
    </article>
  );
}

function SortableWorkOrderCard({ order }: { order: WorkOrder }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: order.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-grab touch-none select-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--crm-accent)]"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
      }}
    >
      <WorkOrderCard order={order} />
    </div>
  );
}

/* ── Columna ────────────────────────────────────────────────────────────── */

function BoardColumn({ column, orders }: { column: WorkOrderColumn; orders: WorkOrder[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="flex w-[280px] shrink-0 flex-col gap-3 rounded-[var(--crm-radius)] border p-3 transition-colors"
      style={{
        background: "var(--crm-surface-2)",
        borderColor: isOver ? "var(--crm-accent)" : "var(--crm-border)",
      }}
    >
      <div className="flex items-center gap-2 px-0.5">
        <h3 className="text-sm font-bold">{column.name}</h3>
        <Chip>{orders.length}</Chip>
      </div>

      <SortableContext items={orders.map((o) => o.id)} strategy={verticalListSortingStrategy}>
        <div className="flex min-h-[60px] flex-1 flex-col gap-2.5">
          {orders.map((o) => (
            <SortableWorkOrderCard key={o.id} order={o} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

/* ── Board ──────────────────────────────────────────────────────────────── */

export default function ContractWorkOrders() {
  const { contractId = "" } = useParams();
  const columns = useMemo(() => columnsOfContract(contractId), [contractId]);

  /**
   * El tablero de la demo vive en memoria: arrastrar reordena el estado local y
   * se pierde al recargar. En el producto real cada movimiento persiste y queda
   * registrado en el historial de la orden.
   */
  const [orders, setOrders] = useState<WorkOrder[]>(() => workOrdersOfContract(contractId));
  useEffect(() => setOrders(workOrdersOfContract(contractId)), [contractId]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const byColumn = useMemo(() => {
    const map = new Map<string, WorkOrder[]>();
    columns.forEach((c) => map.set(c.id, []));
    [...orders]
      .sort((a, b) => a.position - b.position)
      .forEach((o) => map.get(o.column_id)?.push(o));
    return map;
  }, [columns, orders]);

  const activeOrder = orders.find((o) => o.id === activeId) ?? null;

  /** Un id puede ser el de una columna (soltar en vacío) o el de una orden. */
  const columnOf = (id: string): string | null => {
    if (columns.some((c) => c.id === id)) return id;
    return orders.find((o) => o.id === id)?.column_id ?? null;
  };

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const from = columnOf(String(active.id));
    const to = columnOf(String(over.id));
    if (!from || !to || from === to) return;
    setOrders((prev) => prev.map((o) => (o.id === active.id ? { ...o, column_id: to } : o)));
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const colId = columnOf(String(over.id));
    if (!colId) return;

    setOrders((prev) => {
      const moved = prev.map((o) => (o.id === active.id ? { ...o, column_id: colId } : o));
      const dragged = moved.find((o) => o.id === active.id);
      if (!dragged) return prev;

      // Reinsertamos la orden donde se soltó y renumeramos la columna destino.
      const rest = moved
        .filter((o) => o.column_id === colId && o.id !== active.id)
        .sort((a, b) => a.position - b.position);
      const overIndex = rest.findIndex((o) => o.id === over.id);
      rest.splice(overIndex >= 0 ? overIndex : rest.length, 0, dragged);

      return moved.map((o) => {
        if (o.column_id !== colId) return o;
        const idx = rest.findIndex((r) => r.id === o.id);
        return idx >= 0 ? { ...o, position: idx } : o;
      });
    });
  };

  if (!columns.length) {
    return <EmptyState title="Este contrato no tiene tablero de órdenes configurado." />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="crm-scroll flex items-stretch gap-3 overflow-x-auto pb-3">
        {columns.map((c) => (
          <BoardColumn key={c.id} column={c} orders={byColumn.get(c.id) ?? []} />
        ))}
      </div>

      <DragOverlay>{activeOrder ? <WorkOrderCard order={activeOrder} dragging /> : null}</DragOverlay>

      <p className="mt-1 text-xs text-[var(--crm-text-dim)]">
        Arrastrá las órdenes entre columnas para mover su estado. Al ser una muestra, los cambios se
        pierden al recargar la página.
      </p>
    </DndContext>
  );
}
