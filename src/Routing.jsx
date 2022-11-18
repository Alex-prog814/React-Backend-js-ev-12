import React from 'react';
import { Routes, Route } from 'react-router-dom';
// user
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegisterSuccess from './components/RegisterSuccess/RegisterSuccess';

const Routing = () => {
  return (
    <Routes>
        <Route path="*" element={<Loader />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Routing