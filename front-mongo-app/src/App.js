import React, { useState } from 'react';
import './App.css';  // Importando o CSS para estilização

const App = () => {
  const [userUser, setUserUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Antes de enviar a requisição, limpa qualquer mensagem de erro
    setErrorMessage('');
    setIsLoading(true); // Começa o estado de loading

    try {
      // Envia a requisição para o backend
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userUser, password }), // Envia as credenciais
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Login falhou. Verifique suas credenciais.');
      }

      // Caso a resposta seja bem-sucedida, obtemos os dados do usuário
      const data = await response.json();
      console.log('Login bem-sucedido', data);

      // Limpar os campos de input após login bem-sucedido
      setUserUser('');
      setPassword('');

      // Redirecionar ou executar outras ações aqui se necessário
      // Exemplo: redirecionar para uma página de dashboard
      // window.location.href = '/dashboard';

    } catch (error) {
      // Caso ocorra algum erro, mostramos a mensagem de erro
      console.error('Erro no login:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); // Finaliza o estado de loading
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-container">
        <label htmlFor="userUser">Usuário:</label>
        <input
          type="text"
          id="userUser"
          value={userUser}
          onChange={(e) => setUserUser(e.target.value)}
          placeholder="Digite seu nome de usuário"
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Entrar'}
      </button>
    </div>
  );
};

export default App;
