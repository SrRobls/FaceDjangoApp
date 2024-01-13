import React, { useRef } from 'react';
import axios from 'axios';

// import './CrearPublicacion.css'; // Asegúrate de tener un archivo de estilos para este componente

const CrearPublicacion = ({ info_user, addPublication }) => {
  const info = useRef();
  const user_info = info_user;
  const añadirPublication = addPublication;

  const handleClick = async () => {
    let info_publicacion = {
      user: user_info.user.id,
      info: info.current.value,
    };

    if (info_publicacion.info === '') {
      return;
    }

    try {
      let Response = await axios.post('http://localhost:8000/api/publicaciones/crear_publicacion', info_publicacion, {
        headers: {
          Authorization: `Token ${info_user.token}`,
        },
      });
      añadirPublication(info_publicacion);
      info.current.value = '';
      return Response.data;
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status >= 400) {
        console.log(error);
      }
    }
  };

  return (
    <div className="crear-publicacion-container">
      <h3>Crea una publicación</h3>
      <textarea className="publicacion-textarea" name="crear_publicacion" id="crear_publicacion" cols="30" rows="10" ref={info}></textarea>
      <button className="crear-publicacion-button" onClick={handleClick}>
        Crear
      </button>
    </div>
  );
};

export default CrearPublicacion;
