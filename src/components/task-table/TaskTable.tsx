// src/components/task-table/TaskTable.tsx
import React, { useState } from "react";
import { useTask } from "../../context/TaskContext/TaskContext";
import { Add, Edit, Visibility, Delete } from "@mui/icons-material";
import TaskForm from "../task-form/TaskForm";
import TaskDescription from "../task-description/TaskDescription";
import "./TaskTable.css";
import { TTask } from "../../models/types/entities/TTask";

const TaskTable: React.FC = () => {
  const { tasks, fetchTasks, deleteTaskById } = useTask();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [openDescription, setOpenDescription] = useState(false);

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const deleteTask = async (taskId: string) => {
    console.log("tarea --> " + taskId)
    await deleteTaskById(taskId); // Llamamos al método del contexto para eliminar la tarea
  };

  const editTask = (taskId: string) => {
    console.log(`Editando tarea con ID: ${taskId}`);
  };

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setShowForm(false);
  };

  const handleViewDescription = (task: TTask) => {
    setSelectedTask(task);
    setOpenDescription(true);
  };

  const handleCloseDescription = () => {
    setOpenDescription(false);
    setSelectedTask(null);
  };

  return (
    <div className="task-table-container">
      <div className="task-header">
        <h1>Task Manager</h1>
        {!showForm && (
          <button className="add-task-button" onClick={handleAddTask}>
            <Add className="add-icon" />
            <span>Nueva Tarea</span>
          </button>
        )}
      </div>

      {showForm ? (
        <TaskForm onClose={handleCloseForm} onTaskCreated={handleTaskCreated} />
      ) : (
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
                      <button className="edit" onClick={() => editTask(task._id)}>
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
