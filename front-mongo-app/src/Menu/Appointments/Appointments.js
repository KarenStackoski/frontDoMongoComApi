import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

function Appointments() {
    const navigate = useNavigate();
    console.log('Buscando todos os agendamentos...');


    // speciality: String,
    // comments: String,
    // date: String,
    // student: String,
    // professional: String,

    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        speciality: '',
        comments: '',
        date: '',
        student: '',
        professional: ''
    });

    const [editAppointmentById, setEditAppointmentById] = useState(null);

    const getAppointments = async () => {
        console.log('Buscando todos os agendamentos...');
        
        try {
            const response = await apiConfig.get('/appointments');
            console.log('Agendamentos retornados:', response.data);
            setAppointments(response.data);
        } catch (error) {
            console.log('Erro ao buscar todos os agendamentos:', error);
        }
    };

    const handleEditAppointment = (appointment) => {
        setEditAppointmentById(appointment._id);
        setNewAppointment({
            appointmentName: appointment.appointmentName,
            speciality: appointment.speciality,
            comments: appointment.comments,
            date: appointment.date,
            student: appointment.student,
            professional: appointment.professional
        });
    };

    const postAppointment = async () => {
        try {
            const response = await apiConfig.post('/appointments', newAppointment);
            setAppointments([...appointments, response.data]);
            setNewAppointment({
                appointmentName: '',
                speciality: '',
                comments: '',
                date: '',
                student: '',
                professional: ''
            });
        } catch (error) {
            console.log('Erro ao criar agendamento:', error);
        }
    };

    const putAppointmentById = async () => {
        try {
            const response = await apiConfig.put(`/appointments/${editAppointmentById}`, newAppointment);
            setAppointments(
                appointments.map((appointment) => 
                    appointment._id === editAppointmentById ? response.data : appointment
                )
            );
            setEditAppointmentById(null);
            setNewAppointment({
                appointmentName: '',
                speciality: '',
                comments: '',
                date: '',
                student: '',
                professional: ''
            });
        } catch (error) {
            console.log('Erro ao editar agendamento:', error);
        }
    };

    const deleteAppointmentById = async (appointmentId) => {
        try {
            await apiConfig.delete(`/appointments/${appointmentId}`);
            setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
        } catch (error) {
            console.log('Não foi possível deletar o agendamento:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editAppointmentById) {
            putAppointmentById();
        } else {
            postAppointment();
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const handleCreateAppointment = () => {
        navigate('/createAppointment');
    };

    return (
        <div>
            <h1>Agendamentos</h1>
            <button onClick={handleCreateAppointment}>+ Criar</button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Especialidade</th>
                        <th>Comentários</th>
                        <th>Data</th>
                        <th>Estudante</th>
                        <th>Profissional</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                            <td scope='row'>{appointment._id}</td>
                            <td>{appointment.speciality}</td>
                            <td>{appointment.comments}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.student}</td>
                            <td>{appointment.professional}</td>
                            <td>
                                <button onClick={() => deleteAppointmentById(appointment._id)}>Deletar</button>
                                <button onClick={() => handleEditAppointment(appointment)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editAppointmentById && (
                <div>
                    <h1>Editando Agendamento</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type='text'
                                name='appointmentName'
                                value={newAppointment.appointmentName}
                                onChange={(e) => setNewAppointment({ ...newAppointment, appointmentName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Especialidade:</label>
                            <input
                                type='text'
                                name='speciality'
                                value={newAppointment.speciality}
                                onChange={(e) => setNewAppointment({ ...newAppointment, speciality: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Comentários:</label>
                            <input
                                type='text'
                                name='comments'
                                value={newAppointment.comments}
                                onChange={(e) => setNewAppointment({ ...newAppointment, comments: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Data:</label>
                            <input
                                type='date'
                                name='date'
                                value={newAppointment.date}
                                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Estudante:</label>
                            <input
                                type='text'
                                name='student'
                                value={newAppointment.student}
                                onChange={(e) => setNewAppointment({ ...newAppointment, student: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Profissional:</label>
                            <input
                                type='text'
                                name='professional'
                                value={newAppointment.professional}
                                onChange={(e) => setNewAppointment({ ...newAppointment, professional: e.target.value })}
                            />
                        </div>
                        <button type='submit'>Salvar</button>
                        <button onClick={() => setEditAppointmentById(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Appointments;
