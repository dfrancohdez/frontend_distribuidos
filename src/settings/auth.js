// src/utils/auth.js
export const saveTokens = (tokens) => {
    localStorage.setItem('idToken', tokens.idToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('username', tokens.username);
  };
  
  export const getToken = (tokenType) => {
    return localStorage.getItem(tokenType);
  };
  
  export const clearTokens = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
  };
  export const signOut = () => {
    // Eliminar los tokens almacenados en localStorage
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    
    // Puedes redirigir al usuario a la página de login
    window.location.href = '/'; // O puedes usar un enrutador como react-router-dom
  };