import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Amigos({ info_amigo, info_user }) {
  const amigo_info = info_amigo;
  const user_info = info_user;
  var amigoId = null;
  const [amigo, setAmigo] = useState();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  if (amigo_info.user_sender === user_info.user.id) {
    amigoId = amigo_info.user_receptor;
  } else {
    amigoId = amigo_info.user_sender;
  }

  const handleClickMensajes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/amigos/obtener_mensajes/${info_amigo.id}`,
        {
          headers: {
            'Authorization': `Token ${user_info.token}`
          }
        }
      );
      setMensajes(response.data.reverse());
      setModalAbierto(true);
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  const handleClickEnviarMensaje = async () => {
    try {
      const mensajeData = {
        amistad: info_amigo.id,
        enviado_por: user_info.user.id,
        mensaje: nuevoMensaje
      };

      const response = await axios.post(
        'http://localhost:8000/api/amigos/enviar_mensaje',
        mensajeData,
        {
          headers: {
            'Authorization': `Token ${user_info.token}`
          }
        }
      );

      // Actualiza el estado de los mensajes agregando el nuevo mensaje al principio
      setMensajes((prevMensajes) => [response.data, ...prevMensajes]);
      setNuevoMensaje('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/amigos/obtener_mensajes/${info_amigo.id}`,
          {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          }
        );
        setMensajes(response.data);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    };

    cargarMensajes();
  }, [info_amigo.id, user_info.token]);

  useEffect(() => {
    const cargarAmigo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/autenticacion/${amigoId}`,
          {
            headers: {
              'Authorization': `Token ${user_info.token}`
            }
          }
        );
        setAmigo(response.data);
      } catch (error) {
        console.error('Error al cargar información del amigo:', error);
      }
    };

    cargarAmigo();
  }, [amigoId, user_info.token]);

  function Modal({ cerrarModal, mensajes }) {
    return (
      <div>
        <button onClick={cerrarModal}>Cerrar</button>
        {mensajes ? (
          mensajes.map((mensaje, index) => (
            <div key={index}>
              <p>{mensaje.mensaje}</p>
            </div>
          ))
        ) : (
          <p>No hay mensajes.</p>
        )}
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button onClick={handleClickEnviarMensaje}>Enviar Mensaje</button>
      </div>
    );
  }

  return (
    <div>
      {amigo && (
        <div>
          <Link to={`/usuario/${amigo.user.id}`}>
            {amigo.user.username}
          </Link>
          <button onClick={handleClickMensajes}>
            {amigo.user.username}, {info_amigo.id}
          </button>
        </div>
      )}

      {modalAbierto && (
        <Modal cerrarModal={() => setModalAbierto(false)} mensajes={mensajes} />
      )}
    </div>
  );
}

export default Amigos;

