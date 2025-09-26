import React from 'react';
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import Inventario from './inventario.jsx'; // Ajuste para './pages/Inventario.jsx' se necessário
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Inventario" element={<Inventario />} />
    </Routes>
  </BrowserRouter>
);

