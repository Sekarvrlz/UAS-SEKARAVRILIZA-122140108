import React, { useEffect } from 'react';
import { useUser } from '../../components/context/UserContext'; 
import { Link } from 'react-router-dom';

function HomePage() {
  const { user, ecoPoints } = useUser();  // Mengambil data pengguna dan ecoPoints dari UserContext

  // Daftar lokasi TPS
  const tpsLocations = [
    { name: "TPS 1", address: "Jl. Kapten Abdul Haq, Gg. Ibrahim Rajabasa, Bandar Lampung" },
    { name: "TPS 2", address: "Jl. Lapas, Gg. Kaswari, Lampung Selatan" },
    { name: "TPS 3", address: "Jl. Raya, Gg. Simpang, Bandar Lampung" },
    { name: "TPS 4", address: "Jl. Terusan, Gg. Mutiara, Bandar Lampung" },
    { name: "TPS 5", address: "Jl. Tepi Laut, Gg. Merdeka, Lampung Timur" },
  ];

  useEffect(() => {
    console.log(`Updated Eco Points: ${ecoPoints}`); // Untuk debug, memastikan ecoPoints sudah berubah
  }, [ecoPoints]); // Pastikan setiap perubahan ecoPoints di UserContext terdeteksi

  return (
    <div className="home-container">
      <header className="header">
        <h1>Hi, {user.firstName}</h1>
        <p>Yuk Daur Ulang Sampahmu</p>
        {/* Only show Eco Points if user is not admin */}
        {user.role !== 'admin' && (
          <div className="eco-points">
            <span className="eco-text">Eco Points</span>
            <div className="eco-value">{ecoPoints}</div>  {/* Menampilkan nilai ecoPoints */}
          </div>
        )}
        <button className="top-up-btn">Top Up</button>
      </header>

      <div className="action-buttons">
        {user.role === 'admin' ? (
          <Link to="/admin-dashboard">
            <button className="action-btn">Kelola Transaksi</button>
          </Link>
        ) : (
          <>
            <Link to="/sell">
              <button className="action-btn">Sell</button>
            </Link>
            <Link to="/buy">
              <button className="action-btn">Buy</button>
            </Link>
          </>
        )}
      </div>

      {/* Lokasi Pembuangan Sampah */}
      <div className="location-info">
        <h2>Memiliki Sampah yang Tidak Dapat di Daur Ulang?</h2>
        <p>Temukan titik pembuangan sampah di dekatmu!</p>
        <div className="location-details">
          <h3>Daftar Lokasi TPS di Bandar Lampung</h3>
          <ul>
            {tpsLocations.map((location, index) => (
              <li key={index}>
                <strong>{location.name}:</strong> {location.address}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
