import React, { useState, useEffect } from "react";
import { TTask } from "../../models/types/entities/TTask"; // Asegúrate de importar el tipo de tarea correctamente
import { TUpdateTask } from "../../models/types/req/TUpdateTask"; // Importa el tipo TUpdateTask
import TaskService from "../../services/TaskService";
import { useAuth } from "../../context/UserContext/UserContext";
import "./TaskFormEdit.css"; // Asegúrate de que el nombre coincida con el archivo actualizado

interface TaskFormEditProps {
  onClose: () => void; // Para cerrar el modal
  onTaskUpdated: () => void; // Para recargar las tareas en la tabla después de la actualización
  task: TTask; // La tarea que se va a editar
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({ onClose, onTaskUpdated, task }) => {
  const { user } = useAuth(); // Accede al usuario desde el contexto
  const [taskName, setTaskName] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskCompleted, setTaskCompleted] = useState(task.completed);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío

  // Se ejecuta cuando el modal se monta para cargar los datos de la tarea
  useEffect(() => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskCompleted(task.completed);
  }, [task]);

  const handleUpdateTask = async () => {
    // Validación para asegurarse de que haya algún cambio antes de enviar
    const updateData: TUpdateTask = {};

    if (taskName.trim() !== task.title) {
      updateData.title = taskName.trim();
    }

    if (taskDescription.trim() !== task.description) {
      updateData.description = taskDescription.trim();
    }

    if (taskCompleted !== task.completed) {
      updateData.completed = taskCompleted;
    }

    // Si no hay cambios, no hacemos nada
    if (Object.keys(updateData).length === 0) {
      alert("No se han realizado cambios en la tarea.");
      return;
    }

    if (!user?.id) {
      alert("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    setIsSubmitting(true); // Desactivar botones mientras se procesa

    try {
      // Llamar al servicio para actualizar la tarea con los campos modificados
      await TaskService.updateTaskById(task._id, updateData); // Asumimos que TaskService.updateTask acepta el ID de la tarea y los campos a actualizar
      onTaskUpdated(); // Notificar al componente padre que una tarea fue actualizada
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
      alert("Ocurrió un error al actualizar la tarea. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false); // Reactivar botones
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Tarea</h2>
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
        <div className="form-group">
          <label>Completada:</label>
          <input
            type="checkbox"
            checked={taskCompleted}
            onChange={(e) => setTaskCompleted(e.target.checked)}
            disabled={isSubmitting} // Desactivar mientras se envía
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button onClick={handleUpdateTask} disabled={isSubmitting}>
            {isSubmitting ? "Actualizando..." : "Actualizar Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFormEdit;
