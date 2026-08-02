import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import {
  StudioClosing,
  StudioDirection,
  StudioFiles,
  StudioHero,
  StudioIntro,
  StudioScrollComic,
  StudioTeam,
  StudioWayOfWorking,
} from "./componentSections";

const Studio = () => {
  return (
    <TransitionAnimate>
      <main className="min-h-screen bg-brand-dark">
        <StudioHero />
        <StudioIntro />
        <StudioFiles />
        <StudioScrollComic />
        <StudioDirection />
        <StudioWayOfWorking />
        <StudioTeam />
        <StudioClosing />
      </main>
    </TransitionAnimate>
  );
};

export default Studio;
