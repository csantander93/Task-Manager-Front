/* Overlay de fondo para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro translúcido */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Contenido del modal */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease; /* Transición para una animación más suave */
}

/* Estilos para las etiquetas y grupos de formulario */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Estilos para los inputs y textarea del formulario */
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
}

/* Estilo del textarea */
.form-group textarea {
  min-height: 100px;
  max-height: 400px;
  overflow-y: auto;
  line-height: 1.5;
  font-size: 14px;
}

/* Estilos de los botones */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #ccc;
  color: #333;
}

.modal-actions button:last-child {
  background-color: #28a745;
  color: white;
}

.modal-actions button:last-child:hover {
  background-color: #5cd65c;
}

/* Estilo para el checkbox */
.form-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.form-group input[type="checkbox"]:checked {
  background-color: #28a745;
  border-color: #28a745;
}

.form-group input[type="checkbox"]:checked::before {
  content: '✔';
  color: white;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group input[type="checkbox"]:hover {
  border-color: #999;
}

/* Media Queries para hacer el formulario más responsivo en pantallas pequeñas */

/* Pantallas de 600px o menos (típicamente teléfonos móviles) */
@media (max-width: 600px) {
  .modal-content {
    width: 90%; /* Reducción del ancho */
    padding: 15px; /* Menos padding para mayor eficiencia */
  }

  .form-group input,
  .form-group textarea {
    padding: 8px; /* Reducir padding para una mejor visualización */
  }

  .modal-actions {
    flex-direction: column; /* Los botones se apilan verticalmente */
    align-items: center; /* Centrar los botones */
  }

  .modal-actions button {
    width: 100%; /* Los botones ocupan todo el ancho */
    margin-bottom: 10px; /* Espaciado entre los botones */
  }

  .modal-actions button:last-child {
    background-color: #28a745;
  }

  .modal-actions button:first-child {
    background-color: #ccc;
  }

  .modal-actions button:last-child:hover {
    background-color: #5cd65c;
  }
}
