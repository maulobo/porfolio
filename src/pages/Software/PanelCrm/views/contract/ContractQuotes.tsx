import { useParams } from "react-router";
import { QuotesTable } from "../Quotes";
import { BentoCard, BentoGrid } from "../../ui/primitives";

export default function ContractQuotes() {
  const { contractId = "" } = useParams();
  return (
    <BentoGrid>
      <BentoCard span={12}>
        <QuotesTable contractId={contractId} />
      </BentoCard>
    </BentoGrid>
  );
}
