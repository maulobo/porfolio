import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/common/scrollToTop/ScrollToTop";
import Links from "./pages/Links/Links";

/**
 * El sitio completo (three.js, modelos, todas las páginas) se carga aparte para
 * que /links, que llega desde redes y casi siempre en celular, no lo descargue.
 */
const SiteLayout = lazy(() => import("./SiteLayout"));

/**
 * El panel CRM de muestra se carga aparte: arrastra recharts y dnd-kit, que no
 * hacen falta para navegar el sitio.
 */
const PanelCrm = lazy(() => import("./pages/Software/PanelCrm/PanelCrm"));

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
        {/* Landing de links para redes: pantalla única, sin chrome del sitio. */}
        <Route path="/links" element={<Links />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", background: "#111111" }} />}>
              <SiteLayout />
            </Suspense>
          }
        />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
