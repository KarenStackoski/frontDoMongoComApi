import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import apiConfig from '../../../api/apiConfig';

function CreateUser() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        userName: '',
        userEmail: '',
        userUser: '',
        userLevel: '',
        userStatus: false,
        userPassword: ''  // Campo de senha adicionado
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const postUser = async () => {
        try {
            const response = await apiConfig.post('/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({
                userName: '',
                userEmail: '',
                userUser: '',
                userLevel: '',
                userStatus: false,
                userPassword: ''  // Limpar o campo de senha após o envio
            });
            navigate('/users');
        } catch (error) {
            console.log('Erro ao criar usuário:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postUser();
    }

    return (
        <div>
            <h1>Criando novo Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text"
                        name='userName'
                        value={newUser.userName}
                        onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>E-mail</label>
                    <input type="text"
                        name='userEmail'
                        value={newUser.userEmail}
                        onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Usuário</label>
                    <input type="text"
                        name='userUser'
                        value={newUser.userUser}
                        onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Nível de usuário</label>
                    <input type="text"
                        name='userLevel'
                        value={newUser.userLevel}
                        onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <input type="checkbox"
                        name='userStatus'
                        checked={newUser.userStatus}
                        onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Senha</label>
                    <input type="password"
                        name='userPassword'
                        value={newUser.userPassword}
                        onChange={handleInputChange}></input>
                </div>
                <button type='submit'>Salvar</button>
            </form>
        </div>
    );
}

export default CreateUser;
