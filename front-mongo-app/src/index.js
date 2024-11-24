import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Menu from './Menu/Menu';
import Users from './Menu/Users/Users';
import CreateUsers from './Menu/Users/CreateUser/Create';
import Students from './Menu/Students/Students'; // Importando Students
import CreateStudents from './Menu/Students/CreateStudents/Create'; // Importando CreateStudent
import Events from './Menu/Events/Events';
import CreateEvents from './Menu/Events/CreateEvents/CreateEvents';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/users" element={<Users />} />
        <Route path="/createUsers" element={<CreateUsers />} />
        <Route path="/students" element={<Students />} /> {/* Rota para lista de Alunos */}
        <Route path="/createStudents" element={<CreateStudents />} /> {/* Rota para criar Alunos */}
        <Route path='/Events' element={<Events/>}/>
        <Route path='/createEvent' element={<CreateEvents />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

