import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GestaoUtilizadores from "./pages/GestaoUtilizadores.jsx";
import Inventario from "./pages/inventario.jsx";
import AppLayout from "./components/AppLayout.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/utilizadores" element={<GestaoUtilizadores />} />
          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
