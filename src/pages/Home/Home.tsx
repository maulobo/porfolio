import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import Hero from "./components/Hero";
import Narrative from "./components/Narrative";
import ProjectReveal from "./components/ProjectReveal";
import Services from "./components/Services";
import HomeFooter from "./components/HomeFooter";

const Home = () => {
  return (
    <TransitionAnimate>
      <main className="bg-brand-dark min-h-screen">
        <Hero />
        <Narrative />
        <ProjectReveal />
        <Services />
        <HomeFooter />
      </main>
    </TransitionAnimate>
  );
};

export default Home;
