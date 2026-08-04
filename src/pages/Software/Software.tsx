import { useEffect } from "react";
import FooterCustom, { FooterType } from "../../components/common/footerCustom/FooterCustom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import {
  SoftwareClosing,
  SoftwareFaq,
  SoftwareHero,
  SoftwareInfoSection,
  SoftwareProcess,
  SoftwareShowcase,
} from "./components";
import { softwareContent, softwarePageCopy } from "./softwareContent";
import "./software.css";

const Software = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content");
    const description = existingDescription ?? document.createElement("meta");

    if (!existingDescription) {
      description.name = "description";
      document.head.appendChild(description);
    }

    document.title = softwarePageCopy.metadata.title;
    description.content = softwarePageCopy.metadata.description;

    return () => {
      document.title = previousTitle;

      if (!existingDescription) {
        description.remove();
      } else if (previousDescription === null) {
        existingDescription.removeAttribute("content");
      } else {
        existingDescription.content = previousDescription;
      }
    };
  }, []);

  return (
    <TransitionAnimate>
      <main className="software-page">
        <SoftwareHero />
        <SoftwareInfoSection {...softwarePageCopy.useCases} items={softwareContent.useCases} />
        <SoftwareInfoSection
          {...softwarePageCopy.capabilities}
          items={softwareContent.capabilities}
          dark
        />
        <SoftwareShowcase />
        <SoftwareProcess {...softwarePageCopy.process} steps={softwareContent.process} />
        <SoftwareInfoSection {...softwarePageCopy.layers} items={softwareContent.layers} dark />
        <SoftwareFaq />
        <SoftwareClosing />
        <FooterCustom typeFooter={FooterType.FOOTERWORK} />
      </main>
    </TransitionAnimate>
  );
};

export default Software;
