import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Publicacion from './Publicacion'

const Publicaciones = () => {

    const user_info = window.localStorage.getItem('user_info')
    const [publicaciones, setPublicaciones] = useState()
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/publicaciones', {headers:{
                'Authorization': `Token 2ac9c430eacc756492e2acb4f07ff396f97110d9`
            }})
            .then(response => {
                if (response.data === []){
                    return
                }
                setPublicaciones(response.data)
                console.log(response.data)
            })
    }, [])
    
    

  return (


    <div>
        {publicaciones ? publicaciones.map(publicacion => (
            <Publicacion key={publicacion} publicacion = {publicacion} />
        )) : <div>
            No hay publicaciones para mostrar
        </div>}
    </div>
  )
}

export default Publicaciones