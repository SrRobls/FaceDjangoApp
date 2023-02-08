import React, { useState, useRef } from 'react'
import axios from 'axios'

const Login = () => {


  const username = useRef()
  const password = useRef()
  const [message, setMessage] = useState('')

  const LoginUser = async (userData) =>{
    try{
        let response = await axios.post('http://localhost:8000/api/autenticacion/login', userData)
        setMessage(response.data.message)
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

  return (
    <div>
      {message}
        <form>
          <label>
            username: 
            <input type="text" id='username' ref={username} required/>
          </label>
          <label>
            password: 
            <input type="password" id='password' ref={password} required/>
          </label>
        </form>
        <button onClick={handleClick}>Entrar</button>
    </div>
  )
}

export default Login