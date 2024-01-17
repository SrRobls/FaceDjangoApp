import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import PublicacionesPerfil from './PublicacionesPerfil';

const Perfil = () => {
  const { id } = useParams();
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [infoPerfil, setInfoPerfil] = useState([]);
  const [estadoSolicitudEnviado, setEstadoSolicitudEnviado] = useState(false);
  const [esAmigo, setEsAmigo] = useState(false);
  const publicaciones = infoPerfil?.publicaciones;
  const logoPerfil = infoPerfil.user?.logo;
  const idPerfil = infoPerfil.user?.id;
  const usernamePerfil = infoPerfil.user?.username;
  const nombrePerfil = infoPerfil.user?.first_name;
  const apellidoPerfil = infoPerfil.user?.last_name;

  useEffect(() => { 
    const obtenerPerfilAmistad = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`,
          {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          }
        );
        const solicitudes = response.data;
        solicitudes.forEach(solicitud => {
          console.log(solicitud.user_sender, solicitud.user_receptor)
          if (solicitud.user_sender == user_info.user.id && solicitud.user_receptor == id) {
            console.log('entramos')
            if (solicitud.is_aceptada) {
              console.log('cambiamos estado amigo');
              setEsAmigo(true);
            } else {
              console.log('cambiamos estado solicitud');
              setEstadoSolicitudEnviado(true);
              setEsAmigo(false)
            }
          }});
      } catch (error) {
        console.error('Error: No se pudo obtener las amistades', error);
      }
    };
    
    obtenerPerfilAmistad();
  }, [id, user_info.token]);
  

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/autenticacion/${id}`,
          {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          }
        );
        setInfoPerfil(response.data);
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, [id, user_info.token]);

  const handleLogout = () => {
    localStorage.removeItem('info_user');
    window.location.href = '/'; 
  };

  const handleLogoutClick = () => {
    console.log("Haciendo clic en Logout");
    handleLogout();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  }; 

  const enviarAmistad = async (userSender, userReceptor) => {
    try {
      const data = {
        user_sender: userSender,
        user_receptor: userReceptor,
      };
      console.log(data)
  
      const response = await axios.post('http://localhost:8000/api/amigos/enviar_solicitud', data, {
        headers: {
          'Authorization': `Token ${user_info.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Solicitud de amistad enviada:', response.data);
    } catch (error) {
      console.error('Error al enviar solicitud de amistad:', error);
    }
  };
  
  const ToggleEnviarAmistad = () => {
    const userSenderID = user_info.user?.id;
    const userReceptorID = idPerfil;
    enviarAmistad(userSenderID, userReceptorID);
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
          {/* <HamburguesaInicioPerfil user_info={user_info} handleLogout={handleLogout} logo={logoUrl.user?.logo || ''} /> */}
        </div>
        <div className='btn-logout'>
          <button onClick={handleLogoutClick} className='btn-logout'>Logout</button>
        </div>
      </header>

      <div className='main-content'>
        <PublicacionesPerfil info_user={user_info} publicaciones={publicaciones} />
      </div>

      <aside className='user-info-desktop'>
        <div className='menu-content-desktop'>
          <div className='menu-content' onClick={stopPropagation}>
            <div className='user-info'>
              <img src={logoPerfil} alt='Profile' />
              <br /> <br />
              <div className='info-user'>
                <p> <span>Username:</span> {usernamePerfil}</p>
                <p> <span>Nombre:</span> {nombrePerfil} {apellidoPerfil}</p>
              </div>
              <br />
            </div>
            <Link to={`/inicio`}>
              <button>Volver a inicio!</button>
            </Link>
            <br /><br />
            {!esAmigo && !estadoSolicitudEnviado ? ( 
              <button onClick={ToggleEnviarAmistad}>Enviar Solicitud de Amistad</button>
            ) : estadoSolicitudEnviado ? (
              <span>Solicitud de Amistad Enviada</span>
            ) : (
              <button>Enviar Mensaje</button>
            )}
          </div>
        </div>
      </aside>

      <footer className='main-footer'>
        <p>FaceDjango By SrRobls </p>
        <p>2023</p>
      </footer>
    </div>
  );
};

export default Perfil;
