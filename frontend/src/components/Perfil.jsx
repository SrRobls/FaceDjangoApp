import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Publicaciones from './Publicaciones';
import Buscador from './Buscador';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


const Perfil = () => {
  const { id } = useParams();
  const user_info = JSON.parse(window.localStorage.getItem('info_user'));
  const [infoPerfil, setInfoPerfil] = useState([]);
  const logoPerfil = infoPerfil.user?.logo
  const usernamePerfil = infoPerfil.user?.username
  const nombrePerfil = infoPerfil.user?.first_name
  const apellidoPerfil = infoPerfil.user?.last_name

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
        console.log(response.data);
      } catch (error) {
        console.error('Error: No se pudo obtener información del usuario', error);
      }
    };
    obtenerPerfil();
  }, [id, user_info.token]);

  console.log(infoPerfil)

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
      <Publicaciones info_user={user_info} />
    </div>

    <aside className='user-info-desktop'>
      <div className='menu-content-desktop'>
      <div className='menu-content' onClick={stopPropagation}>
        {/* Contenido existente */}

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

