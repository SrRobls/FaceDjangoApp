import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Publicacion = ({ publicacion, user_info }) => {
  const [username_logo, SetUsername_logo] = useState();

  const token = JSON.parse(window.localStorage.getItem('info_user'));

  useEffect(() => {
    const fetchUsernameAndLogo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/publicaciones/usaurio_logo/${publicacion.user}`,
          {
            headers: {
              Authorization: `Token ${token.token}`,
            },
          }
        );
        SetUsername_logo(response.data);
      } catch (error) {
        console.error('Error fetching username and logo', error);
      }
    };

    if (publicacion.user) {
      fetchUsernameAndLogo();
    }
  }, [publicacion.user, token.token]);

  // console.log(username_logo);

  return (
    <div className='cardStyles'>
      <header>
        {username_logo && (
          <>
            <img src={username_logo.logo} alt='' />
            <h6>{username_logo.username}</h6>
          </>
        )}
      </header>
      <p className='contentStyles'>{publicacion.info}</p>
    </div>
  );
};

export default Publicacion;
