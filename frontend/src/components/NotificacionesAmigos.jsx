import axios from 'axios'
import React, {useState, useEffect} from 'react'

const NotificacionesAmigos = ({info_user}) => {

    const user_info = info_user
    const [solictudes, setSolicitudes] = useState([])
    console.log(user_info)

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {headers:{
            'Authorization': `Token ${user_info.token}`
        }})
        .then(response => {
            setSolicitudes(response.data)
        })
    }, [])

    

  return (
    <div>
        
    </div>
  )
}

export default NotificacionesAmigos