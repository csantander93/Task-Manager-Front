import React, { useState } from "react";
import { useTask } from "../../context/TaskContext/TaskContext";
import { Add, Edit, Visibility, Delete } from "@mui/icons-material";
import TaskForm from "../task-form/TaskForm";
import TaskDescription from "../task-description/TaskDescription";
import TaskFormEdit from "../task-form-edit/TaskFormEdit";
import "./TaskTable.css";
import { TTask } from "../../models/types/entities/TTask";

const TaskTable: React.FC = () => {
  const { tasks, fetchTasks, deleteTaskById } = useTask();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [openDescription, setOpenDescription] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Nuevo estado para confirmar la eliminación
  const [taskToDelete, setTaskToDelete] = useState<TTask | null>(null); // Tarea seleccionada para eliminación
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const deleteTask = async (taskId: string) => {
    if (taskId) {
      setIsLoading(true); // Activa el loading
      await deleteTaskById(taskId);
      setShowDeleteConfirmation(false); // Cierra el modal de confirmación
      fetchTasks(); // Actualiza la lista de tareas
      setIsLoading(false); // Desactiva el loading
    }
  };

  const editTask = (task: TTask) => {
    setSelectedTask(task);
    setShowEditTaskForm(true);
  };

  const handleAddTask = () => {
    setShowAddTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowAddTaskForm(false);
    setShowEditTaskForm(false);
    setSelectedTask(null);
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setShowAddTaskForm(false);
  };

  const handleViewDescription = (task: TTask) => {
    setSelectedTask(task);
    setOpenDescription(true);
  };

  const handleCloseDescription = () => {
    setOpenDescription(false);
    setSelectedTask(null);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    setShowEditTaskForm(false);
  };

  const handleConfirmDelete = (task: TTask) => {
    setTaskToDelete(task); // Guarda la tarea a eliminar
    setShowDeleteConfirmation(true); // Muestra el modal de confirmación
  };

  return (
    <div className="task-table-container">
      <div className="task-header">
        <h1>Task Manager</h1>
        {!showAddTaskForm && !showEditTaskForm && (
          <button className="add-task-button" onClick={handleAddTask}>
            <Add className="add-icon" />
            <span>Nueva Tarea</span>
          </button>
        )}
      </div>

      {showAddTaskForm && (
        <TaskForm onClose={handleCloseForm} onTaskCreated={handleTaskCreated} />
      )}

      {showEditTaskForm && selectedTask && (
        <TaskFormEdit
          onClose={handleCloseForm}
          onTaskUpdated={handleTaskUpdated}
          task={selectedTask}
        />
      )}

      {!showAddTaskForm && !showEditTaskForm && (
        <>
          <div className="filter-container">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Todas
              </button>
              <button
                className={`filter-tab ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completadas
              </button>
              <button
                className={`filter-tab ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pendientes
              </button>
            </div>
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks && filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td className="task-title">{task.title}</td>
                    <td>{task.completed ? "Completada" : "Pendiente"}</td>
                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="view"
                        onClick={() => handleViewDescription(task)}
                      >
                        <Visibility />
                      </button>
                      <button className="edit" onClick={() => editTask(task)}>
                        <Edit />
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleConfirmDelete(task)} // Muestra el modal de confirmación
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No hay tareas disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {selectedTask && (
        <TaskDescription
          open={openDescription}
          onClose={handleCloseDescription}
          taskDescription={selectedTask.description}
        />
      )}

      {/* Modal de Confirmación para Borrar */}
      {showDeleteConfirmation && taskToDelete && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h2>¿Estás seguro que deseas eliminar esta tarea?</h2>
            <p>{taskToDelete.title}</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirmation(false)}>
                Cancelar
              </button>
              <button
                onClick={() => deleteTask(taskToDelete._id)} // Procede a eliminar la tarea
                disabled={isLoading} // Desactiva el botón mientras se carga
                className="delete-button" // Clase para el botón de eliminación
              >
                {isLoading ? "Eliminando..." : "Eliminar"} {/* Texto del botón según el estado */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
