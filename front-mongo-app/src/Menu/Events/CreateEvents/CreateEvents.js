import './CreateEvents.css';
import React, { useState } from 'react';
import apiConfig from '../../../api/apiConfig'; // Caminho correto para o apiConfig.js

function CreateEvents() {
    const [newEvent, setNewEvent] = useState({
        description: '',
        comments: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const postEvent = async () => {
        try {
            const response = await apiConfig.post('/events', newEvent);
            console.log('Evento criado:', response.data);
            setNewEvent({
                description: '',
                comments: '',
                date: ''
            });
        } catch (err) {
            console.log(`Erro ao criar evento: ${err}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postEvent();
    };

    return (
        <div>
            <h1>Criando novo Evento</h1>
            <form onSubmit={handleSubmit}>
                <div className="divInput">
                    <label>Descrição</label>
                    <input
                        type="text"
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Comentários</label>
                    <input
                        type="text"
                        name="comments"
                        value={newEvent.comments}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="divInput">
                    <label>Data</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={newEvent.date}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateEvents;
