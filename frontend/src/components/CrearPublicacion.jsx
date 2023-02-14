import React, {useRef} from 'react'
import axios from 'axios'

const CrearPublicacion = ({info_user}) => {

    const info = useRef()
    const user_info = info_user

    const handleClick = () => {

        let info_publicacion = {
            "user": user_info.user.id,
            "info": info.current.value
        }

        if (info_publicacion.info === ''){
            return
        }

        Crear(info_publicacion)
        info.current.value = ''

    }

    const Crear = async (info) => {
        try{
            let Response = await axios.post('http://localhost:8000/api/publicaciones/crear_publicacion', info, {headers:{
                'Authorization': `Token ${info_user.token}`
            }})
            return Response.data
        }catch(error){
            console.log(error.response.status)
            if(error.response.status >= 400){
                console.log(error)
            }
        }
        
    }

  return (
    <div>
        <h3>Crea una prublicacion!</h3>
        <textarea name="crear_publicacion" id="crear_publicacion" cols="30" rows="10" ref={info}></textarea>
        <button onClick={handleClick}>Crear</button>
    </div>
  )
}

export default CrearPublicacion