import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}