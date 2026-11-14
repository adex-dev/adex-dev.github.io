import { BeamDefs } from "@components/beam";
import ScrollToHash from "@components/includes/ScrollToHash";
import Footer from '@components/ui/Footer';
import Navbar from '@components/ui/Navbar';
import { Outlet } from "react-router";

export default function MainScreen() {

  return (
    <div className="main-screen bg-primary text-text relative min-h-screen w-full">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollToHash/>
      <BeamDefs/>
      <main className="relative" id="main-content">
      <Navbar />
          <Outlet />
      </main>
     <Footer />
    </div>
  );
}
