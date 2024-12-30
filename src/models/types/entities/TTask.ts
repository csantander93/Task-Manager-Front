export interface TTask {
    _id: string; // ID único de la tarea
    title: string; // Título de la tarea
    description: string; // Descripción de la tarea
    completed: boolean; // Estado de la tarea (completa o pendiente)
    createdAt: string; // Fecha de creación de la tarea (puedes usar ISO 8601)
    user: string; // ID del usuario asociado a la tarea
  }
  