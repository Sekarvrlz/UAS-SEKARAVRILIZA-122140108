import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi login sederhana
    if (email === "admin@sekar.com" && password === "admin123") {
      login("Admin", email, "admin"); // Simpan role admin di context
      navigate("/admin-dashboard"); // Redirect ke admin dashboard
    } else if (email === "user@sekar.com" && password === "sekar123") {
      login("User", email, "user"); // Simpan role user biasa
      navigate("/home"); // Redirect ke halaman home user
    } else {
      setErrorMessage("Email atau kata sandi salah");
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
          required
        />
        <input 
          type="password" 
          placeholder="Kata Sandi" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />

        {errorMessage && (
          <p style={{ color: 'red', marginTop: 10 }}>{errorMessage}</p>
        )}

        <button type="submit" style={{ marginTop: 15 }}>
          Log In
        </button>

        <p style={{ marginTop: 10 }}>
          Belum punya akun? <a href="/signup">Daftar di sini</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
