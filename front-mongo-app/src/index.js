import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Menu from './Menu/Menu';
import Users from './Menu/Users/Users'
import CreateUsers from './Menu/Users/CreateUser/Create'
import Teachers from './Menu/Teachers/Teachers'
import CreateTeachers from './Menu/Teachers/CreateTeacher/TeachersCreate'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/users' element={<Users />}/>
        <Route path='/teachers' element={<Teachers />}/>
        <Route path='/createteacher' element={<CreateTeachers />}/>
        <Route path='/createUsers' element={<CreateUsers />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

