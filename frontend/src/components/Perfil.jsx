import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { id } = useParams();
  const storedUserInfo = JSON.parse(window.localStorage.getItem('info_user'));
  const [infoPerfil, setInfoPerfil] = useState([]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/autenticacion/${id}`,
          {
            headers: {
              'Authorization': `Token ${storedUserInfo.token}`
            }
          }
        );
        setInfoPerfil(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, [id, storedUserInfo.token]);

  return (
    <div>Perfil de {id}</div>
  );
};

export default Perfil;

