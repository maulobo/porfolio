import { useParams } from "react-router";
import { CertificationsTable } from "../Certifications";
import { BentoCard, BentoGrid } from "../../ui/primitives";

export default function ContractCertifications() {
  const { contractId = "" } = useParams();
  return (
    <BentoGrid>
      <BentoCard span={12}>
        <CertificationsTable contractId={contractId} />
      </BentoCard>
    </BentoGrid>
  );
}
