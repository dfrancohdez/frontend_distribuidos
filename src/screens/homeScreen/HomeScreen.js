import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../settings/auth';  // Sign-out de LocalStorage
import { getToken } from '../../settings/auth';  // Sign-out de LocalStorage
import { CognitoUser,CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../../settings/cognito'; // Para obtener los datos del pool
import { AuthContext } from '../AuthProvider';

export const HomeScreen=()=>{
    const { handleSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(getToken("username"))
    const userPool = new CognitoUserPool(COGNITO_CONFIG);

    const cognitoUser = new CognitoUser({
        Username: getToken("username"), // Cambia esto por el nombre de usuario real
        Pool: userPool // Usando el User Pool configurado
    });

    /*const handleSignOut = () => {
        // Eliminar los tokens del navegador
        signOut();
        
        // Cerrar sesión también en Cognito (si es necesario)
        cognitoUser.signOut();
    
        // Redirigir al login después de cerrar sesión
        navigate('/signin');
      };*/
    
    return(
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
    )
}