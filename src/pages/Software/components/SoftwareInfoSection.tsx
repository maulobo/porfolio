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
  <section
    className={
      dark
        ? "software-info-section software-info-section--dark"
        : "software-info-section"
    }
  >
    <div className="software-info-section__grid grid grid-cols-1 lg:grid-cols-[0.34fr_0.66fr]">
      <p className="software-label">{eyebrow}</p>
      <div className="software-info-section__content">
        <h2>{title}</h2>
        <p className="software-section-copy">{body}</p>
        <ul className="software-chip-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default SoftwareInfoSection;
