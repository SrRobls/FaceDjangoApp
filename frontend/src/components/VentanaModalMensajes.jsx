import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const VentanaModalMensajes = ({ info_amigo, info_user, onClose }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const mensajesContainerRef = useRef();

  

  useEffect(() => {
    cargarMensajes();
  }, [info_amigo.id, info_user.token]);

  const cargarMensajes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/amigos/obtener_mensajes/${info_amigo.id}`,
        {
          headers: {
            'Authorization': `Token ${info_user.token}`
          }
        }
      );
      console.log('Respuesta de cargarMensajes:', response.data);
      setMensajes(response.data || []);
      scrollMensajesToEnd();
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  const handleClickEnviarMensaje = async () => {
    try {
      const mensajeData = {
        amistad: info_amigo.id,
        enviado_por: info_user.user.id,
        mensaje: nuevoMensaje
      };

      const response = await axios.post(
        'http://localhost:8000/api/amigos/enviar_mensaje',
        mensajeData,
        {
          headers: {
            'Authorization': `Token ${info_user.token}`
          }
        }
      );

      setMensajes((prevMensajes) => [response.data, ...prevMensajes]);
      setNuevoMensaje('');
      scrollMensajesToEnd();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const scrollMensajesToEnd = () => {
    // Si el contenedor existe, haz scroll al final
    console.log('enttamos')
    if (mensajesContainerRef.current) {
      mensajesContainerRef.current.scrollTop = mensajesContainerRef.current.scrollHeight;
      console.log('Scrolleamos!!')
    }
    
  };

  useEffect(() => {
    mensajesContainerRef.current.focus()
    console.log(mensajesContainerRef.current)
  }, [])

  return (
    <div className="modal">
      <div className="modal-header">
        <h3>{info_amigo?.user?.username || 'Usuario Desconocido'}</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div ref={mensajesContainerRef} className="modal-body">
        {mensajes.map((mensaje, index) => (
          <div key={index}>
            <p>{mensaje.mensaje}</p>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button onClick={handleClickEnviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default VentanaModalMensajes;






