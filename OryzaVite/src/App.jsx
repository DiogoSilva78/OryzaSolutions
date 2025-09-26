import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx"; // página de login
import AdminPainel from "./pages/AdminPainel.jsx";
import GestaoUtilizadores from "./pages/GestaoUtilizadores.jsx";
import Inventario from "./pages/inventario.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Inventario from "./pages/Inventario.jsx";
import Header from "./components/header.jsx";

import "./App.css";

// Wrapper para mostrar/ocultar Header
function Layout({ children }) {
  const location = useLocation();

  // Não mostra o Header no login
  const showHeader = location.pathname !== "/login";

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redireciona raiz para /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login */}
          <Route path="/login" element={<Home />} />

          {/* Páginas do sistema */}
          <Route path="/dashboard" element={<AdminPainel />} />
          <Route path="/utilizadores" element={<GestaoUtilizadores />} />
          <Route path="/inventario" element={<Inventario />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}