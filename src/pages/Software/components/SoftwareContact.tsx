import { softwarePageCopy } from "../softwareContent";

const { contact } = softwarePageCopy;

/** Cierre de la página: la vía de contacto directa, sin formulario de por medio. */
const SoftwareContact = () => (
  <section className="software-contact">
    <div className="software-contact__inner">
      <div>
        <h2>{contact.title}</h2>
        <p className="software-contact__body">{contact.body}</p>
        <a
          className="software-button software-button--contrast"
          href={contact.cta.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contact.cta.label}
        </a>
      </div>

      <ul className="software-channels">
        {contact.channels.map((channel) => (
          <li key={channel.label}>
            <span className="software-channels__label">{channel.label}</span>
            <a
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              {channel.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SoftwareContact;
