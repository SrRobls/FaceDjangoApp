import React, {useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

    const Register = () => {
        const history = useHistory()
        const [message, setMessage] = useState()
        const username = useRef()
        const nombre = useRef()
        const apellido = useRef()
        const email = useRef()
        const password = useRef()
        const confirmar_password = useRef()
        const url_imagen = useRef()
        const [boolError, setBoolError] = useState(true)

        let irLogin = () =>{
            history.push('/')
        }
        
        const createUser = async (userData) =>{
            try{
                let response = await axios.post('http://localhost:8000/api/autenticacion/registrar', userData)
                setMessage('Creado!')
                setTimeout(irLogin, 800)
                setBoolError(false)
                return response.data
            }catch(error){
                console.log(error.response.status)
                if(error.response.status >= 400){
                    setMessage(error.response.data[0])
                }
            }
        }

        const handleClick = () =>{

            if(confirmar_password.current.value !== password.current.value){
                setMessage('Las contraseñas no coinciden')
                return
            }

            let userData = {
                "username": username.current.value,
                "first_name": nombre.current.value,
                "last_name": apellido.current.value,
                "email":email.current.value,
                "password":password.current.value,
                "ulr_imagen": url_imagen.current.value
            }

            if(userData.username === "" | userData.first_name === "" | userData.last_name === "" | userData.email === "" | userData.password === ""){
                setMessage('Debes rellenar todos los campos')
            }else{
                return createUser(userData)
            }
        }

        function cerrar(){
          setMessage()
          setBoolError(true)
        }

      return (
        <div className=' registro d-flex justify-content-center align-items-center'>
            <Card className='form-registro card mx-auto'>
              <Card.Title><h2>Registro</h2></Card.Title>
              <Card.Body className='card-body'>
              <form className='d-flex flex-column justify-content-center align-items-center'>
                <label>
                  Username: <br/>
                  <input type="text" id='username' ref={username} required/>
                </label> 
                <label>
                  Nombre: <br/>  
                  <input type="text" id='nombre' ref={nombre} required/>
                </label>
                <label>
                  Apellido: <br/>  
                  <input type="text" id='apellido' ref={apellido} required/>
                </label>
                <label>
                  Email: <br/>
                  <input type="email" id='email' ref={email} required/>
                </label>
                <label>
                  password: <br/>
                  <input type="password" id='password' ref={password} required/>
                </label>
                <label>
                  confirmar password: <br/>
                  <input type="password" id='confirmar_password' ref={confirmar_password} required/>
                </label><br />
            </form>
            <div>
                <p>Pon la url de la foto de perfil que desees. Es opcional</p>
                <label htmlFor="">
                    Url Imagen:&nbsp;
                    <input type="text" name="" id="url_imagen" ref={url_imagen}/>
                </label>
            </div><br />
            <Button onClick={handleClick}>Registrar</Button>
              </Card.Body>
              {message && boolError ? 
                <Alert variant="danger" onClose={() => cerrar()} dismissible>
                  <Alert.Heading className='alert' ><p>{message}</p></Alert.Heading>
                </Alert> : <div></div>}
              {message && !boolError ? 
                <Alert variant='success' onClose={() => cerrar()} dismissible>
                <Alert.Heading className='alert' ><p>{message}</p></Alert.Heading>
              </Alert> : <div></div>}
            </Card>
        </div>
      )
    }
    
    export default Register