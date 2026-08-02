import { Link } from "react-router";
import { crmPath } from "../lib/routes";
import { BentoCard, EmptyState, PageHeader } from "../ui/primitives";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Sección no encontrada" />
      <BentoCard span={12}>
        <EmptyState
          title="Esa sección no existe dentro del panel de muestra."
          action={
            <Link to={crmPath()} className="font-semibold" style={{ color: "var(--crm-accent)" }}>
              Ir al Dashboard
            </Link>
          }
        />
      </BentoCard>
    </>
  );
}
