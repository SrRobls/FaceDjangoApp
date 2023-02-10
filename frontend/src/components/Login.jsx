import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const Login = () => {


  const username = useRef()
  const password = useRef()
  const [message, setMessage] = useState()
  const [boolError, setBoolError] = useState(true)


  const LoginUser = async (userData) =>{
    try{
        let response = await axios.post('http://localhost:8000/api/autenticacion/login', userData)
        setMessage(response.data.message)
        setBoolError(false)
        window.localStorage.setItem('info_user', await JSON.stringify(response.data))
        return response.data
    }catch(error){
        if(error.response.status >= 400){
            setMessage(error.response.data[0])
        }
    }
}

  let handleClick = async () => {
    let userData = {
      "username": username.current.value,
      "password": password.current.value
    }

    if(userData.username === "" | userData.password === "" ){
      setMessage('Debes rellenar todos los campos')
  }else{
      return LoginUser(userData)
  }
  }

  function cerrar(){
    setMessage()
    setBoolError(true)
  }

  return (
    <div className='login d-flex flex-column align-items-center justify-content-center'>
      <div className='title_port'>
        <h1>FaceDango</h1>
        <p>A social app project create with Django (DRF), ReactJs, Bootstrap and PostgreSQL. Enjoy it!.</p>
      </div>
      <Card className='form-login'>
      <Card.Body className='d-flex flex-column align-items-center justify-content-center card-body'>
        <Card.Title><h2>Login</h2></Card.Title>
        <form  className='d-flex flex-column justify-content-center align-items-center' action="">
          {message && boolError ? 
            <Alert variant="danger" onClose={() => cerrar()} dismissible>
               <Alert.Heading className='alert' ><p>{message}</p></Alert.Heading>
            </Alert> : <div></div>}
          {message && !boolError ? 
            <Alert variant='success' onClose={() => cerrar()} dismissible>
            <Alert.Heading className='alert' ><p>{message}</p></Alert.Heading>
          </Alert> : <div></div>}
          <label htmlFor="">
            Username: &nbsp;
            <input type="text"  ref={username}/>
          </label><br />
          <label htmlFor="">
            Password: &nbsp;
            <input type="password"  ref={password}/>
          </label>
        </form>
        <div><br />
          <Button onClick={handleClick}>Entrar</Button>&nbsp;&nbsp;
          <Link to={'/registro'}><Button>Registrarse</Button></Link>
        </div>
      </Card.Body>
      </Card>
    </div>
    
  )
}

export default Login
