import { Link, useLocation } from "react-router";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import MobileNavigation from "./MobileNavigation";
import ServicesMenu from "./ServicesMenu";
import { primaryLinks } from "./navigation";

const Navbar = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isSoftwareRoute = location.pathname === "/servicios/software";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !menuOpen ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-center px-6 py-4 transition-colors duration-300",
        isSoftwareRoute && "software-navbar",
        menuOpen && "navbar-menu-open",
        scrolled || isSoftwareRoute
          ? "border-b border-brand-gray/20 bg-brand-dark/95 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
        {primaryLinks.slice(0, 1).map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className="group relative inline-flex min-h-11 items-center py-2"
            >
              <span
                className={clsx(
                  "text-sm uppercase tracking-widest font-medium transition-colors duration-300",
                  isActive
                    ? "text-brand-pink"
                    : "text-brand-light/70 hover:text-brand-light"
                )}
              >
                {link.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-pink"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {!isActive && (
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-light/50 transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          );
        })}
        <ServicesMenu pathname={location.pathname} onOpenChange={setMenuOpen} />
        {primaryLinks.slice(1).map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className="group relative inline-flex min-h-11 items-center py-2"
            >
              <span
                className={clsx(
                  "text-sm uppercase tracking-widest font-medium transition-colors duration-300",
                  isActive
                    ? "text-brand-pink"
                    : "text-brand-light/70 hover:text-brand-light"
                )}
              >
                {link.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-pink"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {!isActive && (
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-light/50 transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          );
        })}
      </nav>
      <MobileNavigation pathname={location.pathname} onOpenChange={setMenuOpen} />
    </motion.header>
  );
};

export default Navbar;
