import { httpServer } from "../clients/server"; // Asegúrate de que esta ruta sea correcta
import { TCreateTask } from "../models/types/req/TCreateTask"; // Tipo para crear tareas
import { TUpdateTask } from "../models/types/req/TUpdateTask";

export default class TaskService {
  static tasksController = "/tasks";

  // Obtiene todas las tareas de un usuario
  static getTasksByUserId(userId: string) {
    console.log("id usuario " + userId)
    return httpServer.get(`${this.tasksController}/${userId}`);
  }

  // Obtiene una tarea específica por su ID
  static getTaskById(taskId: string) {
    return httpServer.get(`${this.tasksController}/id/${taskId}`);
  }

  // Crea una nueva tarea
  static createTask(newTask: TCreateTask) {
    return httpServer.post(`${this.tasksController}/`, newTask);
  }

  // Actualiza una tarea por su ID
  static updateTaskById(taskId: string, updatedTask: TUpdateTask) {
    return httpServer.put(`${this.tasksController}/${taskId}`, updatedTask);
  }

  // Elimina una tarea por su ID
  static deleteTaskById(taskId: string) {
    return httpServer.delete(`${this.tasksController}/${taskId}`);
  }
}
