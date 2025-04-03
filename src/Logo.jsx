import React from 'react'
import Ayuverse from '../src/assets/Ayuverse.png'

function Logo() {
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  
  };

  const imgStyle = {
    height: '5rem',
    width: '12rem',
   
    backgroundColor: 'white',
  };

  return (
    <div style={logoStyle}>
      <img 
        src={Ayuverse} 
        alt="Logo" 
        style={{ ...imgStyle, backgroundColor: 'transparent' }} 
      />
    </div>
  );
}

export default Logo