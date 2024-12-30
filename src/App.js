
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



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route index element={<HomeScreen />} /> */}
          <Route path="/" element={ isAuthenticated ? <Navigate to="/home" />: <SignInScreen setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/recuperar" element={isAuthenticated ? <RecuperarScreen />: <Navigate to="/" />} />
          <Route path="/movimientos" element={isAuthenticated ? <MovimientosScreen /> : <Navigate to="/" />} />
          <Route path="/categorias" element={isAuthenticated ? <CategoriasScreen /> : <Navigate to="/" />} />
          <Route path="/home" element={isAuthenticated ? <HomeScreen /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
