import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import {
  CapabilitiesSection,
  ContactSection,
  EntryPointsSection,
  HeroSection,
  ManifestoSection,
  TechStack,
  TrustBar,
  WorkflowSection,
} from "./components/homeSections";
import Team from "./components/homeSections/Team";


const Home = () => {
  return (
    <TransitionAnimate>
      <main className="min-h-screen overflow-hidden bg-[#f3f0e8] text-[#111111]">
        <HeroSection />
        <TrustBar />
        <CapabilitiesSection />
        <WorkflowSection />
        <ManifestoSection />
        <Team/>
        <TechStack />
        <EntryPointsSection />
        <ContactSection />
      </main>
    </TransitionAnimate>
  );
};

export default Home;
