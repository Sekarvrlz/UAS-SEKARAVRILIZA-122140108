import React from 'react';
import { useUser } from '../../components/context/UserContext';
import { Link } from 'react-router-dom'; // Mengimpor Link untuk navigasi

function Profile() {
  const { user } = useUser(); // Mengambil data user dari context

  return (
    <div className="profile-container">
      <h2>Profil Anda</h2>
      {user ? (
        <div>
          <p><strong>Nama Lengkap:</strong> {user.fullName}</p>
          <p><strong>Nama Depan:</strong> {user.firstName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nomor Handphone:</strong> {user.phoneNumber}</p>
          
          {/* Tambahkan tombol untuk mengedit profil */}
          <Link to="/profile/edit">
            <button>Edit Profil</button>
          </Link>
        </div>
      ) : (
        <p>Data tidak tersedia</p>
      )}
    </div>
  );
}

export default Profile;
