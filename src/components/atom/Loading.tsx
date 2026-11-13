import { lazy, Suspense } from "react";

const LoadingAnimation = lazy(
  () => import("./LoadingAnimation")
);

export default function Loadings() {
  return (
    <div className="h-[70dvh] w-screen flex justify-center items-center">
      <Suspense fallback={<div className="h-24 w-40" />}>
        <LoadingAnimation />
      </Suspense>
    </div>
  );
}