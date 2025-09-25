import React from "react";
import "./header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      {/* Esquerda */}
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="title">Gaia Pet</span>
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