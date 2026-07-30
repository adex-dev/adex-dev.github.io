import { BeamDefs } from "@components/beam";
import ScrollToHash from "@components/includes/ScrollToHash";
import Footer from '@components/ui/Footer';
import Navbar from '@components/ui/Navbar';
import { Outlet } from "react-router";

export default function MainScreen() {

  return (
    <div className="bg-[#0B0F1A] text-[#E8EBF0] relative min-h-screen">
      <BeamDefs/>
      <ScrollToHash/>
      <Navbar />
      <main>
          <Outlet />
      </main>
     <Footer />
    </div>
  );
}