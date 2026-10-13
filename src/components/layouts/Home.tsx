import About from "@components/ui/About";
// import Client from "@components/ui/Client";
import Contact from "@components/ui/Contact";
import Hero from "@components/ui/Hero";
import Projects from "@components/ui/Projects";
import Services from "@components/ui/Services";
import Skills from "@components/ui/Skills";
import Testimonials from "@components/ui/Testimonial";
import Timeline from "@components/ui/Timeline";
// import Stats from "@components/ui/Stats";
// import Term from "@components/ui/Term";
import useParallax from "@hooks/useParallax";
import useReveal from "@hooks/useReveal";
import { Loadings } from "@components/atom";
import {useState,useEffect} from "react"
function Home() {
  const [loading, setloading] = useState(true)
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 2000);
    return () => clearTimeout(timer);
  },[])
  
  if (loading) {
    return <Loadings/>
  }
  return (
    <>
      <Hero />
      <div className='container'>
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <Timeline />
        <About />
      <Contact />
        {/* <Stats /> */}

        {/* <Experience /> */}
      </div>
      {/* <Term />
      <Client /> */}
    </>
  );
}

export default Home;
