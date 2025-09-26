import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => (
  <aside className="sidebar">
    <Link to="/">Home</Link>
    <Link to="/utilizadores">Utilizadores</Link>
    <Link to="/inventario">Inventário</Link>
  </aside>
);
export default Sidebar;
