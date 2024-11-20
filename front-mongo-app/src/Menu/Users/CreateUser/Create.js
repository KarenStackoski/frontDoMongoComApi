import './Create.css'

function CreateUser() {
    return(
        <div>
            <h1>Criando novo Usuário</h1>
            <form>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>E-mail</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>Usuário</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>Nível de usuário</label>
                    <input type="select"></input>
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <input type="checkBox"></input>
                </div>
                <button type='submit'>Salvar</button>
            </form>
        </div>
    );
}

export default CreateUser;