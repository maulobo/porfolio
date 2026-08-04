import { useState } from "react";
import { softwareContent } from "../softwareContent";

const SoftwareFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="software-faq">
      <div className="software-faq__intro">
        <p className="software-label">Preguntas frecuentes</p>
        <h2>Preguntas frecuentes</h2>
      </div>
      <div className="software-faq__items">
        {softwareContent.faq.map(({ question, answer }, index) => {
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
    </section>
  );
};

export default SoftwareFaq;
