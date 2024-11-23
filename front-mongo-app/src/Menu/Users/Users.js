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

    const [editUserById, setEditUserById] = useState(null);

    const getUsers = async () => {
        try {
            const response = await apiConfig.get('/users');
            console.log('Usuários retornados:', response.data); // Verifique a estrutura dos dados retornados
            setUsers(response.data);
        } catch (error) {
            console.log('Erro ao buscar todos os usuários:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditUserById(user._id);
        setNewUser({
            userName: user.userName,
            userEmail: user.userEmail,
            userUser: user.userUser,
            userLevel: user.userLevel,
            userStatus: user.userStatus
        });
    }

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

    const putUsersById = async () => {
        try {
            const response = await apiConfig.put(`/users/${editUserById}`, newUser);
            setUsers(
                users.map((user) => 
                    user._id === editUserById ? response.data : user
                )
            );
            setEditUserById(null);
            setNewUser({
                userName: '',
                userEmail: '',
                userUser: '',
                userLevel: '',
                userStatus: false
            })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        putUsersById();
    }

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
                                <button onClick={() => handleEditUser(user)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUserById && (
                <div>
                    <h1>Editando Usuário</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type='text'
                                name='userName'
                                value={newUser.userName}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, userName: e.target.value})
                                }
                            />
                        </div>
                        <div>
                            <label>E-mail:</label>
                            <input
                                type='text'
                                name='userEmail'
                                value={newUser.userEmail}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, userEmail: e.target.value})
                                }
                            />
                        </div>
                        <div>
                            <label>Usuário:</label>
                            <input
                                type='text'
                                name='userUser'
                                value={newUser.userUser}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, userUser: e.target.value})
                                }
                            />
                        </div>
                        <div>
                            <label>Nível:</label>
                            <input
                                type='text'
                                name='userLevel'
                                value={newUser.userLevel}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, userLevel: e.target.value})
                                }
                            />
                        </div>
                        <div>
                        <label>Status:</label>
                            <input
                                type='checkbox'
                                name='userStatus'
                                checked={newUser.userStatus}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, userStatus: e.target.checked})
                                }
                            />
                        </div>
                        <button type='submit'>Salvar</button>
                        <button onClick={() => setEditUserById(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Users;
