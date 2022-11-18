import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import Loader from '../Loader/Loader';

const Login = () => {
  const { handleLogin, error, setError, loading } = useContext(authContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginUser() {
    if(!email.trim() || !password.trim()){
      alert('Some inputs are empty!');
      return;
    };
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    handleLogin(formData, email, navigate);
  };

  useEffect(() => {
    setError(false);
  }, []);

  if(loading){
    return <Loader />
  };

  return (
    <div>
      <h2>Login</h2>
      {error ? <h2>{error}</h2> : null}
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default Login