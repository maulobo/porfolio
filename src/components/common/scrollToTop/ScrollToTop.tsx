import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let frameId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (hash) {
      frameId = window.requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        target?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });

      return () => {
        if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      };
    }

    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Wait a bit for Lenis to initialize and then scroll to top
    const scrollToTop = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    };
    
    // Try immediately and also after a short delay
    scrollToTop();
    timeoutId = setTimeout(scrollToTop, 100);
    
    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}
