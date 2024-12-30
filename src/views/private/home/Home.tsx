import React from 'react';
import { useAuth } from '../../../context/UserContext/UserContext';
import TaskTable from '../../../components/task-table/TaskTable';
import './Home.css';

const Home: React.FC = () => {
  const { logout } = useAuth(); // Accedemos a la función de logout del contexto

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {/* Header con el botón de logout */}
      <header className="header">
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </header>

      <div className="home-container">
        <TaskTable />
      </div>
    </div>
  );
}

export default Home;
