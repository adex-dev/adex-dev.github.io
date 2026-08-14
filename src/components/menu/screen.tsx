import { BeamDefs } from "@components/beam";
import ScrollToHash from "@components/includes/ScrollToHash";
import Footer from '@components/ui/Footer';
import Navbar from '@components/ui/Navbar';
import { Outlet } from "react-router";

export default function MainScreen() {

  return (
    <div className="bg-primary text-text relative min-h-screen w-screen overflow-x-hidden!">
      <ScrollToHash/>
      <BeamDefs/>
      <main className="relative">
      <Navbar />
          <Outlet />
      </main>
     <Footer />
    </div>
  );
}