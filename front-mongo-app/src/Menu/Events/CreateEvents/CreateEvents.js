import './CreateEvents.css';

function CreateEvents() {
    return (
        <div>
            <h1>Criando novo Evento</h1>
            <form>
                <div className="divInput">
                    <label>Descrição</label>
                    <input type="text" placeholder="Descrição do evento"></input>
                </div>
                <div className="divInput">
                    <label>Comentários</label>
                    <input type="text" placeholder="Comentários"></input>
                </div>
                <div className="divInput">
                    <label>Data</label>
                    <input type="datetime-local"></input>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateEvents;
