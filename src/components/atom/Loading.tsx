import { Lottie } from "lottie-react";
import loading from "@assets/loading.json";
export default function Loadings() {
  return (
    <div className="h-[70dvh] w-screen flex justify-center items-center">
      <Lottie src={loading} autoplay loop style={{ width: 160, height: 96 }} />
    </div>
  );
}
