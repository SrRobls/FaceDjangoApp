import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


const Buscador = ({ info_user}) => {
  const user_info = info_user;
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/amigos/usuarios', {
          headers: {
            'Authorization': `Token ${user_info?.token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    // Mostrar resultados solo si hay algo en el filtro
    setMostrarResultados(!!event.target.value);
  };

  const onReloadClick = () => {
    // window.location.reload()
  }

  const usuariosFiltrados = filtro
    ? usuarios.filter((usuario) => usuario.username.toLowerCase().startsWith(filtro.toLowerCase()))
    : [];

    return (
      <div className={`buscador ${mostrarResultados ? 'mostrar-resultados' : ''}`}>
        <input type="text" value={filtro} onChange={handleFiltroChange} placeholder="Buscar por nombre" />
        {usuariosFiltrados.length > 0 && mostrarResultados && (
          <div className="search-results">
            <ul>
              {usuariosFiltrados.map((usuario) => (
                <li key={usuario.id}>
                  <Link to={`/usuario/${usuario.id}`}>
                    <div  className="nombre-recuadro">
                      <p onClick={onReloadClick()}>{usuario.username}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default Buscador;




