import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Buscador from './Buscador';
import axios from 'axios';
import PublicacionesPerfil from './PublicacionesPerfil';
import Button from 'react-bootstrap/esm/Button';
import HamburguesaInicio from './HamburguesaInicio';

const Perfil = () => {
  const { id } = useParams();
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [infoPerfil, setInfoPerfil] = useState([]);
  const [desconocido, setDesconocido] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [sonAmigos, setSonAmigos] = useState(false);
  const [meEnvioSolicitud, setMeEnvioSolicitud] = useState(false);
  const [idAmistad, setIdAmistad] = useState(null);
  const [amigo, setAmigo] = useState();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const mensajesContainerRef = useRef(null);
  const [verificarPerfil, setVerificarPerfil] = useState(false)
  const [logoUrl, setLogoUrl] = useState({ user: { logo: '' } });

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
        console.log(response.data);
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, []);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {

        const response = await axios.get(`http://localhost:8000/api/autenticacion/${id}`, {
          headers: {
            'Authorization': `Token ${user_info.token}`
          }
        });
        setInfoPerfil(response.data);
        setDesconocido(true);
        setEnviado(false);
        setSonAmigos(false);
        setMeEnvioSolicitud(false);
        if (id == user_info.user.id){
          setVerificarPerfil(true)
          setDesconocido(false)
        }


        try {
          let response2 = await axios.get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          });
          const solicitudes = response2.data;
          solicitudes.forEach(solicitud => {
            if (solicitud.user_sender == user_info?.user.id && solicitud.user_receptor == id) {
              setDesconocido(false);
              setEnviado(true);
              setIdAmistad(solicitud.id);
              if (solicitud.is_aceptada) {
                setEnviado(false);
                setSonAmigos(true);
              }
            }
            if (solicitud.user_receptor == user_info.user.id && solicitud.user_sender == id) {
              setDesconocido(false);
              setMeEnvioSolicitud(true);
              setIdAmistad(solicitud.id);
              if (solicitud.is_aceptada) {
                setEnviado(false);
                setSonAmigos(true);
                setMeEnvioSolicitud(false);
              }
            }
          });

        } catch (error) {
          console.error('error: ', error);
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
      setEnviado(true);
      setDesconocido(false);
    } catch (error) {
      console.error('Error al enviar solicitud de amistad:', error);
    }
  };

  const ToggleEnviarAmistad = () => {
    const userSenderID = user_info.user?.id;
    const userReceptorID = id;
    enviarAmistad(userSenderID, userReceptorID);
  };

  const aceptarSolicitud = async () => {
    try {
      await axios.put(`http://localhost:8000/api/amigos/aceptar_solicitud/${idAmistad}`, null, {
        headers: {
          'Authorization': `Token ${user_info.token}`,
        },
      });
      setSonAmigos(true);
      console.log('Solicitud de amistad aceptada con éxito.');
      // Ocultar el nombre después de aceptar la solicitud
      setMeEnvioSolicitud(false);
    } catch (error) {
      console.error('Error al aceptar solicitud de amistad:', error);
    }
  };

  const handleClick = async () => {
    aceptarSolicitud();
  };

  const scrollMensajesToEnd = () => {
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
    }
  };

  const handleClickEnviarMensaje = async () => {
    try {
      const mensajeData = {
        amistad: idAmistad,
        enviado_por: user_info.user.id,
        mensaje: nuevoMensaje,
      };

      const response = await axios.post('http://localhost:8000/api/amigos/enviar_mensaje', mensajeData, {
        headers: {
          Authorization: `Token ${user_info.token}`,
        },
      });

      setMensajes((prevMensajes) => [response.data, ...prevMensajes]);
      setNuevoMensaje('');
      scrollMensajesToEnd();
      cargarMensajes();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const cargarMensajes = async () => {
    let amistad = null
    try {
      let response2 = await axios.get(`http://localhost:8000/api/amigos/obtener_solicitudes_y_amistad/${user_info.user.id}`, {
        headers: {
          'Authorization': `Token ${user_info.token}`
        }
      });
      const solicitudes = response2.data;
      solicitudes.forEach(solicitud => {
        if (solicitud.user_sender == user_info?.user.id && solicitud.user_receptor == id) {
          amistad = solicitud.id
        }
        if (solicitud.user_receptor == user_info.user.id && solicitud.user_sender == id) {
          amistad = solicitud.id
        }
      });

    } catch (error) {
      console.error('error: ', error);
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/amigos/obtener_mensajes/${amistad}`, {
        headers: {
          Authorization: `Token ${user_info.token}`,
        },
      });
      // Invierte el orden del array de mensajes
      setMensajes(response.data.reverse());
      // scrollMensajesToEnd();
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  useEffect(() => {
    cargarMensajes();

    const interval = setInterval(() => {
      cargarMensajes();
    }, 10000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [id, user_info.token]);

  const renderModal = () => (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>{infoPerfil.user?.username || 'Cargando ...'}</h3>
        <button onClick={() => setModalAbierto(false)}>X</button>
      </div>
      <div ref={mensajesContainerRef} className="modal-body">
        {mensajes.map((mensaje, index) => (
          <div
            key={index}
            className={mensaje.enviado_por === user_info.user.id ? 'mensaje-enviado' : 'mensaje-recibido'}>
            <p>{mensaje.mensaje}</p>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder='Envia un nuevo mensaje!!'
        />
        <button onClick={handleClickEnviarMensaje}>Enviar</button>
      </div>
    </div>
  );

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
          <HamburguesaInicio user_info={user_info} handleLogout={handleLogout} logo={logoUrl.user?.logo || ''} />
        </div>
        <div className='btn-logout'>
          <button onClick={handleLogoutClick} className='btn-logout'>Logout</button>
        </div>
      </header>
      
      <aside className='user-info-desktop'>
        <div className='menu-content-desktop'>
          <div className='menu-content' onClick={stopPropagation}>
            <div className='user-info'>
              <img src={infoPerfil.user?.logo} alt='Profile' />
              <br /> <br />
              <div className='info-user'>
                <p> <span>Username:</span> {infoPerfil.user?.username}</p>
                <p> <span>Nombre:</span> {infoPerfil.user?.first_name} {infoPerfil.user?.last_name}</p>
              </div>
              <br />
            </div>
            <Link to={`/inicio`}>
              <button>Volver a inicio!</button>
            </Link>
            <br /><br />
            {desconocido ? (
              <button type="" onClick={ToggleEnviarAmistad}>Enviar Solicitud</button>
            ) : (
              !verificarPerfil && null
            )}
            {enviado &&
              <span>Ya le has enviado amistad!</span>}
            {sonAmigos &&
              <button onClick={() => setModalAbierto(true)} type="">Mensaje!</button>}
            {modalAbierto && renderModal()}
            {meEnvioSolicitud &&
              <button onClick={handleClick}>Aceptar Solicitud!</button>}
          </div>
        </div>
      </aside>

      <div className='menu-content-mobile'>
      <div className='user-info-mobile'>
        <img src={infoPerfil.user?.logo} alt='Profile' />
        <br /> <br />
        <div className='info-user'>
          <p> <span>Username:</span> {infoPerfil.user?.username}</p>
          <p> <span>Nombre:</span> {infoPerfil.user?.first_name} {infoPerfil.user?.last_name}</p>
        </div>
        <br />
      </div>
      <Link to={`/inicio`} className='mobile'>
        <button>Volver a inicio!</button>
      </Link>
      <br /><br />
      {desconocido ? (
        <button type="" onClick={ToggleEnviarAmistad} className='mobile'>Enviar Solicitud</button>
      ) : (
        !verificarPerfil && null
      )}
      {enviado && <span className='mobile'>Ya le has enviado amistad!</span>}
      {sonAmigos && <button onClick={() => setModalAbierto(true)} type="" className='mobile'>Mensaje!</button>}
      {modalAbierto && renderModal()}
      {meEnvioSolicitud && <button onClick={handleClick} className='mobile'>Aceptar Solicitud!</button>}
    </div>

      <div className='main-content'>
        <PublicacionesPerfil info_user={user_info} publicaciones={infoPerfil?.publicaciones} />
      </div>

      

      <footer className='main-footer'>
        <p>FaceDjango By SrRobls </p>
        <p>2023</p>
      </footer>
    </div>
  );
};

export default Perfil;
