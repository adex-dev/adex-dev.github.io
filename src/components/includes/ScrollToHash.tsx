import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Tunggu React selesai render halaman
    requestAnimationFrame(() => {
      const element = document.getElementById(hash.substring(1));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [pathname, hash]);

  return null;
}