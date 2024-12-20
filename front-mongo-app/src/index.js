import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Menu from './Menu/Menu';

import Users from './Menu/Users/Users'
import CreateUsers from './Menu/Users/CreateUser/Create'
import Teachers from './Menu/Teachers/Teachers'
import CreateTeachers from './Menu/Teachers/CreateTeacher/TeachersCreate'
import Students from './Menu/Students/Students';
import CreateStudents from './Menu/Students/CreateStudents/StudentsCreate'; 
import Events from './Menu/Events/Events';
import CreateEvents from './Menu/Events/CreateEvents/CreateEvents';
import CreateProfessionals from './Menu/Professionals/CreateProfessionals/CreateProfessionals';
import Professionals from './Menu/Professionals/Professionals';
import Appointments from './Menu/Appointments/Appointments';
import CreateAppointments from './Menu/Appointments/CreateAppointments/Create';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/teachers' element={<Teachers />}/>
        <Route path='/createteacher' element={<CreateTeachers />}/>
        <Route path="/users" element={<Users />} />
        <Route path="/createUsers" element={<CreateUsers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/createStudents" element={<CreateStudents />} />
        <Route path='/Events' element={<Events/>}/>
        <Route path='/createEvent' element={<CreateEvents />} />
        <Route path='/createProfessional' element={<CreateProfessionals />} />
        <Route path='/professionals' element={<Professionals />} />
        <Route path='/Appointments' element={<Appointments/>}/>
        <Route path='/createAppointment' element={<CreateAppointments />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

