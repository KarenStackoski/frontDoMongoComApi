import { useNavigate } from 'react-router-dom';

function Events() {
    const navigate = useNavigate();

    const handleCreateEvent = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/createEvents'); // Navega para a página de criação de eventos
    };

    return (
        <div>
            <h1>Eventos</h1>
            <button onClick={handleCreateEvent}>+ Criar</button>
            <button>Deletar</button>
            <button>Editar</button>
        </div>
    );
}

export default Events;
