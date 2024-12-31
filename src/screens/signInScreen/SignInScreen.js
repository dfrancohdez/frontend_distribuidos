import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState,useContext } from 'react';
import logo from '../../assets/icono.JPG'

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signIn } from "aws-amplify/auth"
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../../settings/cognito';
import { saveTokens } from '../../settings/auth';
import { AuthContext } from '../AuthProvider';
import './_signInScreen.scss'


import { Amplify } from 'aws-amplify';
/*
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '1u4qitkrivvodl36bk3mlv7pte',
      userPoolId: 'us-east-1_4m9l7dn6T'
    }}
});*/

  const userPool = new CognitoUserPool(COGNITO_CONFIG);

export const SignInScreen = ({ setIsAuthenticated }) => {
  const { handleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const crearCuenta = ()=> {
        navigate("/signup");
      }
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);



    //amplify
    /*const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    //inicio de session
    const {formBasicEmail,formBasicPassword}=form
    try {
        const data = await signIn({
            username: formBasicEmail.value,
            password: formBasicPassword.value})
        
        console.log('Usuario autenticado:', data);
      } catch (err) {
        setError(err.message);
        console.error('Error en inicio de sesión:', err);
      }
  };*/
    //cognito
    /*const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
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
                  setIsAuthenticated(true);
                  window.location.href = window.location.href;
                  navigate("/")
                    
                },
                onFailure: (err) => {
                  reject(err);
                },
              });
            });
            setIsAuthenticated(true);
            window.location.href = window.location.href;
            
            
          } catch (err) {
            setError(err.message || 'Error durante el inicio de sesión');
          }
      };*/

    return (
        <div className='signIn__container'>
            <div className='signIn__form--container'>
                <h2 style={{marginTop:"20px"}}>Iniciar Sesión</h2>
                <Form  noValidate validated={validated} onSubmit={handleSignIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="name@example.com" />
                        <Form.Control.Feedback type="invalid">
                            Correo invalido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Contraseña invalida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className='signIn__button--container'>
                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                        <div style={{width:"200px"}}>
                            <p style={{margin:0}}>Olvidaste tu contraseña?<span> <Link to="/recuperar">Recuperar</Link></span></p>
                        </div>
                    </div>
                </Form>
            </div>
            <div className='signIn__info--container'>
                <div className='icono__container'>
                    <img className='icono__grande' src={logo}></img>
                </div>
                <p style={{color:"white",textAlign:"center"}}>
                    Tu aliado en el análisis y visualización de datos financieros.
                </p>
                
                <Button style={{marginBottom:"5px"}} variant="primary" type="submit" onClick={crearCuenta}>
                        Crear Cuenta
                </Button>
            </div>
        </div>
    )
}