import React, { createContext, useState, useEffect} from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../settings/cognito';
import { saveTokens,signOut } from '../settings/auth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();


const userPool = new CognitoUserPool(COGNITO_CONFIG);

export const AuthProvider = ({ children }) => {
   // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            console.error(err);
            setUser(null);
          } else {
            setUser(currentUser);
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSignIn = async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          //inicio de session
          const {formBasicEmail,formBasicPassword}=form
          try {
              const username=formBasicEmail.value
              const password=formBasicPassword.value
  
              const authenticationDetails = new AuthenticationDetails({
                Username: username,
                Password: password,
              });
        
              const userData = {
                Username: username,
                Pool: userPool,
              };
        
              const cognitoUser = new CognitoUser(userData);
        
              const result=await new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authenticationDetails, {
                  onSuccess: (result) => {
                    console.log('Token de ID:', result.getIdToken().getJwtToken());
                    console.log('Token de acceso:', result.getAccessToken().getJwtToken());
                    
                    resolve(result);
                    saveTokens({
                      idToken: result.getIdToken().getJwtToken(),
                      accessToken: result.getAccessToken().getJwtToken(),
                      username:username
                    });
                    setUser(cognitoUser);

                    toast.success("Credenciales correctas.", {
                      position: "bottom-center",
                      
                    });
                      
                  },
                  onFailure: (err) => {
                    

                    reject(err);
                  },
                });
              });
              
              
            } catch (err) {
              //setError(err.message || 'Error durante el inicio de sesión');
              console.log(err)
              toast.error(err.message, {
                position: "bottom-center",
                
              });
            }
    };


  const handleSignOut = () => {
          // Eliminar los tokens del navegador
        signOut();
        const currentUser = userPool.getCurrentUser();
        if (currentUser) {
        currentUser.signOut();
        
        }
        setUser(null);
      
          // Redirigir al login después de cerrar sesión
        //navigate('/signin');
    };
  return (
    <AuthContext.Provider value={{ user, loading, handleSignOut, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
