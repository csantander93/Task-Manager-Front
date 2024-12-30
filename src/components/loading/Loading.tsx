import React from 'react';
import './Loading.css'; // Asegúrate de que la ruta sea la correcta

const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
