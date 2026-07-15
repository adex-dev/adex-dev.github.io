import About from '@/components/ui/About';
import Contact from '@/components/ui/Contact';
import Experience from '@/components/ui/Experience';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/ui/Hero';
import Projects from '@/components/ui/Projects';
import Services from '@/components/ui/Services';
import Term from '@/components/ui/Term';
import Skills from '@/components/ui/Skills';
import Stats from '@/components/ui/Stats';
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
        <Contact />
    </>
  );
}

export default Home;