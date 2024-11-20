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
            <table border='2'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Usuário</th>
                        <th>Nível</th>
                        <th>Ativo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button>Deletar</button>
                            <button>Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Users;