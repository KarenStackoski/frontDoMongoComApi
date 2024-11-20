import { useNavigate } from 'react-router-dom';

function Users() {
    const navigate = useNavigate();

    const handleCreateUser = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/createUsers'); // Navega para a página Menu
      };

    return (
        <div>
            <h1>Usuários</h1>
            <button onClick={handleCreateUser}>+ Criar</button>
            <button>Deletar</button>
            <button>Editar</button>
        </div>
    );
}

export default Users;