type SoftwareProcessProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { name: string; detail: string }[];
};

const SoftwareProcess = ({ eyebrow, title, body, steps }: SoftwareProcessProps) => (
  <section className="software-process">
    <p>{eyebrow}</p>
    <h2>{title}</h2>
    <p>{body}</p>
    <ol>
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
