import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import Hero from "./components/Hero";
import HomeFooter from "./components/HomeFooter";
import Narrative from "./components/Narrative";
import ProjectReveal from "./components/ProjectReveal";
import SelectedWorks from "./components/SelectedWorks";
import Services from "./components/Services";

const Home = () => {
  return (
    <TransitionAnimate>
      <main className="bg-brand-dark min-h-screen">
        <Hero />
        <Narrative />
        <ProjectReveal />
        <Services />
        <SelectedWorks />
        <HomeFooter />
      </main>
    </TransitionAnimate>
  );
};

export default Home;
