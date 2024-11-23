import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import apiConfig from '../../api/apiConfig';

function Teachers() {

    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({
        teacherName: '',
        teacherSchoolDisciplines: '',
        teacherContact: '',
        teacherPhone: '',
        teacherStatus: false
    });

    const [editingTeacherId, setEditingTeacherId] = useState(null);

    const getTeachers = async () => {
        try {
            const response = await apiConfig.get('/teachers');
            console.log('usuários retornados', response.data);
            setTeachers(response.data);
        } catch (err) {
            console.log('Erro ao buscar usuários: ', err);
        }
    }

    const handleEditTeacher = (teacher) => {
        setEditingTeacherId(teacher._id); 
        setNewTeacher({
            teacherName: teacher.teacherName,
            teacherSchoolDisciplines: teacher.teacherSchoolDisciplines,
            teacherContact: teacher.teacherContact,
            teacherPhone: teacher.teacherPhone,
            teacherStatus: teacher.teacherStatus,
        });
    };

    const updateTeacher = async () => {
        try {
            const response = await apiConfig.put(`/teachers/${editingTeacherId}`, newTeacher);
            setTeachers(
                teachers.map((teacher) =>
                    teacher._id === editingTeacherId ? response.data : teacher
                )
            );
            setEditingTeacherId(null);
            setNewTeacher({
                teacherName: '',
                teacherSchoolDisciplines: '',
                teacherContact: '',
                teacherPhone: '',
                teacherStatus: false,
            });
        } catch (err) {
            console.log(`Erro ao atualizar o professor id ${editingTeacherId}: ${err}`);
        }
    };

    const deleteTeacherById = async (teacherId) =>{
        try {
            console.log (`Tentando deletar professor(a) id: ${teacherId}`);
            await apiConfig.delete(`teachers/${teacherId}`);
            setTeachers(teachers.filter((teacher)=> teacher._id !== teacherId))
        } catch (err) {
            console.log(`Não foi possível deletar o prof;essor(a) id ${teacherId}. Erro: ${err}`)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTeacher();
    };

    useEffect(() =>{
        getTeachers();
    }, []);

    const handleCreateTeachers = (e) => {
        e.preventDefault();  
        navigate('/createTeacher'); 
      };

    return (
        <div>
            <h1>Professores</h1>
            <button onClick={handleCreateTeachers}>+ Criar</button>
            <table border='2'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Discliplina</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ativo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher)=>(
                        <tr key = {teacher._id}>
                            <td>{teacher._id}</td>
                            <td>{teacher.teacherName}</td>
                            <td>{teacher.teacherSchoolDisciplines}</td>
                            <td>{teacher.teacherContact}</td>
                            <td>{teacher.teacherPhone}</td>
                            <td>{teacher.teacherStatus ? 'Sim' : 'Não'}</td>
                            <td>
                                <button onClick={()=> deleteTeacherById(teacher._id)}>Deletar</button>
                                <button onClick={() => handleEditTeacher(teacher)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {editingTeacherId && ( //A partir daqui ele cria os campos para edição do usuário
                <div>
                    <h2>Editando Professor</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="teacherName"
                                value={newTeacher.teacherName}
                                onChange={(e) =>
                                    setNewTeacher({ ...newTeacher, teacherName: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Disciplina:</label>
                            <input
                                type="text"
                                name="teacherSchoolDisciplines"
                                value={newTeacher.teacherSchoolDisciplines}
                                onChange={(e) =>
                                    setNewTeacher({
                                        ...newTeacher,
                                        teacherSchoolDisciplines: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label>E-mail:</label>
                            <input
                                type="text"
                                name="teacherContact"
                                value={newTeacher.teacherContact}
                                onChange={(e) =>
                                    setNewTeacher({ ...newTeacher, teacherContact: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="teacherPhone"
                                value={newTeacher.teacherPhone}
                                onChange={(e) =>
                                    setNewTeacher({ ...newTeacher, teacherPhone: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <input
                                type="checkbox"
                                name="teacherStatus"
                                checked={newTeacher.teacherStatus}
                                onChange={(e) =>
                                    setNewTeacher({ ...newTeacher, teacherStatus: e.target.checked })
                                }
                            />
                        </div>
                        <button type="submit">Salvar Alterações</button>
                        <button onClick={() => setEditingTeacherId(null)}>Cancelar</button>
                    </form>
                </div>
            )}
            
        </div>
    );
}

export default Teachers;