import { useState } from 'react';
import reactLogo from './assets/react.svg';
import logo from "../assets/logo.png";
import goldenpiscina from "../assets/goldenpiscina.png";
import viteLogo from '/vite.svg';
import './App.css'; // Ou o caminho do seu CSS

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bemvindo">
        <img src={logo} alt="Logo" className="logo" />
        <div className="input-group">
          <input type="text" name="nome" placeholder="Email" />
        </div>
        <div className="input-group">
          <input type="text" name="nome" placeholder="Senha" />
        </div>
        <button className="login-button">Login</button> {/* Botão adicionado */}
      </div>
      <img src={goldenpiscina} alt="golden" className="golden" />
    </>
  );
}