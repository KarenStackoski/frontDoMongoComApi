import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

function Events() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        description: '',
        comments: '',
        date: ''
    });

    const [editingEventId, setEditingEventId] = useState(null);

    // Função para buscar todos os eventos
    const getEvents = async () => {
        try {
            const response = await apiConfig.get('/events');
            setEvents(response.data);
        } catch (err) {
            console.log('Erro ao buscar eventos:', err);
        }
    };

    // Função para editar evento
    const handleEditEvent = (event) => {
        setEditingEventId(event._id);
        setNewEvent({
            description: event.description,
            comments: event.comments,
            date: event.date
        });
    };

    // Função para atualizar evento
    const updateEvent = async () => {
        try {
            const response = await apiConfig.put(`/events/${editingEventId}`, newEvent);
            setEvents(
                events.map((event) =>
                    event._id === editingEventId ? response.data : event
                )
            );
            setEditingEventId(null);
            setNewEvent({
                description: '',
                comments: '',
                date: ''
            });
        } catch (err) {
            console.log(`Erro ao atualizar o evento id ${editingEventId}: ${err}`);
        }
    };

    // Função para deletar evento
    const deleteEventById = async (eventId) => {
        try {
            await apiConfig.delete(`/events/${eventId}`);
            setEvents(events.filter((event) => event._id !== eventId));
        } catch (err) {
            console.log(`Erro ao deletar evento id ${eventId}: ${err}`);
        }
    };

    // Função para enviar o formulário de edição
    const handleSubmit = (e) => {
        e.preventDefault();
        updateEvent();
    };

    // Função para navegar até a página de criação de evento
    const handleCreateEvent = (e) => {
        e.preventDefault();
        navigate('/createEvent');
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <h1>Eventos</h1>
            <button onClick={handleCreateEvent}>+ Criar Evento</button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Comentários</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event._id}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.comments}</td>
                            <td>
                                <button onClick={() => deleteEventById(event._id)}>Deletar</button>
                                <button onClick={() => handleEditEvent(event)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingEventId && (
                <div>
                    <h2>Editando Evento</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Descrição:</label>
                            <input
                                type="text"
                                name="description"
                                value={newEvent.description}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, description: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Comentários:</label>
                            <input
                                type="text"
                                name="comments"
                                value={newEvent.comments}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, comments: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Data:</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={newEvent.date}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, date: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit">Salvar Alterações</button>
                        <button onClick={() => setEditingEventId(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Events;
