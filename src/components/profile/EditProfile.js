import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/context/UserContext'; // Mengimpor useUser

function EditProfile() {
  const { user, updateUser } = useUser(); // Mendapatkan data user dan fungsi updateUser
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setFirstName(user.firstName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUser) { // Pastikan fungsi updateUser ada
      updateUser({ fullName, firstName, email, phoneNumber }); // Memperbarui data user
      alert("Profil berhasil diperbarui!");
      navigate("/profile"); // Mengarahkan kembali ke halaman profil setelah disimpan
    } else {
      console.error("updateUser tidak ditemukan");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Lengkapi Profil Anda</h2>
      <form onSubmit={handleSave}>
        <div className="input-group">
          <label>Nama Lengkap</label>
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Nama Lengkap"
          />
        </div>

        <div className="input-group">
          <label>Nama Depan</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Nama Depan"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
        </div>

        <div className="input-group">
          <label>Nomor Handphone</label>
          <input 
            type="text" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="Nomor Handphone"
          />
        </div>

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default EditProfile;
