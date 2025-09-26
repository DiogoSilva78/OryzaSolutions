import React from "react";
import "./header.css"; // os estilos do sidebar estão juntos com o header.css
import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay para escurecer fundo */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Sidebar lateral */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/" onClick={onClose}>Home</Link>
        <Link to="/utilizadores" onClick={onClose}>Utilizadores</Link>
        <Link to="/inventario" onClick={onClose}>Inventário</Link>
      </aside>
    </>
  );
};

export default Sidebar;
