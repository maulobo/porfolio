import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Work from "./pages/Works/Work";
import MaskCursor from "./components/common/cursor/MaskCursor";
import "./App.css";
import Home from "./pages/Home/Home";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <MaskCursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
