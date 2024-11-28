import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import apiConfig from '../../../api/apiConfig';

function CreateAppointment() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        speciality: '',
        comments: '',
        date: '',
        student: '',
        professional: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const postAppointment = async () => {
        try {
            const response = await apiConfig.post('/appointments', newAppointment);
            setAppointments([...appointments, response.data]);
            setNewAppointment({
                speciality: '',
                comments: '',
                date: '',
                student: '',
                professional: ''
            });
            navigate('/appointments');
        } catch (error) {
            console.log('Erro ao criar agendamento:', error);
        }
    };

    const handleSubmit = (e) => {
        console.log('handleSubmit');
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
                        name="speciality"
                        value={newAppointment.speciality}
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
                    <label>Nome do profissional</label>
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
