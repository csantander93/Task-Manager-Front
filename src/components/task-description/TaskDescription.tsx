import React from "react";
import { Modal, Box, Typography } from "@mui/material"; // Usamos los componentes de Material UI para el modal
import "./TaskDescription.css"; // Estilos del modal

interface TaskDescriptionProps {
  open: boolean;
  onClose: () => void;
  taskDescription: string;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
  open,
  onClose,
  taskDescription,
}) => {
  return (
    <Modal open={open} onClose={onClose} className="task-description-modal">
      <Box className="modal-box">
        <Typography variant="h6">Descripción de la tarea:</Typography>
        <Typography>{taskDescription}</Typography>
      </Box>
    </Modal>
  );
};

export default TaskDescription;
