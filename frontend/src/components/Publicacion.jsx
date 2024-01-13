import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Publicacion = ({ publicacion, user_info}) => {
  const [username_logo, SetUsername_logo] = useState()
  const info_user = user_info;
  const token = JSON.parse(window.localStorage.getItem('info_user'));

  // console.log(info_user)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/publicaciones/usaurio_logo/${publicacion.user}`, {headers:{
      'Authorization': `Token ${token.token}`
  }})
  .then(response => {
    SetUsername_logo(response.data)
  })
  }, [])

  console.log(username_logo)
  

  return (
    <div className='cardStyles'cardStyles>
      <header>
        <img src={username_logo.logo} alt="" />
        <h6>{username_logo.username}</h6>
      </header>
      <p className='contentStyles'>{publicacion.info}</p>
    </div>
  );
};

export default Publicacion;
