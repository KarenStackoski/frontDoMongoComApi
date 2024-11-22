import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');

    const getUsers = async () => {
        try {
            const response = await apiConfig.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar todos os usuários', error);
        }
    }

    const getUsersByName = async () => {
        try {
            const response = await apiConfig.get(`/users/name/${userName}`);
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar usuário por nome', error);
        }
    }

    const getUsersById = async () => {
        try {
            const response = await apiConfig.get(`/users/${userId}`);
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar usuário por id', error);
        }
    }

    const postUsers = async () => {
        try {
            const response = await apiConfig.post('/users', {
                userName: userName,
                userEmail: userEmail,
                userUser: userUser,
                userLevel: userLevel,
                userStatus: userStatus
            });
            setUsers([...users, response.data]);
            setNewUser('');
        } catch (error) {
            console.log('Erro ao criar usuário: ', error);
        }
    }

    //isso deve ser transferido pra página de editar
    const putUsersById = async (idUser) => {
        try {
            const response = await apiConfig.put(`/users/${userId}`, up);
        } catch (error) {
            console.log('Não possível editar o usuário: ', error);
        }
    }

    const deleteUsersById = async () => {
        try {
            await apiConfig.delete(`/users/${userId}`);
            setUsers(users.filter((user) => user.userId !== userId));
        } catch (error) {
            console.log('Não foi possível deletar o usuário: ', error);            
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

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
                    {users.map(user => (
                        <tr key={user.idUser}>
                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userUser}</td>
                            <td>{user.userLevel}</td>
                            <td>{user.userStatus ? 'Sim' : 'Não'}</td>
                            <td>
                                <button onClick={() => deleteUsersById(user.userId)}>Deletar</button>
                                <button>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;