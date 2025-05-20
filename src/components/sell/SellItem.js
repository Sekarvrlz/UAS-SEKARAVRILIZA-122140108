import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem
import { useUser } from '../../components/context/UserContext'; // Mengimpor useUser untuk menambah Eco Points

function SellItem() {
  const navigate = useNavigate();
  const { addSellItem } = useSellItem(); // Mengakses addSellItem dari SellItemContext
  const { addEcoPoints } = useUser(); // Mengakses addEcoPoints untuk menambah Eco Points

  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [weight, setWeight] = useState(0);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSubmit = () => {
    // Simulasi perhitungan harga berdasarkan berat sampah
    let pricePerKg = 0;
    if (category === 'Kertas') {
      pricePerKg = 2000;
    } else if (category === 'Plastik') {
      pricePerKg = 1500;
    } else if (category === 'Elektronik') {
      pricePerKg = 3000;
    } else if (category === 'Aluminium') {
      pricePerKg = 2500;
    } else if (category === 'Botol Kaca') {
      pricePerKg = 1000;
    }

    const totalPrice = pricePerKg * weight; // Menghitung total harga

    // Menambahkan item jualan ke context SellItem
    const newItem = {
      category,
      photo,
      weight,
      price: totalPrice,  // Menyimpan harga yang dihitung ke dalam objek
    };

    addSellItem(newItem); // Menambahkan item jualan ke daftar penjualan

    // Tambahkan Eco Points (misalnya 500 poin per penjualan)
    addEcoPoints(500);

    navigate('/sell/details'); // Arahkan ke halaman detail penjualan
  };

  return (
    <div className="sell-item-container">
      <h2>Jual Sampah Anda</h2>
      <p>Isi form untuk menjual sampah Anda</p>

      <label>Kategori Sampah:</label>
      <select onChange={handleCategoryChange}>
        <option value="Kertas">Kertas</option>
        <option value="Plastik">Plastik</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Aluminium">Aluminium</option>
        <option value="Botol Kaca">Botol Kaca</option>
      </select>

      <label>Unggah Foto Sampah:</label>
      <input type="file" onChange={handlePhotoChange} />

      <label>Berat Sampah (kg):</label>
      <input type="number" value={weight} onChange={handleWeightChange} />

      <button onClick={handleSubmit}>Lanjut</button>
    </div>
  );
}

export default SellItem;
