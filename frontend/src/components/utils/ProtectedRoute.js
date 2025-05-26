import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useUser();

  // Jika belum login
  if (!user || !user.role) {
    return <Navigate to="/" replace />;
  }

  // Jika ada role yang harus dicek dan role user tidak sesuai
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // Render anak jika user sudah login dan sesuai role
  return children;
}

export default ProtectedRoute;
