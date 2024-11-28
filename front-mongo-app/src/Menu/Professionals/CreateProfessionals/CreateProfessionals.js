import './CreateProfessionalsVisual.css';
import React, { useState } from 'react';
import apiConfig from '../../../api/apiConfig'; // Adapte o caminho conforme sua estrutura

function CreateProfessionals() {
    
    const [professionals, setProfessionals] = useState([]);
    const [newProfessional, setNewProfessional] = useState({
        professionalName: '',
        professionalSpeciality: '',
        professionalEmail: '',
        professionalPhone: '',
        professionalStatus: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProfessional((prevProfessional) => ({
            ...prevProfessional,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const postProfessional = async () => {
        try {
            const response = await apiConfig.post('/professionals', newProfessional);
            setProfessionals([...professionals], response.data); // Adiciona o novo profissional à lista
            setNewProfessional({  // Reseta o formulário
                professionalName: '',
                professionalSpeciality: '',
                professionalEmail: '',
                professionalPhone: '',
                professionalStatus: false
            });
        } catch (err) {
            console.log(`Erro ao criar profissional: ${err}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postProfessional();
    };

    return(
        <div>
            <h1>Criar Novo Profissional</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text"
                    name='professionalName'
                    value={newProfessional.professionalName}
                    onChange={handleInputChange} />
                </div>
                <div className="divInput">
                    <label>Especialidade</label>
                    <input type="text"
                    name='professionalSpeciality'
                    value={newProfessional.professionalSpeciality}
                    onChange={handleInputChange} />
                </div>
                <div className="divInput">
                    <label>E-mail</label>
                    <input type="email"
                    name='professionalEmail'
                    value={newProfessional.professionalEmail}
                    onChange={handleInputChange} />
                </div>
                <div className="divInput">
                    <label>Telefone</label>
                    <input type="text"
                    name='professionalPhone'
                    value={newProfessional.professionalPhone}
                    onChange={handleInputChange} />
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <input type="checkbox"
                    name='professionalStatus'
                    checked={newProfessional.professionalStatus}
                    onChange={handleInputChange} />
                </div>
                <button type='submit'>Salvar</button>
            </form>
        </div>
    );
}

export default CreateProfessionals;