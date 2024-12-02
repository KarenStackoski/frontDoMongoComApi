import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import apiConfig from '../../api/apiConfig';

function Students() {
    
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [newStudents, setNewStudents] = useState({
        studentsName: '',
        studentsAge: '',
        studentsPhone_number: '',
        studentsStatus: false
    });

    const [editingStudentsId, setEditingStudentsId] = useState(null);

    const getStudents = async () => {
        try {
            const response = await apiConfig.get('/students');
            console.log('alunos retornados', response.data);
            setStudents(response.data);
        } catch (err) {
            console.log('Erro ao buscar alunos: ', err);
        }
    }

    const handleEditStudents = (students) => {
        setEditingStudentsId(students._id); 
        setNewStudents({
            studentsName: students.studentsName,
            studentsAge: students.studentsAge,
            studentsPhone_number: students.studentsPhone_number,
            studentsStatus: students.studentsStatus,
        });
    };

    const updateStudents = async () => {
        try {
            const response = await apiConfig.put(`/students/${editingStudentsId}`, newStudents);
            setStudents(
                students.map((students) =>
                    students._id === editingStudentsId ? response.data : students
                )
            );
            setEditingStudentsId(null);
            setNewStudents({
                studentsName: '',
                studentsAge: '',
                studentsPhone_number: '',
                studentsStatus: false
            });
        } catch (err) {
            console.log(`Erro ao atualizar o Estudante id ${editingStudentsId}: ${err}`);
        }
    };

    const deleteStudentById = async (studentsId) =>{
        try {
            console.log (`Tentando deletar aluno por id: ${studentsId}`);
            await apiConfig.delete(`students/${studentsId}`);
            setStudents(students.filter((students)=> students._id !== studentsId))
        } catch (err) {
            console.log(`Não foi possível deletar o aluno(a) id ${studentsId}. Erro: ${err}`)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStudents();
    };

    useEffect(() =>{
        getStudents();
    }, []);

    const handleCreateStudents = (e) => {
        e.preventDefault(); 
        navigate('/createStudents'); 
    };

    return (
        <div>
            <h1>Alunos</h1>
            <button onClick={handleCreateStudents}>+ Criar</button>
            <table border="2">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((students)=>(
                        <tr key = {students._id}>
                            <td>{students._id}</td>
                            <td>{students.studentsName}</td>
                            <td>{students.studentsAge}</td>
                            <td>{students.studentsPhone_number}</td>
                            <td>{students.studentsStatus ? 'Sim' : 'Não'}</td>
                            <td>
                                <button onClick={()=> deleteStudentById(students._id)}>Deletar</button>
                                <button onClick={() => handleEditStudents(students)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {editingStudentsId && ( //A partir daqui ele cria os campos para edição do aluno(a)
                <div>
                    <h2>Editando Aluno</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="studentsName"
                                value={newStudents.studentsName}
                                onChange={(e) =>
                                    setNewStudents({ ...newStudents, studentsName: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Idade:</label>
                            <input
                                type="text"
                                name="StudentsAge"
                                value={newStudents.studentsAge}
                                onChange={(e) =>
                                    setNewStudents({
                                        ...newStudents,
                                        studentsAge: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="studentsPhone_number"
                                value={newStudents.studentsPhone_number}
                                onChange={(e) =>
                                    setNewStudents({ ...newStudents, studentsPhone_number: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <input
                                type="checkbox"
                                name="studentstatus"
                                checked={newStudents.studentsStatus}
                                onChange={(e) =>
                                    setNewStudents({ ...newStudents, studentsStatus: e.target.checked })
                                }
                            />
                        </div>
                        <button type="submit">Salvar Alterações</button>
                        <button onClick={() => setEditingStudentsId(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Students;
