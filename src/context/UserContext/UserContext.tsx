import React, { createContext, useContext, useState, ReactNode } from 'react';
import UserService from '../../services/UserService';
import { TSignIn } from '../../models/types/req/TSignIn';
import { TUser } from '../../models/types/entities/TUser';

// Define el tipo de datos del contexto
interface AuthContextType {
  user: TUser | null;
  isAuthenticated: boolean;
  login: (signInForm: TSignIn) => Promise<boolean>;
  logout: () => void;}

// Define el tipo de las propiedades del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

// Componente proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const isAuthenticated = Boolean(user);

  // Función para iniciar sesión
  const login = async (signInForm: TSignIn) => {
    try {
      const response = await UserService.login(signInForm);
      console.log(response);  // Verificar la respuesta
      const userData: TUser = response.data;
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};