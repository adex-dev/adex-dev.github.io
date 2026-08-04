import About from "@components/ui/About";
import Client from "@components/ui/Client";
import Contact from "@components/ui/Contact";
import Experience from "@components/ui/Experience";
import Hero from "@components/ui/Hero";
import Projects from "@components/ui/Projects";
import Services from "@components/ui/Services";
import Skills from "@components/ui/Skills";
import Stats from "@components/ui/Stats";
import Term from "@components/ui/Term";
import useParallax from "@hooks/useParallax";
import useReveal from "@hooks/useReveal";
function Home() {
 useParallax({
    mobileDampen: 0.5,
    lerpSmoothness: 0.08,
    autoCollect: true,
  });

  // Enable reveal animations globally
  useReveal({
    threshold: 0.12,
    transitionDuration: 0.65,
  });
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Term />
      <Client />
      <Contact />
    </>
  );
}

export default Home;
