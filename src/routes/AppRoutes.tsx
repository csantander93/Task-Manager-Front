import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoutes from '../views/private/PrivateRoutes';
import Login from '../views/public/login/Login';
import Home from '../views/private/home/Home';
import { AuthProvider } from '../context/UserContext/UserContext';
import { TaskProvider } from '../context/TaskContext/TaskContext';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/*" element={<Home />} /> 
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}