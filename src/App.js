import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routing from './Routing';
import AuthContextProvider from './contexts/authContext';

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App