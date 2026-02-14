import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Servicios from "./components/pages/Servicios";
import Empresa from "./components/pages/Empresa";
import Contacto from "./components/pages/Contacto";
import ScrollToTop from "./components/ScrolltoTop";
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/nosotros" element={<Empresa />} />
      <Route path="/contacto" element={<Contacto/>} />
    </Routes>
    <Analytics />
  </>
  );
}

export default App;