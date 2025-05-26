import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellItem } from '../context/SellItemContext';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import './SellItem.css';  // Import CSS styling

function SellItem() {
  const navigate = useNavigate();
  const { addSellItem } = useSellItem();
  const { addEcoPoints } = useUser();

  const [category, setCategory] = useState('Kertas');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!category || !address || !weight || !price) {
      setError('Mohon isi semua field dengan benar.');
      return;
    }
    setLoading(true);
    setError(null);

    const postData = {
      category,
      description,
      address,
      weight: Number(weight),
      price: Number(price),
    };

    try {
      const response = await axios.post('http://localhost:6543/api/sellitems', postData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const dataToAdd = response.data && response.data.category && response.data.price
        ? response.data
        : postData;

      addSellItem(dataToAdd);
      addEcoPoints(500);
      navigate('/sell/details');
    } catch (err) {
      addSellItem(postData);
      addEcoPoints(500);
      navigate('/sell/details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-item-container">
      <h2 className="sell-item-title">Jual Sampah Anda</h2>
      <p className="sell-item-subtitle">Isi form untuk menjual sampah Anda</p>

      <label className="sell-item-label">Kategori Sampah:</label>
      <select
        className="sell-item-select"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="Kertas">Kertas</option>
        <option value="Plastik">Plastik</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Aluminium">Aluminium</option>
        <option value="Botol Kaca">Botol Kaca</option>
      </select>

      <label className="sell-item-label">Deskripsi Sampah:</label>
      <input
        className="sell-item-input"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi sampah Anda"
      />

      <label className="sell-item-label">Alamat Penjual:</label>
      <input
        className="sell-item-input"
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Alamat Anda"
      />

      <label className="sell-item-label">Berat Sampah (kg):</label>
      <input
        className="sell-item-input"
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        min="0"
      />

      <label className="sell-item-label">Harga (Rp):</label>
      <input
        className="sell-item-input"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        min="0"
        placeholder="Masukkan harga total"
      />

      <button
        className="sell-item-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Sedang mengirim...' : 'Lanjut'}
      </button>

      {error && <p className="sell-item-error">{error}</p>}
    </div>
  );
}

export default SellItem;
