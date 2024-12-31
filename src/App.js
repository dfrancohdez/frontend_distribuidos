
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { SignInScreen } from "./screens/signInScreen/SignInScreen";
import { SignUpScreen } from "./screens/signUpScreen/SignUpScreen";
import { HomeScreen } from "./screens/homeScreen/HomeScreen";
import { Layout } from "./screens/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './_app.scss';
import { RecuperarScreen } from "./screens/recuperarScreen/RecuperarScreen";
import { MovimientosScreen } from "./screens/movimientosScreen/MovimientosScreen";
import { CategoriasScreen } from "./screens/categoriasScreen/CategoriasScreen";
import React, { useState, useEffect,useContext } from 'react';
import { ConfirmarScreen } from "./screens/confirmarScreen/ConfirmarScreen";
import { AuthProvider, AuthContext } from './screens/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  /*const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  }*/

  // Componente para rutas protegidas

  const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    return user ? children : <Navigate to="/signin" />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: redirige a /home si el usuario está autenticado */}
          <Route
            path="/"
            element={
              <AuthContext.Consumer>
                {({ user }) =>
                  user ? <Navigate to="/home" /> : <SignInScreen />
                }
              </AuthContext.Consumer>
            }
          />

          {/* Rutas públicas */}
          <Route
            path="/signin"
            element={
              <AuthContext.Consumer>
                {({ user }) =>
                  user ? <Navigate to="/home" /> : <SignInScreen />
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthContext.Consumer>
                {({ user }) =>
                  user ? <Navigate to="/home" /> : <SignUpScreen />
                }
              </AuthContext.Consumer>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/recuperar"
            element={
              <PrivateRoute>
                <RecuperarScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/movimientos"
            element={
              <PrivateRoute>
                <MovimientosScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <CategoriasScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />

          {/* Ruta siempre accesible */}
          <Route path="/confirmar" element={<ConfirmarScreen />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>

  );
}


export default App;
