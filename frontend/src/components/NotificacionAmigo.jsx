import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const NotificacionAmigo = ({info_solicitud}) => {
    console.log(info_solicitud)
    const user_info = JSON.parse(window.localStorage.getItem('info_user'))
    const [perfil, setPerfil] = useState()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/autenticacion/${info_solicitud.user_sender}`, {headers:{
                'Authorization': `Token ${user_info.token}`
            }})
            .then(response => {
                console.log(response.data)
                setPerfil(response.data)
            })
    }, [])

    let aceptarSolicitud = async () => {
        
    }

    let handleClick = async () => {
        
    }

    return (
        <div className='solicitudes-amistad'>
            {perfil && perfil.user.username &&  
            <Link to={`/usuario/${info_solicitud.user_sender}`}>
                <span>{perfil.user.username}  <Button onClick={handleClick}>Aceptar</Button></span>&nbsp;&nbsp;
            </Link>
            }
        </div>
    )

}

export default NotificacionAmigo