import React from 'react';
import { useUser } from '../components/context/UserContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';  // Pastikan path logo sesuai

function Navbar() {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return null; // Navbar tidak ditampilkan jika pengguna belum login
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="EcoCash Logo" />
        <Link to="/home">EcoCash</Link>
      </div>
      <div className="navigation">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/order-history" className="nav-link">Riwayat Pembelian & Penjualan</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
