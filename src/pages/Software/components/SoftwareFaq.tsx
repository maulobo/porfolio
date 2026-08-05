import { useState } from "react";
import { SoftwareShapeMark } from "./SoftwareSectionHead";
import { softwarePageCopy } from "../softwareContent";

const { faq } = softwarePageCopy;

const SoftwareFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="software-section">
      <div className="software-section__inner">
        <div className="software-head">
          <SoftwareShapeMark shape="three" />
          <h2 className="software-head__title">{faq.title}</h2>
        </div>

        <div className="software-faq__items">
          {faq.items.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const triggerId = `software-faq-trigger-${index}`;
            const panelId = `software-faq-panel-${index}`;

            return (
              <article key={question} className="software-faq__item">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={triggerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="software-faq__trigger"
                  >
                    {question}
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="software-faq__panel"
                >
                  <p>{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftwareFaq;
