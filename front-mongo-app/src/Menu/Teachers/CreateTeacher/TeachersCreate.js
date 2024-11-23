import './CreateTeachersd.css'
import React, { useState, useEffect } from 'react';
import apiConfig from '../../../api/apiConfig';

function CreateTeachers() {
    
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({
        teacherName: '',
        teacherSchoolDisciplines: '',
        teacherContact: '',
        teacherPhone: '',
        teacherStatus: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const postTeacher = async () => {
        try {
            const response = await apiConfig.post('/teachers', newTeacher);
            setTeachers([...teachers], response.data);
            setNewTeacher({
                teacherName: '',
                teacherSchoolDisciplines: '',
                teacherContact: '',
                teachePhone: '',
                teacherStatus: false
            })
        } catch (err) {
            console.log(`Erro ao criar professor(a): ${err}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postTeacher();
    };

    return(
        <div>
            <h1>Criando novo Professor</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text"
                    name = 'teacherName'
                    value = {newTeacher.teacherName}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Disciplina</label>
                    <input type="text"
                    name = 'teacherSchoolDisciplines'
                    value = {newTeacher.teacherSchoolDisciplines}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Telefone</label>
                    <input type="text"
                    name = 'teacherPhone'
                    value = {newTeacher.teacherPhone}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>E-mail</label>
                    <input type="text"
                    name = 'teacherContact'
                    value = {newTeacher.teacherContact}
                    onChange={handleInputChange}></input>
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <input type="checkBox"
                    name = 'teacherStatus'
                    value = {newTeacher.teacherStatus}
                    onChange={handleInputChange}></input>
                </div>
                <button type='submit'>Salvar</button>
            </form>
        </div>
    );
}

export default CreateTeachers;