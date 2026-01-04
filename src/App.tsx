import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Work from "./pages/Work";
import MaskCursor from "./components/common/cursor/MaskCursor";
import "./App.css";

function App() {
  return (
    <Router>
      <MaskCursor />
      <Routes>
        <Route path="/" element={<Navigate to="/work" replace />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
