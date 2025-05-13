import React from 'react';
import { useUser } from '../../components/context/UserContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const { user } = useUser();  // Mengambil data pengguna dan ecoPoints dari UserContext

  // Daftar lokasi TPS
  const tpsLocations = [
    { name: "TPS 1", address: "Jl. Kapten Abdul Haq, Gg. Ibrahim Rajabasa, Bandar Lampung" },
    { name: "TPS 2", address: "Jl. Lapas, Gg. Kaswari, Lampung Selatan" },
    { name: "TPS 3", address: "Jl. Raya, Gg. Simpang, Bandar Lampung" },
    { name: "TPS 4", address: "Jl. Terusan, Gg. Mutiara, Bandar Lampung" },
    { name: "TPS 5", address: "Jl. Tepi Laut, Gg. Merdeka, Lampung Timur" },
  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1>Hi, {user.firstName}</h1>
        <p>Yuk Daur Ulang Sampahmu</p>
        <div className="eco-points">
          <span className="eco-text">Eco Points</span>
          <div className="eco-value">100</div>  {/* Menampilkan nilai ecoPoints */}
        </div>
        <button className="top-up-btn">Top Up</button>
      </header>

      <div className="action-buttons">
        {user.role === 'admin' ? (
          <>
            {/* Admin tidak bisa jual atau beli, tapi bisa mengkoordinasi */}
            <Link to="/admin/manage">
              <button className="action-btn">Kelola Transaksi</button>
            </Link>
          </>
        ) : (
          <>
            {/* Tombol untuk menuju ke halaman jual sampah (Sell) */}
            <Link to="/sell">
              <button className="action-btn">Sell</button>
            </Link>

            {/* Tombol untuk menuju ke halaman beli sampah (Buy) */}
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

        {/* Menampilkan daftar lokasi TPS */}
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
