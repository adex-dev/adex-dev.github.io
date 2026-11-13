import { Lottie } from "lottie-react";
import loading from "@assets/loading.json";

export default function LoadingAnimation() {
  return (
    <Lottie src={loading} autoplay loop style={{ width: 160, height: 96 }} />
  );
}
