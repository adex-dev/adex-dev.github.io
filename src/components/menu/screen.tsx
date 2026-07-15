import { Outlet } from "react-router";
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { BeamDefs } from "@/components/beam";
export default function MainScreen() {

  return (
    <div className="bg-[#0B0F1A] text-[#E8EBF0]">
      <Navbar />
      <BeamDefs/>
      <main>
          <Outlet />
      </main>
     <Footer />
    </div>
  );
}