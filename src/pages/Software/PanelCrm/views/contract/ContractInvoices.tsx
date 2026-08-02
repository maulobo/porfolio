import { useParams } from "react-router";
import { InvoicesTable } from "../Invoices";
import { BentoCard, BentoGrid } from "../../ui/primitives";

export default function ContractInvoices() {
  const { contractId = "" } = useParams();
  return (
    <BentoGrid>
      <BentoCard span={12}>
        <InvoicesTable contractId={contractId} />
      </BentoCard>
    </BentoGrid>
  );
}
