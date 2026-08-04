type SoftwareInfoSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly string[];
  dark?: boolean;
};

const SoftwareInfoSection = ({
  eyebrow,
  title,
  body,
  items,
  dark = false,
}: SoftwareInfoSectionProps) => (
  <section className={dark ? "software-info-section software-info-section--dark" : "software-info-section"}>
    <p>{eyebrow}</p>
    <h2>{title}</h2>
    <p>{body}</p>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

export default SoftwareInfoSection;
