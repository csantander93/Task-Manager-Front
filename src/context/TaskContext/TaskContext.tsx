import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import TaskService from '../../services/TaskService';
import { TTask } from '../../models/types/entities/TTask';
import { useAuth } from '../UserContext/UserContext';

interface TaskContextType {
  tasks: TTask[] | null;
  fetchTasks: () => void;
  deleteTaskById: (taskId: string) => Promise<void>;
  updateTaskById: (taskId: string, updatedTask: TTask) => Promise<void>; // Nueva función para actualizar tarea
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask debe ser usado dentro de un TaskProvider');
  }
  return context;
};

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TTask[] | null>(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user?.id) {
      console.error('El ID de usuario no está disponible');
      return;
    }

    try {
      const response = await TaskService.getTasksByUserId(user.id);
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const deleteTaskById = async (taskId: string) => {
    try {
      await TaskService.deleteTaskById(taskId);
      fetchTasks(); // Vuelve a obtener las tareas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const updateTaskById = async (taskId: string, updatedTask: TTask) => {
    try {
      await TaskService.updateTaskById(taskId, updatedTask);
      fetchTasks(); // Vuelve a obtener las tareas después de la actualización
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  const value: TaskContextType = {
    tasks,
    fetchTasks,
    deleteTaskById,
    updateTaskById, // Se añade la función de actualización al contexto
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskProvider, useTask };
