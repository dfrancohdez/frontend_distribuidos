// src/pages/VerifyEmail.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import '../signInScreen/_signInScreen.scss'
import '../recuperarScreen/_recuperarScreen.scss'
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../../settings/cognito';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const ConfirmarScreen = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleVerification = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);

        const {formBasicEmail,formBasicCode}=form

        const poolData = {
            UserPoolId: COGNITO_CONFIG.UserPoolId,
            ClientId: COGNITO_CONFIG.ClientId,
        };

        const userPool = new CognitoUserPool(poolData);

        const cognitoUser = new CognitoUser({ Username: formBasicEmail.value, Pool: userPool });
        event.preventDefault();
        event.stopPropagation();
        cognitoUser.confirmRegistration(formBasicCode.value, true, (err, result) => {
            if (err) {
                setError(err.message || JSON.stringify(err));
                return;
            }
            //alert('Tu cuenta ha sido confirmada con éxito!');
            navigate("/signin")
        });
    };

    return (
        <div className='signIn__container'>
            <div className='recuperar__form--container'>
                <h2 style={{marginTop:"20px"}}>Confirmar correo electrónico</h2>
                <p style={{width:"100%",maxWidth:"300px",paddingBottom:"30px"}}>Revisa tu correo electrónico.</p>
                <Form  style={{width:"100%",maxWidth:"300px"}} noValidate validated={validated} onSubmit={handleVerification}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="correo@gmail.com" />
                        <Form.Control.Feedback type="invalid">
                            Correo invalido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCode">
                        <Form.Label>Código de verificación</Form.Label>
                        <Form.Control required type="number" placeholder="1234" />
                        <Form.Control.Feedback type="invalid">
                            Código invalido.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='recuperar__button--container'>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                        <div style={{width:"100px"}}>
                            <p style={{margin:0}}><span> <Link to="/signin">Iniciar sesión</Link></span></p>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
