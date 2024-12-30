import React, { useState } from "react";
import { TCreateTask } from "../../models/types/req/TCreateTask";
import TaskService from "../../services/TaskService";
import { useAuth } from "../../context/UserContext/UserContext"; // Importa el contexto de autenticación
import Loading from "../../components/loading/Loading"; // Importa el componente Loading
import "./TaskForm.css"; // Asegúrate de que el nombre coincida con el archivo actualizado

interface TaskFormProps {
  onClose: () => void; // Para cerrar el modal
  onTaskCreated: () => void; // Para recargar las tareas en la tabla
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onTaskCreated }) => {
  const { user } = useAuth(); // Accede al usuario desde el contexto
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío

  const handleCreateTask = async () => {
    if (!taskName.trim()) {
      alert("Por favor completa todos los campos."); // Validación básica
      return;
    }

    if (!user?.id) {
      alert("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    setIsSubmitting(true); // Desactivar botones mientras se procesa

    try {
      const newTask: TCreateTask = {
        title: taskName.trim(),
        description: taskDescription.trim(),
        user: user.id, // Usa el ID del usuario obtenido del contexto
      };

      await TaskService.createTask(newTask); // Llamar al servicio para crear la tarea
      onTaskCreated(); // Notificar al componente padre que una tarea fue creada
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error creando la tarea:", error);
      alert("Ocurrió un error al crear la tarea. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false); // Reactivar botones
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear Nueva Tarea</h2>
        <div className="form-group">
          <label>Nombre de la tarea:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Ingrese el nombre de la tarea"
            disabled={isSubmitting} // Desactivar mientras se envía
          />
        </div>
        <div className="form-group">
          <label>Descripción de la tarea:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Ingrese una descripción"
            disabled={isSubmitting} // Desactivar mientras se envía
          ></textarea>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button onClick={handleCreateTask} disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear Tarea"}
          </button>
        </div>
      </div>
      
      {/* Mostrar el Loading cuando se está creando la tarea */}
      {isSubmitting && <Loading />}
    </div>
  );
};

export default TaskForm;
