import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import FooterCustom, { FooterType } from "../../components/common/footerCustom/FooterCustom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import { gridScanPreset } from "../../components/common/gridScan/gridScanPreset";
import { SoftwareSectionHead } from "../Software/components";
import { webPageCopy } from "./webContent";
import "../Software/software.css";
import "./web.css";

/** El WebGL del fondo se descarga sólo al entrar a esta ruta. */
const GridScan = lazy(() => import("../../components/common/gridScan/GridScan"));

const { hero, approach, offer, process, experience, contact } = webPageCopy;

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const WebHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? staticVariants : heroVariants;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.section
      className="software-hero web-hero"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
    >
      <div className="software-hero__content">
        <motion.p className="software-eyebrow" variants={variants} transition={transition}>
          {hero.eyebrow}
        </motion.p>
        <motion.h1 className="software-hero__title" variants={variants} transition={transition}>
          {hero.title}
        </motion.h1>
        <motion.p className="software-hero__body" variants={variants} transition={transition}>
          {hero.body}
        </motion.p>
        <motion.div className="software-hero__actions" variants={variants} transition={transition}>
          <a
            className="software-button software-button--contrast"
            href={hero.primary.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.primary.label}
          </a>
          <Link className="software-button web-button--ghost" to={hero.secondary.to}>
            {hero.secondary.label}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ServiciosWeb = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content");
    const description = existingDescription ?? document.createElement("meta");

    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }

    document.title = webPageCopy.metadata.title;
    description.content = webPageCopy.metadata.description;

    return () => {
      document.title = previousTitle;

      if (!existingDescription) {
        description.remove();
      } else if (previousDescription == null) {
        existingDescription.removeAttribute("content");
      } else {
        existingDescription.content = previousDescription;
      }
    };
  }, []);

  return (
    <TransitionAnimate>
      <main className="software-page web-page">
        {/*
          Un solo GridScan fijo detrás de toda la ruta: las secciones son
          transparentes y el fondo sigue igual durante todo el scroll. Alto lvh
          para que la barra del navegador en el celular no redimensione el canvas.
        */}
        <div className="web-page__background" aria-hidden="true">
          <Suspense fallback={null}>
            <GridScan {...gridScanPreset} />
          </Suspense>
        </div>

        <WebHero />

        <section className="software-section">
          <div className="software-section__inner">
            <SoftwareSectionHead title={approach.title} body={approach.body} shape="one" />
          </div>
        </section>

        <section className="software-section">
          <div className="software-section__inner">
            <SoftwareSectionHead title={offer.title} body={offer.body} shape="two" />

            <div className="software-grid software-grid--four">
              {offer.items.map((item) => (
                <article key={item.title} className="software-grid__cell">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="software-section">
          <div className="software-section__inner">
            <SoftwareSectionHead title={process.title} body={process.body} shape="three" />

            <ul className="web-steps">
              {process.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="software-section">
          <div className="software-section__inner">
            <SoftwareSectionHead title={experience.title} body={experience.body} shape="one" />
          </div>
        </section>

        <section className="software-contact web-contact">
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

        <FooterCustom typeFooter={FooterType.FOOTERWORK} />
      </main>
    </TransitionAnimate>
  );
};

export default ServiciosWeb;
