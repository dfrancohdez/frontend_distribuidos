
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { SignInScreen } from "./screens/signInScreen/SignInScreen";
import { SignUpScreen } from "./screens/signUpScreen/SignUpScreen";
import { HomeScreen } from "./screens/homeScreen/HomeScreen";
import { Layout } from "./screens/layout/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';
import './_app.scss';
import { RecuperarScreen } from "./screens/recuperarScreen/RecuperarScreen";
import { MovimientosScreen } from "./screens/movimientosScreen/MovimientosScreen";
import { CategoriasScreen } from "./screens/categoriasScreen/CategoriasScreen";
import React, { useState, useEffect } from 'react';
import { ConfirmarScreen } from "./screens/confirmarScreen/ConfirmarScreen";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
       // Autenticación cargada
    }
    setIsLoading(false);
  }, []);
  console.log(isAuthenticated)
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige a /signin si no está autenticado, de lo contrario, va a /home */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <SignInScreen setIsAuthenticated={setIsAuthenticated} />} 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/home" /> : <SignInScreen />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/home" /> : <SignUpScreen />} 
        />
        
        {/* Aquí, el usuario será redirigido a /signin si no está autenticado */}
        <Route 
          path="/recuperar" 
          element={isAuthenticated ? <RecuperarScreen /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/movimientos" 
          element={isAuthenticated ? <MovimientosScreen /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/categorias" 
          element={isAuthenticated ? <CategoriasScreen /> : <Navigate to="/signin" />} 
        />
        
        {/* Página principal, solo accesible si el usuario está autenticado */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomeScreen /> : <Navigate to="/signin" />} 
        />
        <Route path="/confirmar" element={<ConfirmarScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
