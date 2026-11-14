import loading from "@assets/loading.json";
import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";

export default function LoadingAnimation() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <Lottie
      src={loading}
      autoplay={!reducedMotion}
      loop={!reducedMotion}
      style={{ width: 160, height: 96 }}
    />
  );
}
