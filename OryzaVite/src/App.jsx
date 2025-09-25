import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import logo from './assets/logo.png';
import goldenpiscina from './assets/goldenpiscina.png';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mockUser = {
    email: 'teste@exemplo.com',
    password: '123456',
  };

  const validateForm = () => {
    console.log('Validando formulário:', { email, password }); // Depuração
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido (ex.: exemplo@dominio.com).');
      return false;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (email !== mockUser.email || password !== mockUser.password) {
      setError('Email ou senha incorretos.');
      return false;
    }

    setError('');
    console.log('Validação bem-sucedida'); // Depuração
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Botão Login clicado'); // Depuração
    if (validateForm()) {
      console.log('Redirecionando para /inventario'); // Depuração
      navigate('/inventario');
    } else {
      console.log('Validação falhou:', error); // Depuração
    }
  };

  return (
    <>
      <div className="bemvindo">
        <img src={logo} alt="Logo" className="logo" />
        <div className="input-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <img src={goldenpiscina} alt="golden" className="golden" />
    </>
  );
}

export default App;