import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Menambahkan error message
  const navigate = useNavigate();
  const { login } = useUser(); // Mengakses login dari UserContext

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi login sederhana
    if (email === "admin@sekar.com" && password === "admin123") {
      login("Admin", email, "admin"); // Login sebagai admin
      navigate("/admin-dashboard"); // Arahkan ke halaman admin
    } else if (email === "user@sekar.com" && password === "sekar123") {
      login("User", email, "user"); // Login sebagai user
      navigate("/home"); // Arahkan ke halaman home
    } else {
      setErrorMessage("Email atau kata sandi salah"); // Tampilkan pesan error jika login gagal
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Selamat Datang!</h1>
        
        <input 
          type="email" 
          placeholder="Username atau Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Kata Sandi" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {errorMessage && <p>{errorMessage}</p>} {/* Menampilkan pesan error */}

        <button type="submit">Log In</button>
        
        <p>Belum punya akun? <a href="/signup">Daftar di sini</a></p> {/* Link ke halaman sign-up */}
      </form>
    </div>
  );
}

export default Login;
