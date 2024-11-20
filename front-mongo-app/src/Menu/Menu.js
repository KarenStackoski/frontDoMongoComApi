import './Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    const handleUser = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do botão
        navigate('/users'); // Navega para a página de Usuários
    };

    const handleStudent = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do botão
        navigate('/students'); // Navega para a página de Alunos
    };

    return (
        <div>
            <h1>Menu de opções</h1>
            <button className="options" onClick={handleUser}>Usuários</button>
            <button className="options" onClick={handleStudent}>Alunos</button>
            <button className="options">Profissionais</button>
            <button className="options">Professores</button>
            <button className="options">Eventos</button>
            <button className="options">Agendamentos</button>
        </div>
    );
}

export default Menu;
