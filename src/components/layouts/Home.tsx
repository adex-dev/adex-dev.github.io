import About from "@components/ui/About";
import Contact from "@components/ui/Contact";
import Hero from "@components/ui/Hero";
import Projects from "@components/ui/Projects";
import Services from "@components/ui/Services";
import Skills from "@components/ui/Skills";
import Testimonials from "@components/ui/Testimonial";
import Timeline from "@components/ui/Timeline";
import useParallax from "@hooks/useParallax";
import useReveal from "@hooks/useReveal";
import { useLoaderData } from "react-router";
import type {
  projectInterface,
  PriceServiceInterface,
  ServiceInterface,
} from "@components/types/Interface";
interface HomeData {
  projects: projectInterface[];
  services: ServiceInterface[];
  price: PriceServiceInterface[];
  testimonials: any[];
  timeline: any[];
  defaultPrefix: string;
}
function Home() {
  const {
    projects,
    services,
    price,
    testimonials,
    timeline,
    defaultPrefix,
  } = useLoaderData() as HomeData;

  useParallax({
    mobileDampen: 0.5,
    lerpSmoothness: 0.08,
    autoCollect: true,
  });
  useReveal({
    threshold: 0.12,
    transitionDuration: 0.65,
  });
  return (
    <>
      <Hero />
      <div className="container">
        <Skills />
        <Projects initialProjects={projects} />
        <Services
        initialServices={services}
        initialPrices={price}
          defaultPrefix={defaultPrefix}
        />
        <Testimonials 
        initialTestimonials={testimonials}
        />
        <Timeline
        initialTimeline={timeline}
        />
        <About />
        <Contact />
      </div>
    </>
  );
}

export default Home;
