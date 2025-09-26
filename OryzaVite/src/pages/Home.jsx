import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../assets/logo.png?url';           // garante URL direto
import goldenpiscina from '../assets/goldenpiscina.png';
import '../Home.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mockUser = { email: 'teste@exemplo.com', password: '123456' };

  const validateForm = () => {
    if (!email.trim() || !password.trim()) { setError('Por favor, preencha todos os campos.'); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Por favor, insira um email válido (ex.: exemplo@dominio.com).'); return false; }
    if (password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return false; }
    if (email !== mockUser.email || password !== mockUser.password) { setError('Email ou senha incorretos.'); return false; }
    setError(''); return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) navigate('/dashboard');
  };

  return (
    <div className="login-page" data-page="home-figma">
      <div className="left">
        <form className="form" onSubmit={handleLogin}>
          <img src={logoUrl} alt="Logo Gaia Pet" className="login-logo" />
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>

      <div className="right">
        <img src={goldenpiscina} alt="Golden na piscina" className="hero" />
      </div>
    </div>
  );
}