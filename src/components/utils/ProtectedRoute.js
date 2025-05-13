import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, role } = useUser(); // Mengambil data user dan role

  if (!user) {
    // Jika pengguna belum login, arahkan ke halaman login
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Jika pengguna tidak memiliki peran yang sesuai (misalnya bukan admin)
    return <Navigate to="/home" />;
  }

  return children; // Menampilkan halaman yang diminta jika memenuhi syarat
}

export default ProtectedRoute;
