import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import apiConfig from '../../../api/apiConfig';

function CreateAppointment() {
    const navigate = useNavigate();

    const [newAppointment, setNewAppointment] = useState({
        specialty: '',   
        comments: '',
        date: '',
        student: '',
        professional: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value
        }));
    };

    // Função para formatar a data corretamente no formato YYYY-MM-DDTHH:mm
    const formatDateTimeLocal = (dateTime) => {
        const dateObj = new Date(dateTime);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;  // Formato para datetime-local
    };

    const postAppointment = async () => {
        try {
            // Não converter para ISO aqui, apenas enviar o horário local no formato correto
            const localDate = new Date(newAppointment.date);  // A data vem sem fuso horário
            const formattedDate = localDate.toISOString();  // Aqui o `toISOString` ainda pode afetar, então vamos garantir a hora local

            const appointmentData = {
                specialty: newAppointment.specialty,
                comments: newAppointment.comments,
                date: formattedDate,  // Envia no formato ISO com hora local
                student: newAppointment.student,
                professional: newAppointment.professional
            };

            const response = await apiConfig.post('/appointments', appointmentData); // Criando novo agendamento

            console.log('Agendamento criado com sucesso:', response.data);
            setNewAppointment({
                specialty: '',
                comments: '',
                date: '',
                student: '',
                professional: ''
            });
            navigate('/appointments');
        } catch (error) {
            console.log('Erro ao criar agendamento:', error.response ? error.response.data : error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postAppointment();
    };

    return (
        <div>
            <h1>Criando novo Agendamento</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Especialidade</label>
                    <input
                        type="text"
                        name="specialty"
                        value={newAppointment.specialty}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Comentários</label>
                    <input
                        type="text"
                        name="comments"
                        value={newAppointment.comments}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Data</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Nome do Estudante</label>
                    <input
                        type="text"
                        name="student"
                        value={newAppointment.student}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Nome do Profissional</label>
                    <input
                        type="text"
                        name="professional"
                        value={newAppointment.professional}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateAppointment;
