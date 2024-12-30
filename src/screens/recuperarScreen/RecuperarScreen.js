import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import logo from '../../assets/icono.JPG'
import '../signInScreen/_signInScreen.scss'
import './_recuperarScreen.scss'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const RecuperarScreen = () => {
    const navigate = useNavigate();
    const crearCuenta = ()=> {
        navigate("/signup");
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
            <div className='recuperar__form--container'>
                <h2 style={{marginTop:"20px"}}>Recuperar contraseña</h2>
                <p style={{width:"100%",maxWidth:"300px",paddingBottom:"30px"}}>Te enviaremos un correo a la siguiente dirección.</p>
                <Form  style={{width:"100%",maxWidth:"300px"}} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control required type="email" placeholder="correo@gmail.com" />
                        <Form.Control.Feedback type="invalid">
                            Correo invalido
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
    )
}