import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const AmigosMoviles = ({ info_amigo, info_user }) => {
  const [amigo, setAmigo] = useState();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const mensajesContainerRef = useRef(null);

  useEffect(() => {
    const cargarAmigo = async () => {
      try {
        const amigoId =
          info_amigo.user_sender === info_user.user.id
            ? info_amigo.user_receptor
            : info_amigo.user_sender;

        const response = await axios.get(
          `http://localhost:8000/api/autenticacion/${amigoId}`,
          {
            headers: {
              Authorization: `Token ${info_user.token}`,
            },
          }
        );
        console.log('Respuesta de cargarAmigo:', response.data);
        setAmigo(response.data);
      } catch (error) {
        console.error('Error al cargar información del amigo:', error);
      }
    };

    cargarAmigo();
  }, [info_amigo, info_user.token]);

  const handleClickEnviarMensaje = async () => {
    try {
      const mensajeData = {
        amistad: info_amigo.id,
        enviado_por: info_user.user.id,
        mensaje: nuevoMensaje,
      };

      const response = await axios.post(
        'http://localhost:8000/api/amigos/enviar_mensaje',
        mensajeData,
        {
          headers: {
            Authorization: `Token ${info_user.token}`,
          },
        }
      );

      setMensajes((prevMensajes) => [response.data, ...prevMensajes]);
      setNuevoMensaje('');
      scrollMensajesToEnd();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const cargarMensajes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/amigos/obtener_mensajes/${info_amigo.id}`,
        {
          headers: {
            Authorization: `Token ${info_user.token}`,
          },
        }
      );
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
    }, 500);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [info_amigo.id, info_user.token]);

  const renderModal = () => (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>{amigo?.user?.username || 'Cargando ...'}</h3>
        <button onClick={() => setModalAbierto(false)}>X</button>
      </div>
      <div ref={mensajesContainerRef} className="modal-body">
        {mensajes.map((mensaje, index) => (
          <div
            key={index}
            className={mensaje.enviado_por === info_user.user.id ? 'mensaje-enviado' : 'mensaje-recibido'}>
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

  const scrollMensajesToEnd = () => {
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (modalAbierto) {
      scrollMensajesToEnd();
    }
  }, [modalAbierto]);

  return (
    <div>
      <div className='div-amigo'>
        <span onClick={() => setModalAbierto(true)}>
          {amigo?.user?.username || 'Cargando ...'}
        </span>
      </div>

      {modalAbierto && renderModal()}
    </div>
  );
};

export default AmigosMoviles;

