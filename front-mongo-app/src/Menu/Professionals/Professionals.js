import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

function Professionals() {

    const navigate = useNavigate();

    const [professionals, setProfessionals] = useState([]);
    const [newProfessional, setNewProfessional] = useState({
        professionalName: '',
        professionalSpeciality: '',
        professionalEmail: '',
        professionalPhone: '',
        professionalStatus: false
    });

    const [editingProfessionalId, setEditingProfessionalId] = useState(null);

    // Função para buscar profissionais da API
    const getProfessionals = async () => {
        try {
            const response = await apiConfig.get('/professionals');
            console.log('Profissionais retornados', response.data);
            setProfessionals(response.data);
        } catch (err) {
            console.log('Erro ao buscar profissionais: ', err);
        }
    };

    // Prepara o formulário para edição
    const handleEditProfessional = (professional) => {
        setEditingProfessionalId(professional._id); 
        setNewProfessional({
            professionalName: professional.professionalName,
            professionalSpeciality: professional.professionalSpeciality,
            professionalEmail: professional.professionalEmail,
            professionalPhone: professional.professionalPhone,
            professionalStatus: professional.professionalStatus,
        });
    };

    // Atualiza um profissional na API
    const updateProfessional = async () => {
        try {
            const response = await apiConfig.put(`/professionals/${editingProfessionalId}`, newProfessional);
            setProfessionals(
                professionals.map((professional) =>
                    professional._id === editingProfessionalId ? response.data : professional
                )
            );
            setEditingProfessionalId(null);
            setNewProfessional({
                professionalName: '',
                professionalSpeciality: '',
                professionalEmail: '',
                professionalPhone: '',
                professionalStatus: false,
            });
        } catch (err) {
            console.log(`Erro ao atualizar o profissional id ${editingProfessionalId}: ${err}`);
        }
    };

    // Deleta um profissional na API
    const deleteProfessionalById = async (professionalId) => {
        try {
            console.log(`Tentando deletar profissional id: ${professionalId}`);
            await apiConfig.delete(`/professionals/${professionalId}`);
            setProfessionals(professionals.filter((professional) => professional._id !== professionalId));
        } catch (err) {
            console.log(`Não foi possível deletar o profissional id ${professionalId}. Erro: ${err}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfessional();
    };

    // Busca profissionais ao carregar o componente
    useEffect(() => {
        getProfessionals();
    }, []);

    // Navega para a página de criação
    const handleCreateProfessional = (e) => {
        e.preventDefault();  
        navigate('/createProfessional'); 
    };

    return (
        <div>
            <h1>Profissionais</h1>
            <button onClick={handleCreateProfessional}>+ Criar</button>
            <table border='2'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ativo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {professionals.map((professional) => (
                        <tr key={professional._id}>
                            <td>{professional._id}</td>
                            <td>{professional.professionalName}</td>
                            <td>{professional.professionalSpeciality}</td>
                            <td>{professional.professionalEmail}</td>
                            <td>{professional.professionalPhone}</td>
                            <td>{professional.professionalStatus ? 'Sim' : 'Não'}</td>
                            <td>
                                <button onClick={() => deleteProfessionalById(professional._id)}>Deletar</button>
                                <button onClick={() => handleEditProfessional(professional)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulário para edição */}
            {editingProfessionalId && (
                <div>
                    <h2>Editando Profissional</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="professionalName"
                                value={newProfessional.professionalName}
                                onChange={(e) =>
                                    setNewProfessional({ ...newProfessional, professionalName: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Especialidade:</label>
                            <input
                                type="text"
                                name="professionalSpeciality"
                                value={newProfessional.professionalSpeciality}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        professionalSpeciality: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label>E-mail:</label>
                            <input
                                type="email"
                                name="professionalEmail"
                                value={newProfessional.professionalEmail}
                                onChange={(e) =>
                                    setNewProfessional({ ...newProfessional, professionalEmail: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="professionalPhone"
                                value={newProfessional.professionalPhone}
                                onChange={(e) =>
                                    setNewProfessional({ ...newProfessional, professionalPhone: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <input
                                type="checkbox"
                                name="professionalStatus"
                                checked={newProfessional.professionalStatus}
                                onChange={(e) =>
                                    setNewProfessional({ ...newProfessional, professionalStatus: e.target.checked })
                                }
                            />
                        </div>
                        <button type="submit">Salvar Alterações</button>
                        <button onClick={() => setEditingProfessionalId(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Professionals;