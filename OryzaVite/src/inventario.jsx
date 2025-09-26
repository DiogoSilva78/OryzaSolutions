import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import logo from './assets/logo.png';
import goldenpiscina from './assets/goldenpiscina.png';
import viteLogo from '/vite.svg';
import './App.css';
import './inventario.css'; // Importa o CSS específico do inventário (ajusta o caminho se necessário)

function Inventario() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Mantém o useNavigate se necessário para navegação

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="flex items-center">
          <img src="/logo.png" alt="Gaia Pet Logo" className="logo" />
          <h2>Gestão de Inventário - Localização de Stock</h2>
        </div>
        <div className="flex items-center user-info">
          <img src="/user-avatar.png" alt="User Avatar" />
          <span>Bem-vindo, Diogo Silva</span>
        </div>
      </div>

      {/* Subheader */}
      <div className="subheader">
        <h1>Sistema de Gestão de Inventário Médico</h1>
        <p>Localização instantânea e reposição intuitiva de stock</p>
      </div>

      {/* Navegação */}
      <div className="nav-buttons">
        <button>
          <span>🔍</span> Localização de Stock
        </button>
        <button>
          <span>📱</span> Reposição QR
        </button>
        <button>
          <span>🗑️</span> Materiais descartáveis
        </button>
      </div>

      {/* Localização Instantânea */}
      <div className="search-section">
        <h2>Localização Instantânea de Stock</h2>
        <p>Digite o nome do pack, instrumento ou material para localizar no armazém</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ex: Pack Cirúrgico, Bisturi, Luvas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍 Procurar</button>
        </div>
      </div>

      {/* Indicadores de Stock */}
      <div className="stock-indicators">
        <div className="stock-card stock-available">
          <span>📦 Stock Disponível</span>
          <span className="value">2,000</span>
        </div>
        <div className="stock-card stock-in-use">
          <span>📝 Em Uso</span>
          <span className="value">23</span>
        </div>
        <div className="stock-card stock-low">
          <span>⬇️ Stock Baixo</span>
          <span className="value">8</span>
        </div>
        <div className="stock-card stock-scans">
          <span>📱 QR Scans Hoje</span>
          <span className="value">47</span>
        </div>
      </div>
    </div>
  );
}

export default Inventario;