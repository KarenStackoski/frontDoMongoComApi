import './Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // Navega para a rota especificada
    };

    return (
        <div>
            <h1>Menu de opções</h1>
            <button className="options" onClick={() => handleNavigation('/users')}>Usuários</button>
            <button className="options" onClick={() => handleNavigation('/students')}>Alunos</button>
            <button className="options" onClick={() => handleNavigation('/professionals')}>Profissionais</button>
            <button className="options" onClick={() => handleNavigation('/teachers')}>Professores</button>
            <button className="options" onClick={() => handleNavigation('/Events')}>Eventos</button>
            <button className="options" onClick={() => handleNavigation('/schedules')}>Agendamentos</button>
        </div>
    );
}

export default Menu;
