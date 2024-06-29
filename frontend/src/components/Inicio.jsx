// Inicio.js

import React, { useState, useEffect } from 'react';
import Publicaciones from './Publicaciones';
import NotificacionesAmigos from './NotificacionesAmigos';
import Buscador from './Buscador';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import HamburguesaInicio from './HamburguesaInicio';
import axios from 'axios';
import AmigosMoviles from './AmigosMoviles';
import NotificacionAmigo from './NotificacionAmigo';

// ... (tu código anterior)

const Inicio = () => {
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [logoUrl, setLogoUrl] = useState({ user: { logo: '' } }); // Inicializa con una estructura similar para evitar errores
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarAmigos, setMostrarAmigos] = useState(false);
  const [mostrarSolicitudes, setMostrarSolicitudes] = useState(false);
  const [solictudes, setSolicitudes] = useState([]);
  const [amigos, setAmigos] = useState([]);
  const ulrLogo = logoUrl.user?.logo;

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {
  //       headers: { 'Authorization': `Token ${user_info.token}` }
  //     })
  //     .then(
  //       response => {
  //         var data = response.data
  //         let noAceptadas = data.filter(d => !d.is_aceptada)
  //         let meEnviados = noAceptadas.filter(d => (d.user_receptor === user_info.user.id))
  //         setSolicitudes(meEnviados)
  //         setAmigos(data.filter(d => d.is_aceptada))
  //     });
  // }, []);

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


  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/autenticacion/${user_info.user.id}`,
          {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          }
        );
        setLogoUrl(response.data);
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('info_user');
    window.location.href = '/'; 
  };

  return (
    <div className='container'>
      <header className='header'>
        <div className='header-left'>
          <h1>
            <Link to='/inicio'>FaceDjango!</Link>
          </h1>
        </div>
        <div className='header-center'>
          <Buscador info_user={user_info}></Buscador>
        </div>
        <div className='header-right'>
          <HamburguesaInicio user_info={user_info} handleLogout={handleLogout} logo={logoUrl.user?.logo || ''} />
        </div>
        <div className='btn-logout'>
          <button onClick={handleLogoutClick} className='btn-logout'>Logout</button>
        </div>
      </header>
  
      <div className='main-content'>
        <Publicaciones info_user={user_info} />
      </div>
  
      <aside className='user-info-desktop'>
        <div className='menu-content-desktop'>
        <div className='menu-content' onClick={stopPropagation}>
          {/* Contenido existente */}

          <div className='user-info'>
            <img src={ulrLogo} alt='Profile' />
            <br /> <br />
            <div className='info-user'>
              <p> <span>Username:</span> {user_info?.user.username}</p>
              <p> <span>Nombre:</span> {user_info?.user.first_name} {user_info?.user.last_name}</p>
            </div>
            <br />
            
          </div>
          <Link to={`/usuario/${user_info?.user.id}`}>
            <button>Ver Perfil</button>
          </Link>
          <br /> <br />
          {/* Nuevas secciones para amigos y solicitudes de amistad */}
          <div className='show-amigos'>
            <span onClick={toggleMostrarAmigos}>Amigos </span> 
            <br /> <br /> <br />
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
        </div>
        </div>
      </aside>
  
      <footer className='main-footer'>
        <p>FaceDjango By SrRobls </p>
        <p>2023</p>
      </footer>
    </div>
  );
  
}

export default Inicio;
