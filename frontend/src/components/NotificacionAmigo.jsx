import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NotificacionAmigo = ({ info_solicitud }) => {
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [perfil, setPerfil] = useState();
  const [mostrarNombre, setMostrarNombre] = useState(true);
  console.log(info_solicitud)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/autenticacion/${info_solicitud.user_sender}`, {
        headers: {
          'Authorization': `Token ${user_info.token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        setPerfil(response.data);
      });
  }, []);

  const aceptarSolicitud = async () => {
    try {
      console.log(info_solicitud.id);
      await axios.put(
        `http://localhost:8000/api/amigos/aceptar_solicitud/${info_solicitud.id}`,
        null,
        {
          headers: {
            'Authorization': `Token ${user_info.token}`,
          },
        }
      );

      console.log('Solicitud de amistad aceptada con éxito.');
      // Ocultar el nombre después de aceptar la solicitud
      setMostrarNombre(false);
    } catch (error) {
      console.error('Error al aceptar solicitud de amistad:', error);
    }
  };

  const cancelarSolicitud = async () => {
    
    try {
      await axios.delete(
        `http://localhost:8000/api/amigos/eliminar_solicitud_o_amistad/${info_solicitud.id}`,
        {
          headers: {
            'Authorization': `Token ${user_info.token}`,
          },
        }
      );
      console.log('Solicitud cancelada!');
      // Ocultar el nombre después de cancelar la solicitud
      setMostrarNombre(false);
    } catch (error) {
      console.error('No se pudo hacer la cancelación: ', error);
    }
  };

  const handleClick = async () => {
    aceptarSolicitud();
  };

  const cancelarHandle = async () => {
    console.log(info_solicitud.id)
    console.log(user_info)
    cancelarSolicitud();
  };

  return (
    <div className='solicitudes-amistad'>
      {perfil && perfil.user.username && mostrarNombre && (
        <span>
          {perfil.user.username}{' '}
          <Button onClick={handleClick}>Aceptar</Button>{' '}
          <Button className='btnCancelar' onClick={cancelarHandle}>
            Cancelar
          </Button>{' '}
        </span>
      )}
    </div>
  );
};

export default NotificacionAmigo;
