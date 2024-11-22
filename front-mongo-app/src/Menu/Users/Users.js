import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        userName: '',
        userEmail: '',
        userUser: '',
        userLevel: '',
        userStatus: false
    });

    const getUsers = async () => {
        try {
            const response = await apiConfig.get('/users');
            console.log('Usuários retornados:', response.data); // Verifique a estrutura dos dados retornados
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar todos os usuários:', error);
        }
    };


    const getUsersByName = async (userName) => {
        try {
            const response = await apiConfig.get(`/users/name/${userName}`);
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar usuário por nome', error);
        }
    };

    const getUsersById = async (userId) => {
        try {
            const response = await apiConfig.get(`/users/${userId}`);
            setUsers([response.data]);
        } catch (error) {
            console.log('Erro ao buscar usuário por id', error);
        }
    };

    const postUsers = async () => {
        try {
            const response = await apiConfig.post('/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({
                userName: '',
                userEmail: '',
                userUser: '',
                userLevel: '',
                userStatus: false
            });
        } catch (error) {
            console.log('Erro ao criar usuário:', error);
        }
    };

    const putUsersById = async (idUser, updatedUser) => {
        try {
            const response = await apiConfig.put(`/users/${idUser}`, updatedUser);
            setUsers(users.map(user => (user._id === idUser ? response.data : user)));
        } catch (error) {
            console.log('Erro ao editar usuário:', error);
        }
    };

    const deleteUsersById = async (userId) => {
        try {
            console.log(`Tentando deletar usuário com ID: ${userId}`); // Log do ID a ser deletado
            await apiConfig.delete(`/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.log('Não foi possível deletar o usuário: ', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleCreateUser = (e) => {
        e.preventDefault();
        navigate('/createUsers');
    };

    return (
        <div>
            <h1>Usuários</h1>
            <button onClick={handleCreateUser}>+ Criar</button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Usuário</th>
                        <th>Nível</th>
                        <th>Ativo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td scope="row">{user._id}</td>
                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userUser}</td>
                            <td>{user.userLevel}</td>
                            <td>{user.userStatus ? 'Sim' : 'Não'}</td>
                            <td>
                                <button onClick={() => deleteUsersById(user._id)}>Deletar</button>
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
