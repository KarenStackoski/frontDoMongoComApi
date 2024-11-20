import { useNavigate } from 'react-router-dom';
import React from 'react';

function Students() {
    const navigate = useNavigate();

    const handleCreateStudent = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        navigate('/createStudents'); // Navega para a página de criação de alunos
    };

    return (
        <div>
            <h1>Alunos</h1>
            <button onClick={handleCreateStudent}>+ Criar</button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Data de Criação</th>
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

export default Students;
