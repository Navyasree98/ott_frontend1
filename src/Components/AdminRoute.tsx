import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.tsx';

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default AdminRoute;