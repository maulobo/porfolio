import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Proyectos", path: "/work" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 transition-colors duration-300",
        scrolled
          ? "bg-brand-dark/80 backdrop-blur-md border-b border-brand-gray/20"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center gap-8">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative group py-2"
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
    </motion.header>
  );
};

export default Navbar;
