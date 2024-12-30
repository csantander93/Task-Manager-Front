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
  const [showAddTaskForm, setShowAddTaskForm] = useState(false); // Formulario para agregar tarea
  const [showEditTaskForm, setShowEditTaskForm] = useState(false); // Formulario para editar tarea
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null); // Tarea seleccionada
  const [openDescription, setOpenDescription] = useState(false);

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const deleteTask = async (taskId: string) => {
    await deleteTaskById(taskId);
  };

  const editTask = (task: TTask) => {
    setSelectedTask(task); // Establece la tarea seleccionada
    setShowEditTaskForm(true); // Muestra el formulario de edición
  };

  const handleAddTask = () => {
    setShowAddTaskForm(true); // Muestra el formulario de agregar tarea
  };

  const handleCloseForm = () => {
    setShowAddTaskForm(false); // Cierra el formulario de agregar tarea
    setShowEditTaskForm(false); // Cierra el formulario de edición
    setSelectedTask(null); // Reinicia la tarea seleccionada
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setShowAddTaskForm(false); // Cierra el formulario de agregar tarea después de crear
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
    setShowEditTaskForm(false); // Cierra el formulario de edición después de la actualización
  };

  return (
    <div className="task-table-container">
      <div className="task-header">
        <h1>Task Manager</h1>
        {/* Botón para nueva tarea, solo visible si no hay formularios abiertos */}
        {!showAddTaskForm && !showEditTaskForm && (
          <button className="add-task-button" onClick={handleAddTask}>
            <Add className="add-icon" />
            <span>Nueva Tarea</span>
          </button>
        )}
      </div>

      {/* Formulario de agregar tarea */}
      {showAddTaskForm && (
        <TaskForm onClose={handleCloseForm} onTaskCreated={handleTaskCreated} />
      )}

      {/* Formulario de editar tarea */}
      {showEditTaskForm && selectedTask && (
        <TaskFormEdit
          onClose={handleCloseForm}
          onTaskUpdated={handleTaskUpdated}
          task={selectedTask} // Pasa la tarea seleccionada a TaskFormEdit
        />
      )}

      {/* Si no hay formularios abiertos, muestra la tabla de tareas */}
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
                        onClick={() => deleteTask(task._id)}
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
    </div>
  );
};

export default TaskTable;
