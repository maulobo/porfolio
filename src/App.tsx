import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Work from "./pages/Works/Work";
import MaskCursor from "./components/common/cursor/MaskCursor";
import SmoothScroll from "./components/common/smoothScroll/SmoothScroll";
import Navbar from "./components/common/navbar/Navbar";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import "./App.css";
import Home from "./pages/Home/Home";
import Studio from "./pages/Studio/Studio";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import Software from "./pages/Software/Software";

/**
 * El panel CRM de muestra se carga aparte: arrastra recharts y dnd-kit, que no
 * hacen falta para navegar el sitio.
 */
const PanelCrm = lazy(() => import("./pages/Software/PanelCrm/PanelCrm"));

export function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/servicios/software" element={<Software />} />
      </Routes>
    </AnimatePresence>
  );
}

/** Sitio público: navbar, cursor custom y smooth scroll. */
function SiteLayout() {
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* El panel corre fuera del chrome del sitio: tiene su propio layout. */}
        <Route
          path="/software/panel-crm/*"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0f1116" }} />}>
              <PanelCrm />
            </Suspense>
          }
        />
        <Route path="*" element={<SiteLayout />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
