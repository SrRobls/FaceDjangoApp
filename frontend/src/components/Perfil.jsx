import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import PublicacionesPerfil from './PublicacionesPerfil';

const Perfil = () => {
  const { id } = useParams();
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [infoPerfil, setInfoPerfil] = useState([]);
  const publicaciones = infoPerfil?.publicaciones;
  const logoPerfil = infoPerfil.user?.logo;
  const idPerfil = infoPerfil.user?.id;
  const usernamePerfil = infoPerfil.user?.username;
  const nombrePerfil = infoPerfil.user?.first_name;
  const apellidoPerfil = infoPerfil.user?.last_name;
  const [desconocido, setDesconocido] = useState(true)
  const [enviado, setEnviado] = useState(false)
  const [sonAmigos, setSonAmigos] = useState(false)
  const [meEnvioSolicitud, setMeEnvioSolicitud] = useState(false)


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
        setDesconocido(true)
        setEnviado(false)
        setSonAmigos(false)
        setMeEnvioSolicitud(false)
        try{
          let response2 = await axios.get(
            `http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`,
            {
              headers: {
                'Authorization': `Token ${user_info.token}`
              }
            });
            const solicitudes = response2.data
            solicitudes.forEach(solicitud => {
              console.log(solicitud)
              // console.log(solicitud.user_sender, user_info.user.id)
              // console.log(solicitud.user_receptor, id)
              if (solicitud.user_sender == user_info?.user.id && solicitud.user_receptor == id) {
                console.log('primer if')
                setDesconocido(false)
                setEnviado(true)
                if (solicitud.is_aceptada) {
                  setEnviado(false)
                  setSonAmigos(true)
                }
              }
              console.log(solicitud.user_receptor, user_info.user.id)
              console.log(solicitud.user_sender, id)
              if (solicitud.user_receptor == user_info.user.id && solicitud.user_sender == id){
                console.log('segundo if')
                setDesconocido(false)
                setMeEnvioSolicitud(true)
                if (solicitud.is_aceptada) {
                  setEnviado(false)
                  setSonAmigos(true)
                }
              }
            })
            
        }catch(error){
          console.error('error: ', error)
        }
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, [id]);

  

  

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

      const response = await axios.post('http://localhost:8000/api/amigos/enviar_solicitud', data, {
        headers: {
          'Authorization': `Token ${user_info.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Solicitud de amistad enviada:', response.data);

      // Actualizar los estados después de enviar la solicitud
    } catch (error) {
      console.error('Error al enviar solicitud de amistad:', error);
    }
  };

  const ToggleEnviarAmistad = () => {
    const userSenderID = user_info.user?.id;
    const userReceptorID = id;
    setEnviado(true)
    setDesconocido(false)
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
          <Buscador info_user={user_info} />
        </div>
        <div className='header-right'>
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
              <button>Volver a mi Perfil</button>
            </Link>
            <br /><br />
            {desconocido &&
              <button type="" onClick={ToggleEnviarAmistad}>Enviar Solicitud</button>}
            {enviado && 
              <span>Ya le haz enviado amistad!</span>}
            {sonAmigos &&
              <button type="">Mensaje!</button>}
            {meEnvioSolicitud && 
              <span>Aceptar Solicitud!</span>}
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

