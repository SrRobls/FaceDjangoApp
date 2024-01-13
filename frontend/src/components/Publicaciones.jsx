import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Publicacion from './Publicacion'
import CrearPublicacion from './CrearPublicacion'

const Publicaciones = ({info_user}) => {

    const user_info = info_user
    const [publicaciones, setPublicaciones] = useState()

    const addPublication = (newPublication) => {
        setPublicaciones([...publicaciones, newPublication])
    }
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/publicaciones/', {headers:{
                'Authorization': `Token ${user_info.token}`
            }})
            .then(response => {
                setPublicaciones(response.data)
                
            })
    }, [])
    
    console.log(publicaciones)


  return (


    <div className='publicaciones'>
        
        <CrearPublicacion info_user = {user_info} addPublication = {addPublication}/>

        {publicaciones ? publicaciones.map(publicacion => (
            <Publicacion key={publicacion.id} publicacion = {publicacion} info_user = {user_info}/>
        )) : <div></div>}

    </div>
  )
}

export default Publicaciones