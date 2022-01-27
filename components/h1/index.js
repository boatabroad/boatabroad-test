import React from 'react';

const H1 = ({ text, color, size }) => {
  return (
    <h1
      style={{
        color,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: size,
      }}
    >
      {text}
    </h1>
  );
};

export default H1;
