import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulasi pendaftaran
    alert("Akun berhasil dibuat!");
    navigate('/');  // Arahkan kembali ke halaman login setelah pendaftaran
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h1>Daftar Akun Baru</h1>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Kata Sandi" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <button type="submit">Daftar</button>
        
        <p>Sudah punya akun? <a href="/">Login di sini</a></p> {/* Link ke halaman login */}
      </form>
    </div>
  );
}

export default SignUp;
