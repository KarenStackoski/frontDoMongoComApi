import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Envia uma requisição para a API para verificar as credenciais
    try {
      const response = await fetch('http://localhost:8080/users'); // Altere para o URL da sua API
      const users = await response.json();

      // Verifica se as credenciais estão corretas
      const user = users.find(
        (user) => user.userUser === login && user.userPassword === password
      );

      if (user) {
        navigate('/menu'); // Navega para a página Menu
      } else {
        setError('Login ou senha inválidos!');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor.');
      console.error('Error:', error);
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
