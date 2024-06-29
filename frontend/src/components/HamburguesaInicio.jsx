import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AmigosMoviles from './AmigosMoviles';
import NotificacionAmigo from './NotificacionAmigo';


const HamburguesaInicio = ({ user_info, handleLogout, logo }) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarAmigos, setMostrarAmigos] = useState(false);
  const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);
  const [solictudes, setSolicitudes] = useState([]);
  const [amigos, setAmigos] = useState([]);
  const ulrLogo = logo;
  

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {
  //       headers: { 'Authorization': `Token ${user_info.token}` }
  //     })
  //     .then(response => {
  //       const data = response.data;
  //       setSolicitudes(data.filter(d => !d.is_aceptada));
  //       setAmigos(data.filter(d => d.is_aceptada));
  //     });
  // }, [solictudes, amigos]);

  const handleLogoutClick = () => {
    handleLogout();
  };

  const toggleMostrarAmigos = () => {
    setMostrarAmigos(!mostrarAmigos);
    setMostrarSolicitudes(false);
  };

  const toggleMostrarSolicitudes = () => {
    setMostrarSolicitudes(!mostrarSolicitudes);
    setMostrarAmigos(false);
  };

  const toggleMostrarMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='hamburguesa' onClick={toggleMostrarMenu}>
      <div className='menu-icon'>☰</div>
      {mostrarMenu && (
        <div className='menu-content' onClick={stopPropagation}>
          {/* Contenido existente */}

          <div className='user-info'>
            <img src={ulrLogo} alt='Profile' />
            <br />
            <div className='info-user'>
              <p> <span>Username:</span> {user_info.user.username}</p>
              <p> <span>Nombre:</span> {user_info.user.first_name} {user_info.user.last_name}</p>
            </div>
            <br />
            
          </div>
          <Link to={`/usuario/${user_info.user.id}`}>
            <button>Ver Perfil</button>
          </Link>
          <br />
          {/* Nuevas secciones para amigos y solicitudes de amistad */}
          <div className='show-amigos'>
            <span onClick={toggleMostrarAmigos}>Amigos </span> 
            <br /> <br />
          </div>
          {mostrarAmigos && (
            <div className='amigos '>
              {/* Contenido de amigos */}
              {amigos.map(amigo => (
                <AmigosMoviles key={amigo.id} info_amigo={amigo} info_user={user_info} />
                ))}
                <br />
            </div>
          )}
          <div className='show-amigos'>
            <span onClick={toggleMostrarSolicitudes}>Solicitudes de amistad </span>
            <br /><br />
          </div>
          {mostrarSolicitudes && (
            <div>
              {/* Contenido de solicitudes de amistad */}
              {solictudes.map(solicitud => (
                <NotificacionAmigo key={solicitud.id} info_solicitud={solicitud} />
                ))}
            </div>
          )}
          <br /><br />
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default HamburguesaInicio;




