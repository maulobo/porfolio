import { useEffect } from "react";
import FooterCustom, { FooterType } from "../../components/common/footerCustom/FooterCustom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import {
  SoftwareClosing,
  SoftwareContact,
  SoftwareFaq,
  SoftwareHero,
  SoftwareProcess,
  SoftwareShowcase,
  SoftwareTopics,
} from "./components";
import { softwarePageCopy } from "./softwareContent";
import "./software.css";

const { problem, solution, layers } = softwarePageCopy;

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
      } else if (previousDescription == null) {
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
        <SoftwareTopics {...problem} shape="one" columns={4} white />
        <SoftwareTopics {...solution} shape="two" columns={3} />
        <SoftwareShowcase />
        <SoftwareProcess />
        <SoftwareTopics {...layers} shape="two" columns={3} />
        <SoftwareFaq />
        <SoftwareClosing />
        <SoftwareContact />
        <FooterCustom typeFooter={FooterType.FOOTERWORK} />
      </main>
    </TransitionAnimate>
  );
};

export default Software;
