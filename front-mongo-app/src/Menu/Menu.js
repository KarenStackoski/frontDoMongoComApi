import './Menu.css'
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    const handleUser = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/users'); // Navega para a página Menu
      };

    return (
        <div>
            <h1>Menu de opções</h1>
            <button className="options" onClick={handleUser}>Usuários</button>
            <button className="options">Alunos</button>
            <button className="options">Profissionais</button>
            <button className="options">Professores</button>
            <button className="options">Eventos</button>
            <button className="options">Agendamentos</button>
        </div>
    );
}

export default Menu;