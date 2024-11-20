import { useNavigate } from 'react-router-dom';

function Teachers() {
    const navigate = useNavigate();

    const handleCreateTeachers = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/createTeacher'); // Navega para a página Menu
      };

    return (
        <div>
            <h1>Professores</h1>
            <button onClick={handleCreateTeachers}>+ Criar</button>
            <table border='2'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Discliplina</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
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

export default Teachers;