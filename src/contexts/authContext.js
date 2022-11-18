import React, { useState } from 'react';
import axios from 'axios';

export const authContext = React.createContext();

const API = 'https://backend-for-fs-makers.herokuapp.com/api/v1';

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegister(formData, navigate){
        setLoading(true);
        try {
            const res = await axios.post(`${API}/account/register/`, formData);
            console.log(res);
            navigate('/register-success');
        } catch(err) {
            console.log(err);
            setError(Object.values(err.response.data).flat(2));
        } finally {
            setLoading(false);
        };
    };

    async function handleLogin(formData, email, navigate){
        setLoading(true);
        try {
            const res = await axios.post(`${API}/account/login/`, formData);
            console.log(res);
            localStorage.setItem('tokens', JSON.stringify(res.data));
            localStorage.setItem('email', email);
            setCurrentUser(email);
            navigate('/');
        } catch(err) {
            console.log(err);
            setError([err.response.data.detail]);
        } finally {
            setLoading(false);
        };
    };

    return (
        <authContext.Provider value={{
            currentUser,
            error,
            loading,
            handleRegister,
            setError,
            handleLogin
        }}>
            { children }
        </authContext.Provider>
    );
};

export default AuthContextProvider;
