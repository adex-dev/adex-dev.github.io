import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Services from './components/Services';
import Term from './components/Term';
import Skills from './components/Skills';
import Stats from './components/Stats';

function App() {
  return (
    <div className="bg-[#0B0F1A] text-[#E8EBF0]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Term />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;