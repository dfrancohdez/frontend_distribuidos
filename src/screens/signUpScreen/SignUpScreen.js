import '../signInScreen/_signInScreen.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import logo from '../../assets/icono.JPG'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const SignUpScreen=()=>{
    const navigate = useNavigate();
    const iniciarSesion = ()=> {
        navigate("/signin");
      }
    const [validated, setValidated] = useState(false);
    
      const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
    };
    return (
        <div className='signIn__container'>
            <div className='signIn__form--container'>
                <h2 style={{marginTop:"20px"}}>Crear Cuenta</h2>
                <Form  noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required type="text" placeholder="Juan Perez" />
                        <Form.Control.Feedback type="invalid">
                            Nombre invalido
                        </Form.Control.Feedback>
                    </Form.Group>
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
                            Crear cuenta
                        </Button>
                    </div>
                </Form>
            </div>
            <div className='signIn__info--container' style={{position:"relative"}}>
                <div className='icono__container'>
                    <img className='icono__grande' src={logo}></img>
                </div>
                <p style={{color:"white",textAlign:"center",paddingBottom:"30px"}}>
                    Tu aliado en el análisis y visualización de datos financieros.
                </p>

                <div style={{position:"absolute",bottom:0}}>
                    <p style={{color:"white",margin:"0"}}>Ya tienes cuenta?</p>
                    <Button style={{marginBottom:"5px"}} variant="primary" onClick={iniciarSesion}>
                            Iniciar sesión
                    </Button>
                </div>
            </div>
        </div>
    )
}