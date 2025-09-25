import React from "react";
import { Link } from "react-router-dom";   // <— novo
import "./header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      {/* Esquerda */}
      <div className="header-left">
        <Link to="/" className="brand" aria-label="Ir para a Home">
          <img src={logo} alt="Logo" className="logo" />
          <span className="title">Gaia Pet</span>
        </Link>
      </div>

      {/* Direita */}
      <div className="header-right">
        <img
          src="https://via.placeholder.com/30"
          alt="User avatar"
          className="avatar"
        />
        <div className="user-info">
          <p className="username">Diogo Silva</p>
          <p className="welcome">Bem-vindo</p>
        </div>
      </div>
    </header>
  );
};

export default Header;