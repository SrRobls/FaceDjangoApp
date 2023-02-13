import React, {useRef} from 'react'
import axios from 'axios'

const CrearPublicacion = () => {

    const info = useRef()
    const info_user = window.localStorage.getItem('info_user')

    const handleClick = () => {

        let info_publicacion = {
            "user": "8",
            "info": info.current.value
        }

        if (info_publicacion.info === ''){
            return
        }

        Crear(info_publicacion)

    }

    const Crear = async (info) => {
        try{
            let Response = await axios.post('http://localhost:8000/api/publicaciones/crear_publicacion', info, {headers:{
                'Authorization': `Token 2ac9c430eacc756492e2acb4f07ff396f97110d9`
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