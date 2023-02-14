import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Publicacion from './Publicacion'

const Publicaciones = ({info_user}) => {

    const user_info = info_user
    const [publicaciones, setPublicaciones] = useState()
    const [message, setMessage] = useState('')


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/publicaciones/', {headers:{
                'Authorization': `Token ${user_info.token}`
            }})
            .then(response => {
                setPublicaciones(response.data)
            })
    }, [])
    
    

  return (


    <div>
        {publicaciones ? publicaciones.map(publicacion => (
            <Publicacion key={publicacion.id} publicacion = {publicacion} />
        )) : <div></div>}
        {message}

    </div>
  )
}

export default Publicaciones