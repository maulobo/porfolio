import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll />
      <MaskCursor />
      <Navbar />
      <AnimatedRoutes />
      <Analytics />
    </Router>
  );
}

export default App;
