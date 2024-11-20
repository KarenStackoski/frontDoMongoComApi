import './CreateTeachersd.css'

function CreateTeachers() {
    return(
        <div>
            <h1>Criando novo Professor</h1>
            <form>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>Disciplina</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>Telefone</label>
                    <input type="text"></input>
                </div>
                <div className="divInput">
                    <label>E-mail</label>
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

export default CreateTeachers;