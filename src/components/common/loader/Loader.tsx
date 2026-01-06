import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../../../utils/projects";

export default function Loader() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [imgProgress, setImgProgress] = useState(0);
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Image preloading logic for non-home pages
  useEffect(() => {
    if (isHome) return;

    const allImages = [
      ...new Set(
        projects.flatMap((p) => [p.imageUrl, ...(p.hoverImages || [])])
      ),
    ];

    if (allImages.length === 0) {
      setImgProgress(100);
      return;
    }

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      setImgProgress(Math.round((loadedCount / allImages.length) * 100));
    };

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, [isHome]);

  // Smooth progress animation
  useEffect(() => {
    // Determine target progress
    // If we are on Home, use 3D progress. Otherwise, use image loading progress.
    const target = isHome ? progress : imgProgress;

    // Simple interpolation for the display number
    let timeout: number;

    if (displayProgress < target) {
      const diff = target - displayProgress;
      const step = Math.ceil(diff / 5); // Speed up catching up
      timeout = window.setTimeout(() => {
        setDisplayProgress((prev) => Math.min(prev + step, 100));
      }, 20);
    }

    return () => window.clearTimeout(timeout);
  }, [progress, imgProgress, displayProgress, isHome]);

  useEffect(() => {
    // If progress is 100, wait a bit then hide
    const target = isHome ? progress : imgProgress;
    if (target === 100) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 800); // 800ms delay to ensure it feels "complete" and smooth
      return () => clearTimeout(timer);
    }
  }, [progress, imgProgress, isHome]);

  // Force show at least for a moment until we know what's happening
  // Or if we know the app has heavy assets, useProgress is good.

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-dark text-brand-light"
        >
          <div className="relative flex flex-col items-center">
            {/* Percentage */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-sans tracking-tighter"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {displayProgress}%
            </motion.h1>

            {/* Optional text or bar */}
            <motion.div
              className="mt-4 h-1 bg-brand-gray w-48 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-brand-pink"
                style={{ width: `${displayProgress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </motion.div>

            {/* Loading item text (optional, usually too fast to read but shows "work") */}
            <motion.p className="mt-4 text-xs text-brand-light/40 font-mono absolute -bottom-8">
              {active ? "LOADING ASSETS" : "READY"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
