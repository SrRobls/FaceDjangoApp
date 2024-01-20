import axios from 'axios'
import React, {useState, useEffect} from 'react'
import NotificacionAmigo from './NotificacionAmigo'
import Amigos from './Amigos'

const NotificacionesAmigos = ({info_user}) => {

    const user_info = info_user
    const [solictudes, setSolicitudes] = useState([])
    const [amigos, setAmigos] = useState([])

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {headers:{
            'Authorization': `Token ${user_info.token}`
        }})
        
        .then(
          response => {
            var data = response.data
            let noAceptadas = data.filter(d => !d.is_aceptada)
            let meEnviados = noAceptadas.filter(d => (d.user_receptor == user_info.user.id))
            setSolicitudes(meEnviados)
            setAmigos(data.filter(d => d.is_aceptada))
        })
    }, [])

    

  return (
    <div>
          {solictudes 
            ? solictudes
                .map(solicitud => (
            <NotificacionAmigo key={solicitud.id} info_solicitud = {solicitud} />
        )) : <div></div>}
        <h3>Amigos</h3>
        {amigos 
          ? amigos
            .map(amigo => (
              <Amigos key={amigo.id} info_amigo = {amigo} info_user = {user_info}/>
        )) : <div></div>}
    </div>
  )
}

export default NotificacionesAmigos