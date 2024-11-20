import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import users from './users.json'; // Importa o arquivo JSON

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Verifica as credenciais no JSON
    const user = users.find(
      (user) => user.username === login && user.password === password
    );

    if (user) {
      navigate('/menu'); // Navega para a página Menu
    } else {
      setError('Login ou senha inválidos!');
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleLogin}>
        <div id="loginBox">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="loginInput"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div id="passwordBox">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button
          id="submitLogin"
          title="Acessar sua conta para prosseguir"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default App;
