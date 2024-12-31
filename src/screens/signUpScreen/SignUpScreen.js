import '../signInScreen/_signInScreen.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import logo from '../../assets/icono.JPG'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../../settings/cognito'; // Tu configuración de Cognito  
import { toast } from "react-toastify";
export const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const iniciarSesion = () => {
        navigate("/signin");
    }
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);


        /*if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
          }*/


        const userPool = new CognitoUserPool(COGNITO_CONFIG);

        const {formBasicEmail,formBasicPassword,formBasicName}=form
        const email = formBasicEmail.value
        const password = formBasicPassword.value
        const username = formBasicName.value

        const signUpData = {
            Username: email,
            Password: password
          };


        try {
            // Promisificar la función signUp
            const signUpPromise = () =>
              new Promise((resolve, reject) => {
                userPool.signUp(
                  signUpData.Username,
                  signUpData.Password,
                  signUpData.UserAttributes,
                  null,
                  (err, data) => {
                    if (err) {
                      return reject(err);
                    }
                    resolve(data);
                  }
                );
              });
            
            const data = await signUpPromise();
            console.log('Usuario registrado con éxito:', data);
            toast.success("Usuario creado, revisa tu correo.", {
                position: "bottom-center",
                
              });
            //alert('Verifica tu correo electrónico para confirmar tu cuenta.');
            // Redirigir al usuario a la página de inicio de sesión o realizar cualquier acción adicional
            navigate("/confirmar")
      
          } catch (err) {
            setError(err.message || 'Ocurrió un error al registrar al usuario.');
            console.error('Error en el registro:', err);
            toast.error(err.message, {
                position: "bottom-center",
                                  
            });
          }


    };
    return (
        <div className='signIn__container'>
            <div className='signIn__form--container'>
                <h2 style={{ marginTop: "20px" }}>Crear Cuenta</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required type="text" placeholder="Juan Perez" />
                        <Form.Control.Feedback type="invalid">
                            Nombre invalido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="correo@gmail.com" />
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
                            Crear cuenta
                        </Button>
                    </div>
                </Form>
            </div>
            <div className='signIn__info--container' style={{ position: "relative" }}>
                <div className='icono__container'>
                    <img className='icono__grande' src={logo}></img>
                </div>
                <p style={{ color: "white", textAlign: "center", paddingBottom: "30px" }}>
                    Tu aliado en el análisis y visualización de datos financieros.
                </p>

                <div style={{ position: "absolute", bottom: 0 }}>
                    <p style={{ color: "white", margin: "0" }}>Ya tienes cuenta?</p>
                    <Button style={{ marginBottom: "5px" }} variant="primary" onClick={iniciarSesion}>
                        Iniciar sesión
                    </Button>
                </div>
            </div>
        </div>
    )
}