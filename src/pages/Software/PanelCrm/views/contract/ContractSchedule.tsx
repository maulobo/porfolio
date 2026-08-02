import { useParams } from "react-router";
import { SCHEDULE_STATUS_LABEL } from "../../data/labels";
import { schedulesOfContract, workOrdersOfContract } from "../../data/selectors";
import { daysTo, deadlineColor, fmtDate, relativeDays } from "../../lib/format";
import { BentoCard, BentoGrid, ColorDot, Divider, EmptyState, StatusChip } from "../../ui/primitives";

export default function ContractSchedule() {
  const { contractId = "" } = useParams();
  const schedules = schedulesOfContract(contractId);
  const orders = workOrdersOfContract(contractId);

  if (!schedules.length) {
    return <EmptyState title="Este contrato todavía no tiene programación cargada." />;
  }

  return (
    <BentoGrid>
      {schedules.map((s) => {
        const d = daysTo(s.end_date);
        const count = orders.filter((o) => o.schedule_id === s.id).length;
        const hours = orders
          .filter((o) => o.schedule_id === s.id)
          .reduce((a, o) => a + (o.estimated_hours ?? 0), 0);

        return (
          <BentoCard key={s.id} span={6}>
            <div className="flex items-center gap-2.5">
              <ColorDot color={s.status === "closed" ? "grey" : deadlineColor(s.end_date)} />
              <h3 className="min-w-0 flex-1 truncate text-base font-bold">{s.name}</h3>
              <StatusChip value={s.status} label={SCHEDULE_STATUS_LABEL[s.status]} />
            </div>

            <p className="mt-2 text-sm text-[var(--crm-text-dim)]">{s.goal}</p>

            <Divider className="my-3" />

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                {fmtDate(s.start_date)} → {fmtDate(s.end_date)}
              </span>
              <span className="text-[var(--crm-text-dim)]">
                {s.status === "closed" ? "Cerrada" : relativeDays(d)} · {count}{" "}
                {count === 1 ? "orden" : "órdenes"}
                {hours > 0 && ` · ${hours} h`}
              </span>
            </div>
          </BentoCard>
        );
      })}
    </BentoGrid>
  );
}
