import React from 'react';

const Publicacion = ({ publicacion }) => {

  return (
    <div className='cardStyles'cardStyles>
      <p className='contentStyles'>{publicacion.info}</p>
    </div>
  );
};

export default Publicacion;
