import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

function Appointments() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        specialty: '',
        comments: '',
        date: '',
        student: '',
        professional: ''
    });

    const [editAppointmentById, setEditAppointmentById] = useState(null);

    // Função para formatar a data corretamente para o campo datetime-local (YYYY-MM-DDTHH:mm)
    const formatDateTimeLocal = (dateTime) => {
        const dateObj = new Date(dateTime);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;  // Formato para datetime-local
    };

    const getAppointments = async () => {
        try {
            const response = await apiConfig.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.log('Erro ao buscar todos os agendamentos:', error);
        }
    };

    const handleEditAppointment = (appointment) => {
        setEditAppointmentById(appointment._id);

        // Formatar a data para o formato correto (YYYY-MM-DDTHH:mm)
        const formattedDate = formatDateTimeLocal(appointment.appointmentDate);

        setNewAppointment({
            specialty: appointment.appointmentSpeciality,
            comments: appointment.appointmentComments,
            date: formattedDate, // Atualiza com a data formatada
            student: appointment.appointmentStudent,
            professional: appointment.appointmentProfessional
        });
    };

    // Função para ajustar a data para o fuso horário UTC
    const convertToUTC = (dateTime) => {
        const localDate = new Date(dateTime);
        // Ajusta para UTC (subtraindo a diferença do fuso horário local)
        const utcDateTime = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
        return utcDateTime.toISOString(); // Retorna no formato UTC (YYYY-MM-DDTHH:mm:ss.sssZ)
    };

    const postAppointment = async () => {
        try {
            const formattedDateTime = convertToUTC(newAppointment.date); // Converte para UTC antes de enviar

            const appointmentData = {
                ...newAppointment,
                date: formattedDateTime // Data e hora formatada para envio
            };

            const response = await apiConfig.post('/appointments', appointmentData);
            setAppointments([...appointments, response.data]);
            setNewAppointment({
                specialty: '',
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
            const formattedDateTime = convertToUTC(newAppointment.date);  // Converte para UTC antes de enviar

            const appointmentData = {
                ...newAppointment,
                date: formattedDateTime // Envia a data ajustada para UTC
            };

            const response = await apiConfig.put(`/appointments/${editAppointmentById}`, appointmentData);
            setAppointments(
                appointments.map((appointment) => 
                    appointment._id === editAppointmentById ? response.data : appointment
                )
            );
            setEditAppointmentById(null);  // Resetar o ID de edição
            setNewAppointment({
                specialty: '',
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
                            <td>{appointment._id}</td>
                            <td>{appointment.appointmentSpeciality}</td>
                            <td>{appointment.appointmentComments}</td>
                            <td>{formatDateTimeLocal(appointment.appointmentDate)}</td>
                            <td>{appointment.appointmentStudent}</td>
                            <td>{appointment.appointmentProfessional}</td>
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
                            <label>Especialidade:</label>
                            <input
                                type="text"
                                name="specialty"
                                value={newAppointment.specialty}
                                onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Comentários:</label>
                            <input
                                type="text"
                                name="comments"
                                value={newAppointment.comments}
                                onChange={(e) => setNewAppointment({ ...newAppointment, comments: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Data e Hora:</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={newAppointment.date}
                                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Estudante:</label>
                            <input
                                type="text"
                                name="student"
                                value={newAppointment.student}
                                onChange={(e) => setNewAppointment({ ...newAppointment, student: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Profissional:</label>
                            <input
                                type="text"
                                name="professional"
                                value={newAppointment.professional}
                                onChange={(e) => setNewAppointment({ ...newAppointment, professional: e.target.value })}
                            />
                        </div>
                        <button type="submit">Salvar</button>
                        <button onClick={() => setEditAppointmentById(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Appointments;
