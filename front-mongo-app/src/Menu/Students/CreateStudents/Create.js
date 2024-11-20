import './Create.css';

function CreateStudent() {
    return (
        <div>
            <h1>Criando novo Aluno</h1>
            <form>
                <div className="divInput">
                    <label>Nome</label>
                    <input type="text" name="studentsName" placeholder="Digite o nome do aluno" required />
                </div>
                <div className="divInput">
                    <label>Idade</label>
                    <input type="number" name="studentsAge" placeholder="Digite a idade do aluno" required />
                </div>
                <div className="divInput">
                    <label>Telefone</label>
                    <input type="text" name="studentsPhone_number" placeholder="Digite o telefone do aluno" required />
                </div>
                <div className="divInput">
                    <label>Status</label>
                    <select name="studentsStatus" required>
                        <option value="">Selecione</option>
                        <option value="on">Ativo</option>
                        <option value="off">Inativo</option>
                    </select>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CreateStudent;
