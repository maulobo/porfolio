import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Work from "./pages/Works/Work";
import MaskCursor from "./components/common/cursor/MaskCursor";
import SmoothScroll from "./components/common/smoothScroll/SmoothScroll";
import Navbar from "./components/common/navbar/Navbar";
import "./App.css";
import Home from "./pages/Home/Home";
import Studio from "./pages/Studio/Studio";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import Software from "./pages/Software/Software";
import ServiciosWeb from "./pages/ComingSoon/ServiciosWeb";
import ServiciosVisibilidad from "./pages/ComingSoon/ServiciosVisibilidad";
import ServiciosAudiovisual from "./pages/ComingSoon/ServiciosAudiovisual";

export function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/servicios/software" element={<Software />} />
        <Route path="/servicios/web" element={<ServiciosWeb />} />
        <Route path="/servicios/visibilidad" element={<ServiciosVisibilidad />} />
        <Route path="/servicios/audiovisual" element={<ServiciosAudiovisual />} />
      </Routes>
    </AnimatePresence>
  );
}

/** Sitio público: navbar, cursor custom y smooth scroll. */
export default function SiteLayout() {
  return (
    <>
      <SmoothScroll />
      <MaskCursor />
      <Navbar />
      <AnimatedRoutes />
      <ChatbotWidget />
    </>
  );
}
