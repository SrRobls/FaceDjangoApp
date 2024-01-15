
import React, {useState, useEffect} from 'react'
import Publicacion from './Publicacion'

const PublicacionesPerfil = ({info_user, publicaciones}) => {

    const user_info = info_user
    const publicacionesPerfil = publicaciones



  return (


    <div className='publicaciones'>

        {publicacionesPerfil ? publicacionesPerfil.map(publicacion => (
            <Publicacion key={publicacion.id} publicacion = {publicacion} info_user = {user_info}/>
        )) : <div></div>}

    </div>
  )
}

export default PublicacionesPerfil