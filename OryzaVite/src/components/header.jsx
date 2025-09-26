import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";

const Header = ({ onMenuClick }) => {
  return (
    <header className="header" role="banner">
      <div className="header-left">
        {/* Botão hamburger */}
        <button
          className="menu-btn"
          type="button"
          aria-label="Abrir menu lateral"
          onClick={onMenuClick}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Marca */}
        <Link to="/" className="brand" aria-label="Ir para a Home">
          <img src={logo} alt="Logo Gaia Pet" className="logo" />
          <span className="title">Gaia Pet</span>
        </Link>
      </div>

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

export const HeaderSpacer = () => (
  <div className="header-spacer" aria-hidden="true" />
);

export default Header;
