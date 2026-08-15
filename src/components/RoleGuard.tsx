import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('authToken');

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default RoleGuard;