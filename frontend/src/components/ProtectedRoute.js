import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Check if user is authenticated and has the right role
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== requiredRole) {
    // Wrong role, redirect to appropriate dashboard or login
    if (user.role === 'superadmin') {
      return <Navigate to="/superadmin" replace />;
    } else if (user.role === 'cashier') {
      return <Navigate to="/cashier" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  
  // Authenticated with correct role
  return children;
};

export default ProtectedRoute;
