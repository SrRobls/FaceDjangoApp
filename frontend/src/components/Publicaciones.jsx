import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Publicacion from './Publicacion'

const Publicaciones = () => {

    const user_info = window.localStorage.getItem('user_info')
    const [publicaciones, setPublicaciones] = useState()
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/publicaciones/', {headers:{
                'Authorization': `Token 92d7c6f700b6de023b1ded32ad08dc879f054c5a`
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