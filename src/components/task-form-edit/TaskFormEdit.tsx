import React, { useState, useEffect } from "react";
import { TTask } from "../../models/types/entities/TTask"; 
import { TUpdateTask } from "../../models/types/req/TUpdateTask"; 
import TaskService from "../../services/TaskService";
import { useAuth } from "../../context/UserContext/UserContext";
import "./TaskFormEdit.css"; 

interface TaskFormEditProps {
  onClose: () => void; 
  onTaskUpdated: () => void; 
  task: TTask; 
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({ onClose, onTaskUpdated, task }) => {
  const { user } = useAuth(); 
  const [taskName, setTaskName] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskCompleted, setTaskCompleted] = useState(task.completed);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskCompleted(task.completed);
  }, [task]);

  const handleUpdateTask = async () => {
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

    if (Object.keys(updateData).length === 0) {
      alert("No se han realizado cambios en la tarea.");
      return;
    }

    if (!user?.id) {
      alert("No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      await TaskService.updateTaskById(task._id, updateData); 
      onTaskUpdated(); 
      onClose(); 
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
      alert("Ocurrió un error al actualizar la tarea. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label>Descripción de la tarea:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Ingrese una descripción"
            disabled={isSubmitting}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Completada:</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={taskCompleted}
              onChange={(e) => setTaskCompleted(e.target.checked)}
              disabled={isSubmitting}
              className="checkbox-input"
            />
            <span className="switch"></span>
            <span className="status-text">{taskCompleted ? "Completada" : "Pendiente"}</span>
          </div>
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
