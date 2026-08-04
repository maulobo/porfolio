type SoftwareProcessProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { name: string; detail: string }[];
};

const SoftwareProcess = ({ eyebrow, title, body, steps }: SoftwareProcessProps) => (
  <section className="software-process">
    <div className="software-process__intro">
      <p className="software-label">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="software-section-copy">{body}</p>
    </div>
    <ol className="software-process__steps grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {steps.map(({ name, detail }) => (
        <li key={name}>
          <h3>{name}</h3>
          <p>{detail}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default SoftwareProcess;
