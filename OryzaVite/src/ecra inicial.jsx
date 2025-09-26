// IMPORTS — respeitar minúsculas (como no teu screenshot)
import Header from "./components/header.jsx";
import Sidebar from "./components/sidebar.jsx";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logo from "C:/Users/Leandro/Desktop/Cobra IT/OryzaSolutions/OryzaVite/src/assets/logo.png";
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Sidebar />

      {/* Compensar header (60px) e sidebar (260px) */}
      <main style={{ paddingTop: "60px", paddingLeft: "260px" }}>
        <div>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
          <p>
            Edita <code>src/App.jsx</code> e guarda para testar o HMR
          </p>
        </div>
        <p className="read-the-docs">
          Clica nos logos do Vite e do React para saber mais
        </p>
      </main>
    <div className="bemvindo">
      <h1>Bem-vindo/a</h1>
    </div>

    <img src={logo} alt="Logo" className="logo" />
      
        
    </>
  );
}

export default App;