import About from '@components/ui/About';
import Client from '@components/ui/Client';
import Contact from '@components/ui/Contact';
import Experience from '@components/ui/Experience';
import Hero from '@components/ui/Hero';
import Projects from '@components/ui/Projects';
import Services from '@components/ui/Services';
import Skills from '@components/ui/Skills';
import Stats from '@components/ui/Stats';
import Term from '@components/ui/Term';
function Home() {
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