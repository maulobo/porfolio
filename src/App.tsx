import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Work from "./pages/Work";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/work" replace />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
