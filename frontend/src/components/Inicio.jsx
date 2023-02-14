import React from 'react'
import CrearPublicacion from './CrearPublicacion'
import Publicaciones from './Publicaciones'

const inicio = () => {

  const user_info = JSON.parse(window.localStorage.getItem('info_user'))

  return (
    <div>
        inicio
        <CrearPublicacion info_user = {user_info}/>
        <Publicaciones info_user = {user_info}/>
    </div>
  )
}

export default inicio