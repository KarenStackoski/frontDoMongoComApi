import './StudentsCreate.css';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../../api/apiConfig';

function CreateStudents() {
    
    const [students, setStudents] = useState([]);
    const [newStudents, setNewStudents] = useState({
        studentsName: '',
        studentsAge: '',
        studentsPhone_number: '',
        studentsStatus: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewStudents((prevStudents) => ({
            ...prevStudents,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const postStudents = async () => {
        try {
            const response = await apiConfig.post('/students', newStudents);
            setStudents([...students], response.data);
            setNewStudents({
                studentsName: '',
                studentsAge: '',
                studentsPhone_number: '',
                studentsStatus: false
            })
        } catch (err) {
            console.log(`Erro ao criar estudante: ${err}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postStudents();
    };

    return (
        <div>
            <h1>Criando novo Aluno</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text" 
                    name = 'studentsName'
                    placeholder="Digite o nome do aluno" required 
                    value = {newStudents.studentsName}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Idade</label>
                    <input type="number" 
                    name="studentsAge" 
                    placeholder="Digite a idade do aluno" required 
                    value = {newStudents.studentsAge}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Telefone</label>
                    <input type="text" 
                    name="studentsPhone_number" 
                    placeholder="Digite o telefone do aluno" required 
                    value = {newStudents.studentsPhone_number}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <select name="studentsStatus" required
                        value = {newStudents.studentsStatus}
                        onChange={handleInputChange}>
                        <option value="">Selecione</option>
                        <option value="on">Ativo</option>
                        <option value="off">Inativo</option>
                    </select>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateStudents;
