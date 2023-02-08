import React, {useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
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

        let irLogin = () =>{
            history.push('/')
        }
        
        const createUser = async (userData) =>{
            try{
                let response = await axios.post('http://localhost:8000/api/autenticacion/registrar', userData)
                setMessage('Creado!')
                setTimeout(irLogin, 800)
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

      return (
        <div>
            {message}
        <form className='form-registro'>
          <label>
            Username:&nbsp;
            <input type="text" id='username' ref={username} required/>
          </label>  
          <label>
            Nombre:&nbsp;  
            <input type="text" id='nombre' ref={nombre} required/>
          </label>
          <label>
            Apellido:&nbsp;  
            <input type="text" id='apellido' ref={apellido} required/>
          </label>
          <label>
            Email:&nbsp;
            <input type="email" id='email' ref={email} required/>
          </label>
          <label>
            password:&nbsp;
            <input type="password" id='password' ref={password} required/>
          </label>
          <label>
            confirmar password:&nbsp;
            <input type="password" id='confirmar_password' ref={confirmar_password} required/>
          </label>
        </form>
        <div>
            <p>Pon la url de la foto de perfil que desees. Es opcional</p>
            <label htmlFor="">
                Url Imgagen: &nbsp;
                <input type="text" name="" id="url_imagen" ref={url_imagen}/>
            </label>
        </div>
        <button onClick={handleClick}>Registrar</button>
        </div>
      )
    }
    
    export default Register