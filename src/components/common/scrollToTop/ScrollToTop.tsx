import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (hash) {
      const scrollToHash = () => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return false;

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        return true;
      };

      if (scrollToHash()) return;

      const observer = new MutationObserver(() => {
        if (!scrollToHash()) return;

        observer.disconnect();
        if (timeoutId !== undefined) clearTimeout(timeoutId);
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeoutId = setTimeout(() => observer.disconnect(), 2_000);

      return () => {
        observer.disconnect();
        if (timeoutId !== undefined) clearTimeout(timeoutId);
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
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}
