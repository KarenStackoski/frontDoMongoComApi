import './App.css';

function App() {
	return (
		<div className="App">
			<form className='form'>
				<div id='loginBox'>
					<label htmlFor="login">  Login  </label>
					<input
						type="text"
						id="loginInput"
						label='Login'
					/>
				</div>
				<div id='passwordBox'>
					<label htmlFor='password'>  Senha  </label>
					<input
						type='text'
						id='passwordInput'
						label='Senha'
					/>
				</div>
				<button 
					id='submitLogin'
					title='Acessar sua conta para prosseguir'
					href='./Menu/Menu.js'>
						<a href='./Menu/Menu.js'>Entrar</a>
				</button>
			</form>
		</div>
	);
}

export default App;
