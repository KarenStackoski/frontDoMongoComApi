import './Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();


    const handleUser = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/users'); // Navega para a página Menu
      };
      const handleTeachers = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/teachers'); // Navega para a página Menu
      };

      const handleProfessionals = (e) => {
        e.preventDefault();
        navigate('/professionals'); // Navega para a página de profissionais
      };
      

      const handleAppointments = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/appointments'); // Navega para a página Menu
      };

    const handleNavigation = (path) => {
        navigate(path); // Navega para a rota especificada

    };


    return (
        <div>
            <h1>Menu de opções</h1>

            <button className="options" onClick={handleUser}>Usuários</button>
            <button className="options" onClick={handleTeachers}>Professores</button>
            <button className="options" onClick={() => handleNavigation('/students')}>Alunos</button>
            <button className="options" onClick={handleProfessionals}>Profissionais</button>
            <button className="options" onClick={() => handleNavigation('/Events')}>Eventos</button>
            <button className="options" onClick={handleAppointments}>Agendamentos</button>

        </div>
    );
}

export default Menu;
