import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routing from './Routing';
import AuthContextProvider from './contexts/authContext';
import ProductsContextProvider from './contexts/productContext';

const App = () => {
  return (
    <ProductsContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </AuthContextProvider>
    </ProductsContextProvider>
  )
}

export default App